import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
mutation Mutation($image: String, $title: String) {
  addNovel(image: $image, title: $title) {
    authors {
      id
      name
      novelID
    }
    id
    title
    image
    createdAt
    updatedAt
  }
}
`
export const DELETE_NOVEL = gql`
mutation Mutation($id: ID!) {
  deleteNovel(id: $id) {
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
`

export const UPDATE_NOVEL = gql`
mutation Mutation($id: ID!, $title: String, $image: String) {
  updateNovel(id: $id, title: $title, image: $image) {
    title
    image
    id
  }
}
`