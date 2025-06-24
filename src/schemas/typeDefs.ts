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
    users: Users
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
  }

  type Mutation {
    addUser(input: UsersInput!): Auth
    login(email: String!, password: String!): Auth

    addAsset(userId: ID!, asset: String!): Users
    removeUser(id: ID!): Users
  }
`;

export default typeDefs;
