import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import { Link } from "react-router-dom"; // For navigation
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

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
  height: 350px; /* Adjusted height */
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
  height: 200px; /* Adjusted height */
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

// Demo blog data
const demoData = [
  {
    title: "The Future of Artificial Intelligence",
    topic: "Technology",
    content: "Artificial Intelligence (AI) is rapidly transforming the world...",
    author: "John Doe",
    date: "January 22, 2025",
    imageUrl: "https://via.placeholder.com/300/0000FF/808080?Text=AI",
  },
  {
    title: "A Guide to Sustainable Living",
    topic: "Lifestyle",
    content: "Sustainability is the key to ensuring the future of our planet...",
    author: "Jane Smith",
    date: "January 18, 2025",
    imageUrl: "https://via.placeholder.com/300/FF5733/FFFFFF?Text=Sustainability",
  },
  {
    title: "Mastering Web Development",
    topic: "Programming",
    content: "Web development is an ever-evolving field, requiring constant updates...",
    author: "Chris Brown",
    date: "January 15, 2025",
    imageUrl: "https://via.placeholder.com/300/FF0000/FFFFFF?Text=WebDev",
  },
  {
    title: "The Future of Artificial Intelligence",
    topic: "Technology",
    content: "Artificial Intelligence (AI) is rapidly transforming the world...",
    author: "John Doe",
    date: "January 22, 2025",
    imageUrl: "https://via.placeholder.com/300/0000FF/808080?Text=AI",
  },
  {
    title: "A Guide to Sustainable Living",
    topic: "Lifestyle",
    content: "Sustainability is the key to ensuring the future of our planet...",
    author: "Jane Smith",
    date: "January 18, 2025",
    imageUrl: "https://via.placeholder.com/300/FF5733/FFFFFF?Text=Sustainability",
  },
  {
    title: "Mastering Web Development",
    topic: "Programming",
    content: "Web development is an ever-evolving field, requiring constant updates...",
    author: "Chris Brown",
    date: "January 15, 2025",
    imageUrl: "https://via.placeholder.com/300/FF0000/FFFFFF?Text=WebDev",
  },
  {
    title: "The Future of Artificial Intelligence",
    topic: "Technology",
    content: "Artificial Intelligence (AI) is rapidly transforming the world...",
    author: "John Doe",
    date: "January 22, 2025",
    imageUrl: "https://via.placeholder.com/300/0000FF/808080?Text=AI",
  },
  {
    title: "A Guide to Sustainable Living",
    topic: "Lifestyle",
    content: "Sustainability is the key to ensuring the future of our planet...",
    author: "Jane Smith",
    date: "January 18, 2025",
    imageUrl: "https://via.placeholder.com/300/FF5733/FFFFFF?Text=Sustainability",
  },
  {
    title: "Mastering Web Development",
    topic: "Programming",
    content: "Web development is an ever-evolving field, requiring constant updates...",
    author: "Chris Brown",
    date: "January 15, 2025",
    imageUrl: "https://via.placeholder.com/300/FF0000/FFFFFF?Text=WebDev",
  },
  {
    title: "The Future of Artificial Intelligence",
    topic: "Technology",
    content: "Artificial Intelligence (AI) is rapidly transforming the world...",
    author: "John Doe",
    date: "January 22, 2025",
    imageUrl: "https://via.placeholder.com/300/0000FF/808080?Text=AI",
  },
  {
    title: "A Guide to Sustainable Living",
    topic: "Lifestyle",
    content: "Sustainability is the key to ensuring the future of our planet...",
    author: "Jane Smith",
    date: "January 18, 2025",
    imageUrl: "https://via.placeholder.com/300/FF5733/FFFFFF?Text=Sustainability",
  },
  {
    title: "Mastering Web Development",
    topic: "Programming",
    content: "Web development is an ever-evolving field, requiring constant updates...",
    author: "Chris Brown",
    date: "January 15, 2025",
    imageUrl: "https://via.placeholder.com/300/FF0000/FFFFFF?Text=WebDev",
  },
  
];

const BlogDisplay = () => {
  return (
    <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      {demoData.map((blog, index) => (
        <BlogDetailsBox key={index}>
          {/* Image */}
          <BlogImageBox>
            <img
              src={blog.imageUrl}
              alt="Blog"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
            />
          </BlogImageBox>

          {/* Blog Content */}
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogTopic>{blog.topic}</BlogTopic>
          <BlogContent>{blog.content}</BlogContent>

          {/* Footer */}
          <FooterContainer>
            <ReadMoreButton component={Link} to="/readmore">
              Read More
            </ReadMoreButton>
            <ChatIconContainer>
              <ChatBubbleOutlineIcon />
              <Typography>Chat</Typography>
            </ChatIconContainer>
          </FooterContainer>

          {/* Author and Date */}
          <NameTimeContainer>
            <Typography>{blog.author}</Typography>
            <Typography>{blog.date}</Typography>
          </NameTimeContainer>
        </BlogDetailsBox>
      ))}
    </Box>
  );
};

export default BlogDisplay;
