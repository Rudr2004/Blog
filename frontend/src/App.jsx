import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Navbar from './components/Navbar';
import BlogsDashboard from './components/BlogsDashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import AddBlog from './components/AddBlog';
import ForgotPassword from './pages/ForgotPassword';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const [isAddBlogVisible, setAddBlogVisible] = useState(false);

  const toggleAddBlog = () => {
    setAddBlogVisible(!isAddBlogVisible);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Toaster />
        <Navbar onAddBlogClick={toggleAddBlog} />
        <AddBlog open={isAddBlogVisible} handleClose={toggleAddBlog} />
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route path="/" element={user ? <BlogsDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
