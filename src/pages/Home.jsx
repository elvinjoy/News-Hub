import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, InputBase, styled, IconButton } from '@mui/material';
import BlogDisplay from '../components/BlogDisplay/BlogDisplay';
import Footer from '../components/Footer/Footer';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { DEV_URL } from '../constants/Constants';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


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
  flex-direction: column; /* Stack elements vertically by default */
  
  @media (min-width: 500px) {
    flex-direction: row; /* Align elements horizontally when screen width is greater than 500px */
  }
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

const ClearButton = styled(IconButton)`
  color: #333;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
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

const BlogDetailsBox = styled(Box)`
  background-color: #f9f9f9;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
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
  height: 200px;
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

const SearchResultsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin-top: 2rem;
`;

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);


  const token = useSelector((state) => state.user.token);
  const searchInputRef = useRef(null);

  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchKeyword.trim()) {
      setIsSearching(true);
      try {
        const response = await axios.get(`${DEV_URL}/blog/search/${searchKeyword}`);
        if (response.data && response.data.blogs) {
          // Filter the blogs to only show those with 'public' visibility
          const publicBlogs = response.data.blogs.filter(blog => blog.visibility === 'public');
          setSearchResults(publicBlogs);

          if (publicBlogs.length === 0) {
            toast.info('No blogs found matching your search with public visibility.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value === '') {
      setSearchResults(null);
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    setSearchResults(null);
  };

  const handleAddClick = () => {
    if (!userId) {
      toast.warning('Please log in to add a blog.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    navigate('/addblog');
  };

  const handleEditClick = () => {
    if (!userId) {
      toast.warning('Please log in to edit your blogs.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    navigate(`/allblogsbyuser/${userId}`);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateTotalPages = useCallback((total) => {
    setTotalPages(total);
  }, []);

  // const handleClickOutside = (e) => {
  //   if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
  //     handleClearSearch();
  //   }
  // };

  useEffect(() => {
    // document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderSearchResults = () => (
    <SearchResultsContainer>
      {searchResults.length > 0 ? (
        searchResults.map((blog, index) => (
          <BlogDetailsBox key={index}>
            <img
              src={blog.imageUrl}
              alt="Blog"
              style={{
                width: '100%',
                height: '160px', 
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogTopic>{blog.topic}</BlogTopic>
            <BlogContent>{blog.content}</BlogContent>

            <FooterContainer>
              <Typography component={Link} to={`/blog/${blog._id}`}>
                Read More
              </Typography>
              <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ChatBubbleOutlineIcon />
                <Typography>Chat</Typography>
              </Box>
            </FooterContainer>

            <NameTimeContainer>
              <Typography>{blog.userName}</Typography>
              <Typography>{new Date(blog.createdAt).toLocaleDateString()}</Typography>
            </NameTimeContainer>
          </BlogDetailsBox>
        ))
      ) : (
        <Typography variant="h6" textAlign="center" width="100%">
          No blogs found matching your search.
        </Typography>
      )}
    </SearchResultsContainer>
  );

  const handleHomeClick = () => {
    setSearchKeyword('');
    setSearchResults(null);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <FullScreenContainer>
        <BoxContainer>
          <Typography variant="h4" fontWeight="bold" fontFamily="'Roboto', sans-serif">
            News Hub
          </Typography>

          <HeaderContainer>
            <TextContainer>
              <Typography variant="body1" mt={2} maxWidth="70%" fontSize="1.2rem">
                Stay updated with the latest news and stories from around the world.
              </Typography>
            </TextContainer>

            <SearchBoxContainer ref={searchInputRef}>
              <SearchInput
                placeholder="Search for news..."
                value={searchKeyword}
                onChange={handleSearchChange}
                onKeyPress={handleSearch}
              />
              {searchKeyword && (
                <ClearButton onClick={handleClearSearch}>
                  <IconButton sx={{ color: '#FF0000' }}>Clear</IconButton>
                </ClearButton>
              )}
            </SearchBoxContainer>
          </HeaderContainer>

          {searchResults ? (
            renderSearchResults()
          ) : (
            <>
              <BlogDisplay
                page={page}
                onUpdateTotalPages={updateTotalPages}
              />
              {totalPages > 1 && (
                <NavigationButtons>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      color="primary"
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      sx={{ opacity: page === 1 ? 0.5 : 1 }}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>
                    {page > 1 && <NavigationText>Previous</NavigationText>}
                  </Box>

                  <Typography variant="body1" sx={{ mx: 2 }}>
                    Page {page} of {totalPages}
                  </Typography>

                  <Box display="flex" alignItems="center">
                    {page < totalPages && <NavigationText>Next</NavigationText>}
                    <IconButton
                      color="primary"
                      onClick={handleNextPage}
                      disabled={page >= totalPages}
                      sx={{ opacity: page >= totalPages ? 0.5 : 1 }}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </Box>
                </NavigationButtons>
              )}
            </>
          )}
        </BoxContainer>
      </FullScreenContainer>

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
