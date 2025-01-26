import React, { useState } from 'react';
import { Box, Typography, InputBase, styled, IconButton } from '@mui/material';
import BlogDisplay from '../components/BlogDisplay/BlogDisplay';
import Footer from '../components/Footer/Footer';
import AddIcon from '@mui/icons-material/Add';  // Plus icon for adding
import EditIcon from '@mui/icons-material/Edit'; // Edit icon for editing
import NavigateNextIcon from '@mui/icons-material/NavigateNext';  // Next button icon
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';  // Previous button icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding the token
import { DEV_URL } from '../Constants/Constants';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
  bottom: 8rem;
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
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // Access the token from Redux store
  const token = useSelector((state) => state.user.token);

  // Decode the token to get the user ID
  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id; 
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  const handleAddClick = () => {
    navigate('/addblog');
  };

  const handleEditClick = () => {
    if (userId) {
      navigate(`/allblogsbyuser/${userId}`);
    } else {
      toast.error('You are not logged in!');
    }
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => page > 1 && setPage(page - 1);

  return (
    <>
      {/* ToastContainer to display the toast notifications */}
      <ToastContainer />

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
            '&:hover': { backgroundColor: '#45a049' },
          }}
          onClick={handleAddClick}
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
            '&:hover': { backgroundColor: '#ff9e00' },
          }}
          onClick={handleEditClick}
        >
          <EditIcon sx={{ color: '#fff' }} />
        </IconButton>
      </ButtonContainer>

      <Footer />
    </>
  );
};

export default Home;
