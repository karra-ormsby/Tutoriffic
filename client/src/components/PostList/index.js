import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button } from 'antd';
import { QUERY_ALL_POSTS } from '../../utils/queries'
import { DELETE_POST } from '../../utils/mutations'
import { DeleteOutlined } from '@ant-design/icons';
import { Empty } from 'antd'
import '../card.css'


const PostList = ({ posts, title }) => {
    const [deletePost, { error }] = useMutation(DELETE_POST, {
        update(cache, { data: { removePost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_ALL_POSTS });

                const updatedPosts = posts.filter(post => post.id !== removePost.id);

                cache.writeQuery({
                    query: QUERY_ALL_POSTS,
                    data: { posts: updatedPosts },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    if (!posts.length) {
        return <h3>No Posts Yet <Empty/></h3>;
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await deletePost({
                variables: { removePostId: id },
            });

            if (!data.removePost) {
                throw new Error('Something went wrong!');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div style={styles.container}>
            <div>
                <div className="flex-row justify-space-between" style={styles.container}>
                    {posts &&
                        posts.map((post) => (
                            <div key={post.id} className="col-12 col-xl-6" >
                                <div className="card mb-3 enlarge" style={styles.card}>
                                    <Link  style={styles.titleLink}
                                        className="btn btn-block btn-squared"
                                        to={`/posts/${post.id}`}
                                    >
                                        {post.title}
                                    <div style={{ textAlign: "end", fontSize: "1rem", fontWeight: "400" }}>
                                        ~ {post.createdBy}
                                    </div>
                                    </Link>

                                    <Button style={styles.deleteButton} onClick={() => handleDelete(post.id)}>  <DeleteOutlined />  Delete</Button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            
        </div>
    );
};



const styles = {
container: {
    padding: '10px 20px',
    marginLeft: '0'
},

  card: {
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '120px',
    marginLeft: '0',
    paddingLeft: '20px',
    backgroundColor: '#fff'
  },
  titleLink: {
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: '#9cb9ca',
    color: 'black',
    fontWeight: '900',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '4px',
    padding: '20px',
    fontSize: '25px'
  },
  deleteButton: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    color: 'black',
    borderRadius: '4px',
  },
};
export default PostList;
