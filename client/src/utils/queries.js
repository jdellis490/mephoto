import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            imageCards {
                _id
                image
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
            image
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
            image
            title
            description
            imageAuthor
            createdAt
            comments {
                _id
                commentText
                createdAt
            }
        }
    }
`;