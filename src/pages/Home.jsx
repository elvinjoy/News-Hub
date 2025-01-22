import React from 'react';
import { Box, Typography, InputBase, styled } from '@mui/material';
import BlogDisplay from '../components/BlogDisplay/BlogDisplay';

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;  // Stack components vertically
  justify-content: flex-start;  // Align items to the top
  align-items: center; // Center content horizontally
  background-color: #F5F5F5;  // Light gray background for the full screen
  padding: 1rem;  // Add padding for better spacing
  width: 100%;
  min-height: 100vh;  // Ensure full height, but will expand if content is taller
`;

const BoxContainer = styled(Box)`
  background-color: #fff;  // White background for the box
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;  // Increased width to 90%
  max-width: 1250px;  // Optional max-width for more space
  text-align: left;  // Align the text to the left
  display: flex;
  flex-direction: column;  // Stack elements vertically
  justify-content: flex-start;  // Start from the top
  margin-bottom: 2rem;  // Add margin to the bottom for spacing
`;

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;  // Space between the text and search bar
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #ccc;  // Add a line under the text and search bar
  padding-bottom: 1rem;  // Add space between the content and the line
`;

const TextContainer = styled(Box)`
  flex-grow: 1;  // Allows text to take up remaining space
`;

const SearchBoxContainer = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;  // Make sure the button is positioned within the input container
`;

const SearchInput = styled(InputBase)`
  background-color: #fff;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid #ccc;  // Add border to the search input
  width: 100%;
  max-width: 300px;  // Maximum width for the input
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #333;  // Focus state changes the border color
  }

  @media (max-width: 600px) {
    max-width: 200px;  // Make the search input smaller on mobile devices
  }
`;

const Home = () => {
  return (
    <FullScreenContainer>
      <BoxContainer>
        <Typography
          variant="h4"
          fontWeight="bold"
          fontFamily="'Roboto', sans-serif"  // Changed the font family for the title
        >
          News Hub
        </Typography>

        <HeaderContainer>
          <TextContainer>
            <Typography
              variant="body1"
              mt={2}
              maxWidth="70%"
              fontSize="1.2rem"  // Increased the font size of the second text
            >
              Stay updated with the latest news and stories from around the world.
            </Typography>
          </TextContainer>

          <SearchBoxContainer>
            <SearchInput placeholder="Search for news..." />
          </SearchBoxContainer>
        </HeaderContainer>

        {/* BlogDisplay component here */}
        <BlogDisplay />
      </BoxContainer>
    </FullScreenContainer>
  );
};

export default Home;