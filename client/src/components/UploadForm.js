import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_IMAGECARD } from '../utils/mutations';
import { QUERY_IMAGECARDS } from '../utils/queries';

import Auth from '../utils/auth';

const UploadForm = () => {
    const [image, setImage] =useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [charCount, setCharCount] = useState('');

    const [addImageCard, { error }] = useMutation(ADD_IMAGECARD, {
        update(cache, { data: { addImageCard } }) {
            try {
                const { imageCards } = cache.readQuery({ quey: QUERY_IMAGECARDS });

                cache.writeQuery({
                    query: QUERY_IMAGECARDS,
                    data : { imageCards: [addImageCard, ...imageCards] },
                });
            } catch(error) {
                console.log(error);
            }
        },
    });

    const formSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { data } = await addImageCard({
                variables: {
                    image,
                    title,
                    description,
                    imageAuthor: Auth.getProfile().data.username,
                },
            });
            setImage('');
            setTitle('');
            setDescription('');
        } catch (error) {
            console.log(error);
        }
    };

    const formChange = ( event ) => {
        const { text, value } = event.target;
        if (text === 'description' && value.length <= 300) {
            setDescription(value);
            setCharCount(value.length);
        }
    };

  return (
      <div>
        <div>Please Upload Your Image!</div>
    </div>
  )
}

export default UploadForm