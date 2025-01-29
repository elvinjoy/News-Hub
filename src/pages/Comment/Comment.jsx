import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { DEV_URL } from "../../Constants/Constants";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Comment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.user.token);

  let userId = null;
  let userName = "Anonymous";

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
      userName = decodedToken.name || "Anonymous";
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${DEV_URL}/comment/getcomments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Reverse the comments to show the latest first
        setComments(response.data.comments.reverse());
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id, token]);

  const handleAddComment = async () => {
    if (!token) {
      toast.error("You need to be logged in to add a comment!");
      return;
    }
  
    if (!newComment.trim()) return;
  
    try {
      const commentData = {
        blogId: id,
        text: newComment,
        userId,
        userName,
      };
  
      const response = await axios.post(
        `${DEV_URL}/comment/addcomment`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        // Add the new comment to the front so it appears first
        setComments((prevComments) => [response.data.comment, ...prevComments]);
        setNewComment("");
      }
    } catch (error) {
      // Check if the error is from the backend (e.g. Unauthorized or invalid token)
      if (error.response) {
        const errorMessage = error.response.data.message || "Error adding comment.";
        toast.error(errorMessage);
      } else {
        console.error("Error adding comment:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: "2rem",
          border: "1px solid #ddd",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Comments
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : comments.length > 0 ? (
          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            {comments.map((comment, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  borderBottom: index !== comments.length - 1 ? "1px solid #ccc" : "none",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Commented By: {comment.userName || "Anonymous"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
                  Comment: {comment.text}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No comments yet. Be the first to comment!
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddComment}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
