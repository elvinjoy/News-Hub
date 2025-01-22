import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Navbar from './pages/Navbar/Navbar'
import Footer from './pages/Footer/Footer'
import AddBlog from "./pages/AddBlog/AddBlog";
import ReadMore from "./pages/ReadMore/ReadMore";
import AllBlogs from "./pages/AllBlogs/AllBlogs";
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={< Login />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/readmore" element={<ReadMore />} />
          <Route path="/allblogs" element={<AllBlogs />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
