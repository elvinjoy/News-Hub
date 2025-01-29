import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { DEV_URL } from "../../constants/Constants";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Comment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ userId: null, userName: "Anonymous" });

  const token = useSelector((state) => state.user.token);

  // Validate token and set user data
  useEffect(() => {
    const validateToken = () => {
      if (!token) {
        setIsAuthenticated(false);
        setUserData({ userId: null, userName: "Anonymous" });
        return;
      }

      try {
        const decodedToken = jwtDecode(token);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          setUserData({ userId: null, userName: "Anonymous" });
          return;
        }

        setUserData({
          userId: decodedToken.id,
          userName: decodedToken.name || "Anonymous"
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false);
        setUserData({ userId: null, userName: "Anonymous" });
      }
    };

    validateToken();
  }, [token]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${DEV_URL}/comment/getcomments/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setComments(response.data.comments.reverse());
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);

        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          setUserData({ userId: null, userName: "Anonymous" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id, token]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    // Check authentication first
    if (!token || !isAuthenticated) {
      toast.error("You need to be logged in to add a comment!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Then check if comment is empty
    if (!newComment.trim()) {
      toast.warning("Please enter a comment first!");
      return;
    }

    try {
      const commentData = {
        blogId: id,
        text: newComment.trim(),
        userId: userData.userId,
        userName: userData.userName,
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
        setComments((prevComments) => [response.data.comment, ...prevComments]);
        setNewComment("");
        toast.success("Comment added successfully!");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        toast.error("Please log in to add comments.");
      } else if (error.response) {
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
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        py: 4,
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
                key={comment._id || index}
                sx={{
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  borderBottom: index !== comments.length - 1 ? "1px solid #ccc" : "none",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {comment.userName || "Anonymous"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
                  {comment.text}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", py: 4 }}>
            No comments yet. Be the first to comment!
          </Typography>
        )}

        <form onSubmit={handleAddComment}>
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
              placeholder="Write your comment here"
              helperText={
                !isAuthenticated ? (
                  <Typography sx={{ color: "red", fontWeight: "bold" }}>
                    You'll need to log in to post your comment
                  </Typography>
                ) : ""
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "blue", // default blue color
                "&:hover": {
                  backgroundColor: "darkblue", // dark blue on hover
                },
              }}
              disabled={!newComment.trim()}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Comment;
