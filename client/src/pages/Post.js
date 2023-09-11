import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { Card } from "antd";
import { QUERY_POST } from "../utils/queries";
import "./forum.css";

const Post = () => {
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
    <div className="post-container"> 
      <Card className="bubble post">
        <h2>{post.title}</h2>
        <h4>{post.text}</h4>
        <h6 style={{fontSize: "0.95rem", textAlign: "start", fontWeight: "400", paddingLeft: "1.3rem"}}>~ {post.createdBy}</h6>
      </Card>
    </div>
    <div className="comment-container"> 
        {loading ? (
          <div>Loading...</div>
        ) : (               
          <CommentList
            className="comment-list"
            postId={postId}
          />
        )}
        </div>
        <CommentForm postId={postId} />

    </div>
  );
};

export default Post;
