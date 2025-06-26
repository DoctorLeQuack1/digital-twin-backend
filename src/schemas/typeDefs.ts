const typeDefs = `

  type Users {
    _id: ID!
    email: String
    password: String
    name: String
    last_name: String
    asset: String
  }

  type Auth {
    token: ID!
    user: Users!
  }

  input UsersInput {
    email: String
    password: String
    name: String
    last_name: String
  }

  type Query {
    users: [Users]
    me: Users
    getAsset: String
  }

  type Mutation {
    addUser(input: UsersInput!): Auth
    login(email: String!, password: String!): Auth

    addAsset(userId: ID!, asset: String!): Users
    removeUser(email: String!): Users
  }
`;

export default typeDefs;
