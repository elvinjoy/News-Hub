import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import AllBlogsByUser from '../../components/AllBlogsByUser/AllBlogsByUser';

// Styled Box to wrap the content
const WrapperBox = styled(Box)`
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;  // Set a maximum width for the content box
  display: flex;
  flex-direction: column; // Stack the heading and content vertically
  align-items: center; // Center the heading and content inside the box
  max-height: 950px;  // Set a fixed height for the box
  overflow-y: auto;   // Allow content to overflow vertically with a scrollbar
`;

const AllBlogs = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Center everything on the page
        minHeight: '100vh', // Ensure the page height adjusts according to content
        padding: '2px',
      }}
    >
      <WrapperBox>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
          All Blogs
        </Typography>
        <AllBlogsByUser />
      </WrapperBox>
    </Box>
  );
};

export default AllBlogs;
