import { gql } from "@apollo/client";

// modified from the getMe function in the original API file found in starter code.

// route to get logged in user's info (needs the token)
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        image
        link
        bookId
        description
        title
      }
    }
  }
`;
