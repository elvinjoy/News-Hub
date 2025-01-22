import React from 'react';
import { Box, Typography, InputBase, Button, styled } from '@mui/material';

// Styled components for the box and background container
const FullScreenContainer = styled(Box)`
  height: 100vh;  // Full screen height
  width: 100vw;   // Full screen width
  display: flex;
  justify-content: center;  // Center horizontally
  align-items: center;      // Center vertically
  background-color: #F5F5F5;  // Light gray background for the full screen
`;

const BoxContainer = styled(Box)`
  background-color: #fff;  // White background for the box
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 85%;  // Increased width to 85%
  max-width: 900px;  // Optional max-width for responsiveness
  text-align: left;  // Align the text to the left
`;

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  max-width: 250px;
  &:focus {
    outline: none;
    border-color: #333;  // Focus state changes the border color
  }
`;

const SearchButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #a3a3a3;
  &:hover {
    color: #333;
  }
`;

const Home = () => {
  return (
    <FullScreenContainer>
      <BoxContainer>
        <Typography variant="h4" fontWeight="bold">
          News Hub
        </Typography>

        <HeaderContainer>
          <Typography variant="body1" mt={2} maxWidth="70%">
            Stay updated with the latest news and stories from around the world.
          </Typography>

          <SearchBoxContainer>
            <SearchInput placeholder="Search for news..." />
            <SearchButton>🔍</SearchButton>
          </SearchBoxContainer>
        </HeaderContainer>
      </BoxContainer>
    </FullScreenContainer>
  );
};

export default Home;
