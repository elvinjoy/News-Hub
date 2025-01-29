import React, { useEffect, useState } from "react";
import { Box, Typography, styled, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom"; // To get the blog ID from the route
import axios from "axios";
import { DEV_URL } from "../../constants/Constants";

// Styled components for the background and content container
const FullScreenContainer = styled(Box)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; // Light gray background
`;

const BoxContainer = styled(Box)`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  max-height: 90%;
  overflow-y: auto; // To prevent overflow of content
`;

const BlogTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: left;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const BlogTopic = styled(Typography)`
  font-size: 1.2rem;
  color: #555;
  margin-top: 0.5rem;
  text-align: left;
  width: 100%;
`;

const BlogContent = styled(Typography)`
  font-size: 1rem;
  color: #333;
  margin-top: 1rem;
  white-space: pre-wrap;
  line-height: 1.5;
  text-align: left;
  width: 100%;
`;

const NameTimeContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #777;
  width: 100%;
  text-align: left;
`;

const BlogImage = styled("img")`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ReadMore = () => {
  const { id } = useParams(); // Get blog ID from the route
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${DEV_URL}/blog/specificblog/${id}`);
        setBlog(response.data.blog); // Assuming the response has `blog` in it
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return (
      <FullScreenContainer>
        <CircularProgress />
      </FullScreenContainer>
    );
  }

  if (error) {
    return (
      <FullScreenContainer>
        <Typography color="error">{error}</Typography>
      </FullScreenContainer>
    );
  }

  if (!blog) {
    return (
      <FullScreenContainer>
        <Typography>No blog found!</Typography>
      </FullScreenContainer>
    );
  }

  return (
    <FullScreenContainer>
      <BoxContainer>
        {/* Display the blog image */}
        {blog.imageUrl && <BlogImage src={blog.imageUrl} alt={blog.title} />}
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogTopic>{blog.topic}</BlogTopic>
        <BlogContent>{blog.content}</BlogContent>
        <NameTimeContainer>
          <Typography>{blog.userName || "Unknown Author"}</Typography>
          <Typography>{new Date(blog.createdAt).toLocaleDateString()}</Typography>
        </NameTimeContainer>
      </BoxContainer>
    </FullScreenContainer>
  );
};

export default ReadMore;
