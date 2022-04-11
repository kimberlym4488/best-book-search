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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: savedBooks!) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
      bookCount
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      bookCount
      savedBooks {
        bookId
      }
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
