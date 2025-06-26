import { Users } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import { IUsers } from '../models/User.js';
import { addUser } from '../helpers/addUser.js';

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

    getAsset: async (_parent: unknown, _args: unknown, context: Context): Promise<string | null> => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
      const user = await Users.findOne({ _id: context.user._id });
      if (!user) {
        throw new AuthenticationError('User not found');
      }
      return user.asset;
  }
  },
  
  Mutation: {
    addUser: async (_parent: unknown, { input }: AddUsersArgs): Promise<login> => {
      const result = await addUser(input);
      // Check if result contains a user object
      if ('users' in result && result.users) {
        const user = result.users;
        const token = signToken(user.name, user.email, user._id);
        return { token, user };
      } else {
        // If addUser returned an error object, throw an error
        throw new AuthenticationError('Not Authenticated');
      }
    },

    login: async (_parent: unknown, { email, password }: { email: string; password: string }): Promise<login | string> => {
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

    removeUser: async (_parent: unknown, _args: unknown, context: Context): Promise<IUsers | string | null> => {
      if (context.user) {
        // If context has a `user` property, delete the Users of the logged-in user
        return await Users.findOneAndDelete({ email: context.user.email });
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('Could not find user');
    },
  },
};

export default resolvers;
