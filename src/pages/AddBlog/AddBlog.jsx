import React, { useState } from "react";
import { styled, Box, Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [visibility, setVisibility] = useState("public");

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title,
      content,
      topic,
      visibility,  // Include visibility in the data being submitted
    };
    console.log(blogData);  // Send this to your backend API
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

          {/* Dropdown for selecting visibility */}
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

          <AddBlogButton variant="contained" color="primary" type="submit" fullWidth>
            Add Blog
          </AddBlogButton>
        </form>
      </AddBlogBox>
    </AddBlogContainer>
  );
};

export default AddBlog;
