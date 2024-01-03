import { gql } from '@apollo/client'

export const GET_NOVELS = gql`
query Novels {
  novels {
    authors {
      novelID
      name
      id
    }
    id
    title
    image
    createdAt
    updatedAt
  }
}
  `;

export const GET_ONE_NOVEL = gql`
query One_Novel ($id: ID!){
  novel(id: $id) {
    id
    title
    image
    createdAt
    updatedAt
    authors {
      id
      name
      novelID
    }
  }
}
  `;