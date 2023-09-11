import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_POST } from '../utils/mutations';
import { Form, Input, Button } from 'antd';
const generateUniqueId = require('generate-unique-id');

const PostCreator = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const [savePost] = useMutation(SAVE_POST);

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    const handleTextChange = (e) => {
        setPostText(e.target.value);
    };

    const handlePostSave = async () => {
        // Perform form validation before saving the post
        const validationErrors = {};
        if (!postTitle.trim()) {
            validationErrors.postTitle = 'Post title is required.';
        }
        if (!postText.trim()) {
            validationErrors.postText = 'Post text is required.';
        }

        // If there are validation errors, display them and prevent saving the post
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Proceed with saving the post if there are no validation errors
        const dataToSend = { id: generateUniqueId(), title: postTitle, text: postText };

        try {
            await savePost({
                variables: { postData: dataToSend }
            });

            // Clear form data after successful save
            setPostTitle('');
            setPostText('');
            setErrors({});

            navigate(`/posts`);
        } catch (error) {
            // Handle error here if needed
            console.error(error);
        }
    };

    const styles = {
        button: {
            backgroundColor: "#e67e22",
            color: "#fff",
            boxShadow: '2px 2px 10px rgb(216, 215, 215)',
        },
        box: {
            maxWidth: '800px',
            margin: 'auto',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
            zIndex: 1,
        },
    };

    return (
        <div style={styles.box}>
            <Form>
                <div>
                    <Form.Item
                        label="Post Title"
                        rules={[
                            {
                                type: 'text',
                            },
                            {
                                required: true,
                                message: 'Please input a Post Title!',
                            },
                        ]}
                        validateStatus={errors.postTitle ? 'error' : ''}
                        help={errors.postTitle}
                    >
                        <Input
                            value={postTitle}
                            onChange={handleTitleChange}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Text"
                        rules={[{ required: true, message: 'Please input Intro' }]}
                        validateStatus={errors.postText ? 'error' : ''}
                        help={errors.postText}
                    >
                        <Input.TextArea
                            value={postText}
                            onChange={handleTextChange}
                            showCount maxLength={1000}
                        />
                    </Form.Item>

                    <Button onClick={handlePostSave} style={styles.button}>Create Post</Button>
                </div>
            </Form>
        </div>
    )
};

export default PostCreator;


