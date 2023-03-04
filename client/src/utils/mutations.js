import { gql } from '@apollo/client';

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
    mutation addImageCard($image: String!, $title: String!, $description: String!, $imageAuthor: String!) {
        addImageCard(image: $image, title: $title, description: $description, imageAuthor: $imageAuthor) {
            _id
            image
            title
            description
            imageAuthor
            createdAt
            comments {
                _id
                commentText
            }
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($imageId: ID!, $commentText: String!, $commentAuthor: String!) {
        addComment(imageId: $imageId, commentText: $commentText, commentAuthor: $commentAuthor) {
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