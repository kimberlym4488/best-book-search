import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($book: savedBooks!) {
    saveBook(input: $book) {
      _id
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
    }
  }
`;

// export const createUser = (userData) => {
//     return fetch('/api/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });
//   };
