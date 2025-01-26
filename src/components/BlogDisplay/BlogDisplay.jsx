import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, styled } from "@mui/material";
import { Link } from "react-router-dom"; // For navigation
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { DEV_URL } from "../../Constants/Constants";

// Styled components for the blog layout
const BlogDetailsBox = styled(Box)`
  background-color: #f9f9f9;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px; /* Adjusted height for consistency */
  width: 30%;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  @media (max-width: 900px) {
    width: 45%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const BlogImageBox = styled(Box)`
  width: 100%;
  height: 200px; /* Set height to prevent stretching */
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const BlogTitle = styled(Typography)`
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
`;

const BlogTopic = styled(Typography)`
  font-size: 1rem;
  color: #555;
  margin-top: 0.3rem;
`;

const BlogContent = styled(Typography)`
  font-size: 0.95rem;
  margin-top: 0.5rem;
  color: #333;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const NameTimeContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #777;
  width: 100%;
`;

const ReadMoreButton = styled(Button)`
  background-color: transparent;
  color: #007bff;
  font-size: 0.875rem;
  padding: 0;
  margin-top: 0;
  text-transform: none;

  &:hover {
    color: #0056b3;
  }
`;

const ChatIconContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;

  svg {
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #007bff;
    }
  }
`;

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${DEV_URL}/users/allblogs`, {
          params: { visibility: "public" }, // Ensuring we only fetch public blogs
        });
        // Filter only public blogs on the client side as a fallback
        const publicBlogs = response.data.blogs.filter(blog => blog.visibility === "public");
        setBlogs(publicBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Stop the loading state once the request is done
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <Typography>Loading blogs...</Typography>;
  }

  return (
    <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      {blogs.map((blog, index) => (
        <BlogDetailsBox key={index}>
          {/* Image */}
          <BlogImageBox>
            <img
              src={blog.imageUrl}
              alt="Blog"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </BlogImageBox>

          {/* Blog Content */}
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogTopic>{blog.topic}</BlogTopic>
          <BlogContent>{blog.content}</BlogContent>

          {/* Footer */}
          <FooterContainer>
            <ReadMoreButton component={Link} to={`/blog/${blog._id}`}>
              Read More
            </ReadMoreButton>
            <ChatIconContainer>
              <ChatBubbleOutlineIcon />
              <Typography>Chat</Typography>
            </ChatIconContainer>
          </FooterContainer>

          {/* Author and Date */}
          <NameTimeContainer>
            <Typography>{blog.userName}</Typography>
            <Typography>{new Date(blog.createdAt).toLocaleDateString()}</Typography>
          </NameTimeContainer>
        </BlogDetailsBox>
      ))}
    </Box>
  );
};

export default BlogDisplay;
