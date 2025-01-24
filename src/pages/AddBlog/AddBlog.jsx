import React, { useState } from "react";
import { styled, Box, Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const AddBlogContainer = styled(Container)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F5F5F5;
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

  .MuiOutlinedInput-root {
    color: #333;

    & fieldset {
      border-color: rgba(0, 0, 0, 0.1);
    }

    &:hover fieldset {
      border-color: rgba(0, 0, 0, 0.2);
    }

    &.Mui-focused fieldset {
      border-color: #333;
    }
  }

  .MuiInputLabel-root {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const AddBlogButton = styled(Button)`
  margin-top: 16px;
  background-color: #1976d2;

  &:hover {
    background-color: #1565c0;
  }
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
  const [image, setImage] = useState(null); // State to store the image file
  const [previewUrl, setPreviewUrl] = useState(null); // State to store the preview URL

  const fileInputRef = React.useRef(); // Reference for the file input

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Update the image state with the selected file
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleImageBoxClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all form data
    formData.append("title", title);
    formData.append("content", content);
    formData.append("topic", topic);
    formData.append("visibility", visibility);

    if (image) {
      formData.append("image", image); // Append the image file
    }

    // Send formData to the backend API
    console.log("FormData:", formData);
    // Example: axios.post('/api/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  };

  return (
    <AddBlogContainer maxWidth={false} disableGutters>
      <AddBlogBox>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
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

          {/* Image Upload Field */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          {/* Image Preview Box */}
          <ImagePreviewBox onClick={handleImageBoxClick} image={previewUrl}>
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" />
            ) : (
              <div className="icon-container">
                <PhotoCamera fontSize="large" />
                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: "8px" }}>
                  No image selected
                </Typography>
              </div>
            )}
          </ImagePreviewBox>

          <AddBlogButton variant="contained" color="primary" type="submit" fullWidth>
            Add Blog
          </AddBlogButton>
        </form>
      </AddBlogBox>
    </AddBlogContainer>
  );
};

export default AddBlog;
