import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_IMAGECARD = gql`
  mutation addImageCard(
    $imageUrl: String!
    $title: String!
    $description: String!
    $imageAuthor: String!
  ) {
    addImageCard(
      imageUrl: $imageUrl
      title: $title
      description: $description
      imageAuthor: $imageAuthor
    ) {
      _id
      imageUrl
      title
      description
      imageAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $imageId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      imageId: $imageId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      imageUrl
      title
      description
      imageAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const DELETE_IMAGECARD = gql`
  mutation deleteImageCard($imageId: ID!) {
    deleteImageCard(imageId: $imageId) {
      _id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($imageId: ID!, $commentId: ID!) {
    deleteComment(imageId: $imageId, commentId: $commentId) {
      _id
      imageUrl
      title
      description
      imageAuthor
      createdAt
      comments {
        _id
      }
    }
  }
`;
