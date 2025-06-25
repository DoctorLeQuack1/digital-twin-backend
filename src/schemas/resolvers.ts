import { Users } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import { IUsers } from '../models/User.js';

// interface Users {
//     _id: string;
//     email: string;
//     password: string;
//     name: string;
//     last_name: string;
//     asset: string
// };

interface login {
  token: string;
  user: IUsers
}

interface AddUsersArgs {
  input:{
    email: string;
    password: string;
    name: string;
    last_name: string;
  }
};

interface AddAssetArgs {
  userId: string;
  asset: string;
}

interface Context {
  user?: IUsers
};

const resolvers = {
  Query: {
    users: async (): Promise<IUsers[]> => {
      return await Users.find({})
    },

    me: async (_parent: unknown, _args: unknown, context: Context): Promise<IUsers | null> => {
      if (context.user) {
        // If user is authenticated, return their profile
        return await Users.findOne({ _id: context.user._id });
      }
      // If not authenticated, throw an authentication error
      throw new AuthenticationError('Not Authenticated');
    },
  },
  
  Mutation: {
    addUser: async (_parent: unknown, { input }: AddUsersArgs): Promise<{ token: string; users: any }> => {
      const users = await Users.create({ ...input });
      const token = signToken(users.name, users.email, users._id);

      return { token, users }
    },

    login: async (_parent: unknown, { email, password }: { email: string; password: string }): Promise<login> => {
      // Find a user by email
      const user: IUsers = await Users.findOne({ email }) as IUsers;
      
      if (!user) {
        // If profile with provided email doesn't exist, throw an authentication error
        throw new AuthenticationError('Not Authenticated');
      }
      
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);

      if (!correctPw) {
        // If password is incorrect, throw an authentication error
        throw new AuthenticationError('Not Authenticated');
      }

      // Sign a JWT token for the authenticated profile
      const token = signToken(user.name, user.email, user._id);
     console.log(user);
      return { token, user };
    },

    addAsset: async (_parent: unknown, { userId, asset }: AddAssetArgs, context: Context): Promise<IUsers | null> => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        // Add a skill to a profile identified by profileId
        return await Users.findOneAndUpdate(
          { _id: userId },
          {
            $set: { asset: asset },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('Could not find user');
    },
    removeUser: async (_parent: unknown, _args: unknown, context: Context): Promise<IUsers | null> => {
      if (context.user) {
        // If context has a `user` property, delete the Users of the logged-in user
        return await Users.findOneAndDelete({ _id: context.user._id });
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('Could not find user');
    },
  },
};

export default resolvers;
