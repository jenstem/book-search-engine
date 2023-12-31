const { gql } = require('apollo-server-express');

// need the "BookInput"?

const typeDefs = gql`
type Query {
    me: User
    users: [User]
    user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookBody: BookInput!): User
    removeBook(bookId: String!): User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
`;

module.exports = typeDefs;