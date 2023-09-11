import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_LOGEDIN } from '../../utils/queries';
import { ADD_COMMENT } from '../../utils/mutations';
import { Form, Input, Button } from 'antd';
import '../card.css'

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [errors, setErrors] = useState({});

    const [addComment] = useMutation(ADD_COMMENT);

    const { data, loading, error } = useQuery(QUERY_LOGEDIN);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    const user = data.loggedInUser;
    const userName = `${user.firstName} ${user.lastName}`

    const handleTextChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSave = async () => {
        // Perform form validation before saving the comment
        const validationErrors = {};
        if (!commentText.trim()) {
            validationErrors.commentText = 'Comment text is required.';
        }

        // If there are validation errors, display them and prevent saving the comment
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Proceed with saving the comment if there are no validation errors
        await addComment({
            variables: { postId: postId, comment: { text: commentText, createdBy: userName } }
        });

        setCommentText('');
        setErrors({});
    };

    return (
        <>
            <Form style={{ position: 'relative', maxWidth: '800px', margin: 'auto', marginTop: '30px', boxShadow: '2px 2px 10px rgb(216, 215, 215)', }}>
                <Form.Item

                    validateStatus={errors.commentText ? 'error' : ''}
                    help={errors.commentText}
                >
                    <Input.TextArea
                        value={commentText}
                        onChange={handleTextChange}
                        showCount maxLength={1000} 
                    />
                </Form.Item>

            </Form>

            <Button className='enlarge'style={styles.button} onClick={handleCommentSave}>Add Comment</Button>
        </>
    )

};

const styles = {
    button: {
    backgroundColor: "#e67e22",
    color: "#fff",
    boxShadow: '2px 2px 10px rgb(216, 215, 215)',
    }
}

export default CommentForm;
