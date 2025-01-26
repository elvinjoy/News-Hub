import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Button, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode"; // Removed destructure import
import axios from "axios";
import { DEV_URL } from "../../Constants/Constants";

// Styled components for layout and design
const PageContainer = styled(Container)`
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
  overflow-y: auto;
`;

const BlogCard = styled(Box)`
  background-color: #fff;
  width: 100%;
  max-width: 800px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const BlogHeading = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const MessageBox = styled(Box)`
  background-color: #ffebee;
  color: #d32f2f;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  max-width: 600px;
`;

const BlogTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const BlogTopic = styled(Typography)`
  font-size: 1rem;
  color: #555;
  margin-top: 8px;
`;

const BlogContent = styled(Typography)`
  font-size: 1rem;
  color: #333;
  margin-top: 16px;
  line-height: 1.5;
`;

const BlogDate = styled(Typography)`
  font-size: 0.875rem;
  color: #777;
  margin-top: 16px;
`;

const ActionButtons = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const AllBlogs = () => {
  const token = useSelector((state) => state.user.token);
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // New state for login status

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false); // User is not logged in
      return;
    }

    let userId;
    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      userId = decodedToken.id;
    } catch (error) {
      toast.error("Invalid token");
      setIsLoggedIn(false); // Token is invalid
      return;
    }

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${DEV_URL}/users/allblogsbyuser/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        toast.error("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, [token]);

  return (
    <PageContainer>
      <BlogHeading>Your Blogs</BlogHeading>
      {!isLoggedIn ? (
        <MessageBox>
          <Typography variant="h6">
            You are not logged in. Please log in to view your blogs.
          </Typography>
        </MessageBox>
      ) : (
        blogs.map((blog) => (
          <BlogCard key={blog._id}>
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogTopic>{blog.topic}</BlogTopic>
            <BlogContent>{blog.content}</BlogContent>
            <BlogDate>{new Date(blog.createdAt).toLocaleDateString()}</BlogDate>
            <ActionButtons>
              <Button variant="contained" color="primary" size="small">
                Update
              </Button>
              <Button variant="contained" color="secondary" size="small">
                Delete
              </Button>
            </ActionButtons>
          </BlogCard>
        ))
      )}
    </PageContainer>
  );
};

export default AllBlogs;
