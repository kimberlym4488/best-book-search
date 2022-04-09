import { gql } from "@apollo/client";

// modified from the getMe function in the original API file found in starter code.

// route to get logged in user's info (needs the token)
export const QUERY_ME = gql`
  query me {
    me 
    # me on line 8 is the data property. data.me from line 8. after we use the Query.{
      _id
      name
      skills


    }
  }
`;

// export const getMe = (token) => {
//     return fetch('/api/users/me', {
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: `Bearer ${token}`,
//       },
//     });
//   };
