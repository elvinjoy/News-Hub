import React, { useState } from "react";
import {
  styled,
  Box,
  Container,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,  // Import CircularProgress for the loading spinner
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageKit from "imagekit";
import { DEV_URL } from "../../Constants/Constants";

const AddBlogContainer = styled(Container)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const AddBlogBox = styled(Box)`
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`;

const AddBlogButton = styled(Button)`
  margin-top: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePreviewBox = styled(Box)`
  margin-top: 16px;
  width: 100%;
  height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f0f0f0;
  cursor: pointer;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #1976d2;
  }

  .icon-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(0, 0, 0, 0.6);
    z-index: ${(props) => (props.image ? -1 : 1)};
  }
`;

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const fileInputRef = React.useRef();

  // Access token from Redux
  const token = useSelector((state) => state.user.token);

  // ImageKit initialization
  const imagekit = new ImageKit({
    publicKey: "public_VJ2m1hSm+Sdf+U3VWl5h+u5dSlA=",
    privateKey: "private_tOVZHHDsn9pznH30E5NlKZHSgw0=",
    urlEndpoint: "https://ik.imagekit.io/elvin/",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the token is missing (if user is not logged in)
    if (!token) {
      toast.error("You must be logged in to add a blog! Please login or signup.");
      return;
    }
  
    // Check if any of the required fields are empty
    if (!title || !content || !topic || !image) {
      toast.error("All fields are required! Please fill in the title, content, topic, and image.");
      return;
    }
  
    setLoading(true);  // Start loading
  
    try {
      const decodedToken = jwtDecode(token);
      const { id: userId, name: userName } = decodedToken;
  
      // Upload the image using ImageKit
      const uploadResponse = await imagekit.upload({
        file: image, // The file to upload
        fileName: `${userId}_${title}`, // Custom file name
      });
  
      const imageUrl = uploadResponse.url;
  
      // Send the blog details to the backend
      const blogData = {
        title,
        content,
        topic,
        visibility,
        imageUrl,
        userId,
        userName,
      };
  
      const response = await axios.post(
        `${DEV_URL}/users/addblog`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success("Blog saved successfully!");
      console.log("Blog saved successfully:", response.data);
  
      // Clear the form fields after successful submission
      setTitle("");
      setContent("");
      setTopic("");
      setVisibility("public");
      setImage(null);
      setPreviewUrl(null);
  
    } catch (error) {
      toast.error("Error saving blog!");
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };
  

  return (
    <>
      <ToastContainer />
      <AddBlogContainer maxWidth={false} disableGutters>
        <AddBlogBox>
          <Typography variant="h4" align="center" gutterBottom>
            Add a New Blog
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
            <StyledTextField
              label="Topic"
              fullWidth
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic"
            />
            <StyledTextField
              label="Content"
              multiline
              rows={6}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
            />

            <FormControl fullWidth sx={{ marginBottom: "16px" }}>
              <InputLabel>Visibility</InputLabel>
              <Select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                label="Visibility"
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <ImagePreviewBox onClick={handleImageBoxClick} image={previewUrl}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" />
              ) : (
                <div className="icon-container">
                  <PhotoCamera fontSize="large" />
                  <Typography variant="body2" color="textSecondary">
                    No image selected
                  </Typography>
                </div>
              )}
            </ImagePreviewBox>

            <AddBlogButton
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "blue" }} />
              ) : (
                "Add Blog"
              )}
            </AddBlogButton>
          </form>
        </AddBlogBox>
      </AddBlogContainer>
    </>
  );
};

export default AddBlog;
