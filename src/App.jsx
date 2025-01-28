import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Navbar from '../src/components/Navbar/Navbar';
// import Footer from './pages/Footer/Footer';
import AddBlog from "./pages/AddBlog/AddBlog";
import ReadMore from "./pages/ReadMore/ReadMore";
import AllBlogs from "./pages/AllBlogs/AllBlogs";
import EditBlogPage from "./pages/EditBlogPage/EditBlogPage"
import Comment from "./pages/Comment/Comment"
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/footer" element={<Footer />} /> */}
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/blog/:id" element={<ReadMore />} />
          <Route path="/allblogsbyuser/:id" element={<AllBlogs />} />
          <Route path="/editblog/:id" element={<EditBlogPage />} />
          <Route path="/comment/:id" element={<Comment />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
