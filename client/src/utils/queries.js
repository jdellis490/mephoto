import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      imageCards {
        _id
        imageUrl
        title
        description
        createdAt
      }
    }
  }
`;

export const QUERY_IMAGECARDS = gql`
  query getImageCards {
    imageCards {
      _id
      imageUrl
      title
      description
      imageAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_IMAGECARD = gql`
  query getSingleImageCard($imageId: ID!) {
    imageCard(imageId: $imageId) {
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
