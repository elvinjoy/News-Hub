import React, { useEffect, useState } from "react";
import { Box, Typography, styled, Button, Container } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
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

const BlogImage = styled("img")`
  width: 100%; 
  height: 200px; 
  object-fit: cover;
  margin-bottom: 16px;
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

const ReadMoreButton = styled(Button)`
  margin-top: 8px;
  color: #2196f3;
  text-transform: none;
`;

const AllBlogsByUser = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const [blogs, setBlogs] = useState([]); // State to hold blogs
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for any errors
  const navigate = useNavigate(); // Hook to navigate to a different route

  // Fetch blogs when the component is mounted
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${DEV_URL}/blog/allblogsbyuser/${id}`);
        if (response.data && response.data.blogs) {
          setBlogs(response.data.blogs); // Ensure you're setting the blogs correctly
        } else {
          setError("No blogs found.");
        }
      } catch (error) {
        setError("Failed to load blogs.");
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  const handleEditClick = (blogId) => {
    navigate(`/editblog/${blogId}`);
  };

  const handleReadMoreClick = (blogId) => {
    navigate(`/blog/${blogId}`); // Navigate to the blog details page
  };

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
          <BlogBox key={blog._id}>
            {/* Render Image at the top if exists */}
            {blog.imageUrl && (
              <BlogImage src={blog.imageUrl} alt="Blog Image" />
            )}
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogTopic>{blog.topic}</BlogTopic>
            <BlogContent>{blog.content}</BlogContent>

            <ReadMoreButton onClick={() => handleReadMoreClick(blog._id)}>
              Read More
            </ReadMoreButton>

            <BlogDate>{new Date(blog.createdAt).toLocaleDateString()}</BlogDate>

            <ActionButtons>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleEditClick(blog._id)}
              >
                Edit
              </Button>
            </ActionButtons>
          </BlogBox>
        ))
      )}
    </AllBlogsContainer>
  );
};

export default AllBlogsByUser;
  