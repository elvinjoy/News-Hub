import React from "react";
import { Box, Typography, styled, Button, Container } from "@mui/material";

// Mock data for user blogs
const blogs = [
  {
    id: 1,
    title: "The Future of Web Development",
    topic: "Technology, Web Development",
    content:
      "Web development is an ever-evolving field with exciting trends like AI, automation, and modern frameworks shaping its future.",
    date: "January 22, 2025",
  },
  {
    id: 2,
    title: "The Importance of Mental Health",
    topic: "Health, Lifestyle",
    content:
      "Mental health is as important as physical health. It's vital to take time to care for your mind and seek help when needed.",
    date: "January 15, 2025",
  },
];

const AllBlogsContainer = styled(Container)`
  height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
  overflow-y: auto;
  margin-top: calc(64px + 16px); /* Adjust this to account for navbar height and padding */
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
  return (
    <AllBlogsContainer maxWidth="md">
      {blogs.map((blog) => (
        <BlogBox key={blog.id}>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogTopic>{blog.topic}</BlogTopic>
          <BlogContent>{blog.content}</BlogContent>
          <BlogDate>{blog.date}</BlogDate>
          <ActionButtons>
            <Button variant="contained" color="primary" size="small">
              Update
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Delete
            </Button>
          </ActionButtons>
        </BlogBox>
      ))}
    </AllBlogsContainer>
  );
};

export default AllBlogsByUser;
