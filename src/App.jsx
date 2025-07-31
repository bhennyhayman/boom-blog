import './App.css'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Blogs from '../components/Blogs'
import { Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import ErrorPage from '../components/404'
import AddBlog from '../components/AddBlog'
import ProtectedRoute from '../components/ProtectedRoute'
import SearchedBlog from '../components/SearchedBlog'
import Header from '../components/Header'
import Blog from '../components/Blog'


function App() {
  const savedToken = localStorage.getItem("token");
  const [isLoggedIn, setisLoggedIn] = useState(savedToken);

  const [blogs, setBlogs] = useState([]);
  return (
    <>
      <div className="brandName">bOOm bLOg</div>
  
        {isLoggedIn && <Header isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />}
        <Routes>
          <Route path='/' element={<Login isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home blogs={blogs} setBlogs={setBlogs} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/blogs'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Blogs blogs={blogs} setBlogs={setBlogs}/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/addblog'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddBlog blogs={blogs} setBlogs={setBlogs} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/search/:searchTerm'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SearchedBlog blogs={blogs} setBlogs={setBlogs} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/blog/:id'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Blog blogs={blogs} setBlogs={setBlogs} />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<ErrorPage isLoggedIn={isLoggedIn} />} />
        </Routes>
    </>
  )
}

export default App
