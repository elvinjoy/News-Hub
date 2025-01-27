import React, { useEffect, useState } from "react";
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
    CircularProgress,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DEV_URL } from "../../Constants/Constants";
import { useSelector } from "react-redux"; // Import useSelector to get token

const EditBlogContainer = styled(Container)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const EditBlogBox = styled(Box)`
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

const ActionButtonBox = styled(Box)`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
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

const EditBlog = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState(null);

    const fileInputRef = React.useRef();
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token); // Get token from Redux

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`${DEV_URL}/blog/specificblog/${id}`, {
                    headers: { Authorization: `Bearer ${token}` } // Include token in request headers
                });
                const blog = response.data.blog;
                setBlogData(blog);
                setTitle(blog.title);
                setContent(blog.content);
                setTopic(blog.topic);
                setVisibility(blog.visibility);
                setPreviewUrl(blog.imageUrl);
            } catch (error) {
                toast.error("Error fetching blog details.");
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlogDetails();
    }, [id, token]); // Include token as dependency

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!title || !content || !topic) {
            toast.error("All fields are required! Please fill in the title, content, and topic.");
            return;
        }
    
        const confirmUpdate = window.confirm("Are you sure you want to update this blog?");
        if (!confirmUpdate) return;
    
        setLoading(true);
    
        try {
            const updatedBlogData = {
                title,
                content,
                topic,
                visibility,
                imageUrl: previewUrl, // Use the existing preview URL
            };
    
            console.log("Sending update request with data:", updatedBlogData);
    
            const response = await axios.put(
                `${DEV_URL}/blog/editblog/${id}`,
                updatedBlogData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            toast.success("Blog updated successfully!");
            console.log("Blog updated successfully!");
            navigate(`/`);
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error(`Error updating blog: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };
    

    const handleDelete = async () => {
        // Confirmation dialog for delete
        const confirmDelete = window.confirm("Are you sure you want to delete this blog? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${DEV_URL}/blog/deleteblog/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Blog deleted successfully!");
            console.log("Blog deleted successfully!");
            navigate(`/`);
        } catch (error) {
            toast.error("Error deleting blog!");
            console.error("Error deleting blog:", error);
        }
    };

    return (
        <>
            <ToastContainer />
            <EditBlogContainer maxWidth={false} disableGutters>
                <EditBlogBox>
                    <Typography variant="h4" align="center" gutterBottom>
                        Edit Blog
                    </Typography>
                    {blogData ? (
                        <form onSubmit={handleUpdate}>
                            <StyledTextField
                                label="Title"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                InputProps={{
                                    placeholder: "Enter title"
                                }}
                            />
                            <StyledTextField
                                label="Topic"
                                fullWidth
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                InputProps={{
                                    placeholder: "Enter topic"
                                }}
                            />
                            <StyledTextField
                                label="Content"
                                multiline
                                rows={6}
                                fullWidth
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                InputProps={{
                                    placeholder: "Enter content"
                                }}
                            />

                            <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                                <InputLabel id="visibility-label">Visibility</InputLabel>
                                <Select
                                    labelId="visibility-label"
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

                            <ActionButtonBox>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} style={{ color: "blue" }} /> : "Update"}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleDelete}
                                    fullWidth
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} style={{ color: "red" }} /> : "Delete"}
                                </Button>
                            </ActionButtonBox>
                        </form>
                    ) : (
                        <CircularProgress size={24} />
                    )}
                </EditBlogBox>
            </EditBlogContainer>
        </>
    );
};

export default EditBlog;
