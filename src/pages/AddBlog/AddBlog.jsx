import React, { useState } from "react";
import { styled, Box, Container, TextField, Button, Typography } from "@mui/material";

const AddBlogContainer = styled(Container)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  color: #fff;
`;

const AddBlogBox = styled(Box)`
  background-color: #1e1e1e;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;

  .MuiOutlinedInput-root {
    color: #fff;

    & fieldset {
      border-color: rgba(255, 255, 255, 0.5);
    }

    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.8);
    }

    &.Mui-focused fieldset {
      border-color: #fff;
    }
  }

  .MuiInputLabel-root {
    color: rgba(255, 255, 255, 0.7);
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

  return (
    <AddBlogContainer maxWidth={false} disableGutters>
      <AddBlogBox>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add a New Blog
        </Typography>
        <form>
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
          <AddBlogButton variant="contained" color="primary" fullWidth>
            Add Blog
          </AddBlogButton>
        </form>
      </AddBlogBox>
    </AddBlogContainer>
  );
};

export default AddBlog;
