const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    password: String
    bookCount: Int
  },

  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  },

  input savedBooks {
    bookId: ID
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  },

  type Auth {
    token: ID!
    user: User
  },

  type Query {
    me: User
  },

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBooks!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
