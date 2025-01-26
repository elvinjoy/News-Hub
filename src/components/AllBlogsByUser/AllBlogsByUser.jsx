import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Button, Container } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DEV_URL } from "../../Constants/Constants";

// Styled components
const AllBlogsContainer = styled(Container)`
  height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
  overflow-y: auto;
  margin-top: 10px;
`;

const BlogBox = styled(Box)`
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  position: relative;
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
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

const AllBlogsByUser = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const [blogs, setBlogs] = useState([]); // State to hold blogs
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for any errors

  // Fetch blogs when the component is mounted
  useEffect(() => {
    console.log("User ID:", id); // Log the ID before sending the request

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${DEV_URL}/users/allblogsbyuser/${id}`);
        console.log("Fetched blogs data:", response.data); // Debugging

        if (response.data && response.data.blogs) {
          setBlogs(response.data.blogs); // Ensure you're setting the blogs correctly
        } else {
          setError("No blogs found.");
        }
      } catch (error) {
        setError("Failed to load blogs.");
        console.error("Error fetching blogs:", error); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  return (
    <AllBlogsContainer maxWidth="md">
      {loading ? (
        <Typography>Loading blogs...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : blogs.length === 0 ? (
        <Typography>No blogs found.</Typography>
      ) : (
        blogs.map((blog) => (
          <BlogBox key={blog._id}> {/* Changed id to _id */}
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
          </BlogBox>
        ))
      )}
    </AllBlogsContainer>
  );
};

export default AllBlogsByUser;
