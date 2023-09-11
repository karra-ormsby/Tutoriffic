import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import PostList from "../components/PostList";
import { QUERY_ALL_POSTS } from "../utils/queries";
import { Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./forum.css";

const Posts = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_POSTS);

  const posts = data?.posts || [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.addSection}>
        <Link style={styles.addLink}to={`/posts/add`}> 
        <Button className = 'enlarge' style={styles.addButton}>
          <PlusOutlined style={styles.plusIcon} />
          <div style={styles.buttonText}>
           Create Your Own Post
          </div>
        </Button>
        </Link>
      </div>
      <Divider>Forum</Divider>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PostList
          posts={posts}
        />
      )}
    </div>
  );
};

const styles = {

  container: {
    backgroundColor: '#f5f5f5',
    marginTop: '0',
    height: '100vh'
  },
  addSection: {
    padding: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  addButton: {
    padding: "40px 50px", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderColor: "#e67e22",
    color: "#e67e22",
    boxShadow: '2px 2px 10px rgb(216, 215, 215)',
  },
  addLink: {
    textDecoration: "none",
    color: "#e67e22"
  },
  plusIcon: {
    fontSize: "25px",
    marginBottom: "5px",
  },
  buttonText: {
    fontSize: "20px",
  },
};

export default Posts;
