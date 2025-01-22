import React from 'react';
import { Box, Typography, styled } from '@mui/material';

// Styled components for the background and content container
const FullScreenContainer = styled(Box)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;  // Light gray background
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
  overflow-y: auto;  // To prevent overflow of content
`;

const BlogTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: left;  // Left-align the title
  margin-bottom: 0.5rem;  // Small bottom margin to separate from the topic
  width: 100%;  // Ensures title takes the full width
`;

const BlogTopic = styled(Typography)`
  font-size: 1.2rem;
  color: #555;
  margin-top: 0.5rem;
  text-align: left;  // Left-align the topic
  width: 100%;  // Ensures topic takes the full width
`;

const BlogContent = styled(Typography)`
  font-size: 1rem;
  color: #333;
  margin-top: 1rem;
  white-space: pre-wrap;  // Preserve whitespace formatting
  line-height: 1.5;
  text-align: left;  // Left-align the content
  width: 100%;  // Ensures content takes the full width
`;

const NameTimeContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #777;
  width: 100%;  // Ensure the container takes full width
  text-align: left;  // Ensure the author and date are left-aligned
`;

const ReadMore = () => {
  // Demo blog data
  const blog = {
    title: 'The Future of Web Development',
    topic: 'Technology, Web Development, Frontend',
    content: `Web development is an ever-evolving field, with new tools, frameworks, and technologies being introduced at a rapid pace. In the past decade, we've seen the rise of frameworks like React, Vue, and Angular, all of which have revolutionized how developers build modern web applications. The future of web development looks promising, with advancements in artificial intelligence, machine learning, and more sophisticated backend technologies shaping the landscape. Developers can expect to work with more automation, faster deployment times, and even more integrated solutions that improve user experience. As we look ahead, it's clear that the future will be driven by both creativity and innovation. The web will continue to play a critical role in shaping our digital experiences, from eCommerce to social media, and beyond.`,
    author: 'John Doe',
    date: 'January 22, 2025',
  };

  return (
    <FullScreenContainer>
      <BoxContainer>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogTopic>{blog.topic}</BlogTopic>
        <BlogContent>{blog.content}</BlogContent>
        <NameTimeContainer>
          <Typography>{blog.author}</Typography>
          <Typography>{blog.date}</Typography>
        </NameTimeContainer>
      </BoxContainer>
    </FullScreenContainer>
  );
};

export default ReadMore;
