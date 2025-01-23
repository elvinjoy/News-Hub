import React, { useState } from 'react';
import { Box, Typography, InputBase, styled, IconButton } from '@mui/material';
import BlogDisplay from '../components/BlogDisplay/BlogDisplay';
import Footer from '../pages/Footer/Footer';
import AddIcon from '@mui/icons-material/Add';  // Plus icon for adding
import EditIcon from '@mui/icons-material/Edit'; // Edit icon for editing
import NavigateNextIcon from '@mui/icons-material/NavigateNext';  // Next button icon
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';  // Previous button icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #F5F5F5;
  padding: 1rem;
  width: 100%;
  min-height: 100vh;
`;

const BoxContainer = styled(Box)`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1250px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
`;

const TextContainer = styled(Box)`
  flex-grow: 1;
`;

const SearchBoxContainer = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled(InputBase)`
  background-color: #fff;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #333;
  }

  @media (max-width: 600px) {
    max-width: 200px;
  }
`;

const ButtonContainer = styled(Box)`
  position: fixed;
  right: 2rem;
  bottom: 8rem;  // Increase the bottom value to create space from the footer
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavigationButtons = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const NavigationText = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
  margin-left: 0.5rem;
  display: inline-block;
`;

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [page, setPage] = useState(1);  // State for current page

  // Function to handle navigation
  const handleAddClick = () => {
    navigate('/addblog'); // Redirect to the /addblog path
  };

  const handleEditClick = () => {
    navigate('/allblogs'); // You can adjust this logic to handle different routes for editing if needed
  };

  // Handle Next Button Click
  const handleNextPage = () => {
    setPage(page + 1);  // Increase page number
  };

  // Handle Previous Button Click
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);  // Decrease page number if not on the first page
  };

  return (
    <>
      <FullScreenContainer>
        <BoxContainer>
          <Typography
            variant="h4"
            fontWeight="bold"
            fontFamily="'Roboto', sans-serif"
          >
            News Hub
          </Typography>

          <HeaderContainer>
            <TextContainer>
              <Typography
                variant="body1"
                mt={2}
                maxWidth="70%"
                fontSize="1.2rem"
              >
                Stay updated with the latest news and stories from around the world.
              </Typography>
            </TextContainer>

            <SearchBoxContainer>
              <SearchInput placeholder="Search for news..." />
            </SearchBoxContainer>
          </HeaderContainer>

          {/* BlogDisplay component here */}
          <BlogDisplay page={page} />
          
          {/* Pagination Buttons with Text */}
          <NavigationButtons>
            <Box display="flex" alignItems="center">
              <IconButton
                color="primary"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                <NavigateBeforeIcon />
              </IconButton>
              {page > 1 && <NavigationText>Previous</NavigationText>}
            </Box>

            <Box display="flex" alignItems="center">
              <IconButton
                color="primary"
                onClick={handleNextPage}
              >
                <NavigateNextIcon />
              </IconButton>
              <NavigationText>Next</NavigationText>
            </Box>
          </NavigationButtons>
        </BoxContainer>
      </FullScreenContainer>

      {/* Fixed Buttons */}
      <ButtonContainer>
        <IconButton
          color="primary"
          sx={{
            backgroundColor: '#4caf50',
            padding: '1rem',
            borderRadius: '50%',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
          onClick={handleAddClick} // Add click handler for + button
        >
          <AddIcon sx={{ color: '#fff' }} />
        </IconButton>

        <IconButton
          color="primary"
          sx={{
            backgroundColor: '#ffa500',
            padding: '1rem',
            borderRadius: '50%',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: '#ff9e00',
            },
          }}
          onClick={handleEditClick} // Add click handler for edit button
        >
          <EditIcon sx={{ color: '#fff' }} />
        </IconButton>
      </ButtonContainer>

      <Footer />
    </>
  );
};

export default Home;
