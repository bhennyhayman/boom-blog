import React, { useEffect, useState } from 'react';
import {removeBlog } from '../services/api';
import {useNavigate, Navigate } from 'react-router-dom';
import "../src/App.css";

function Theblog({blogs, setBlogs}) {

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  async function deleteBlog(e){
    const blogId = e.target.dataset.id;

    setDeleteId(Number(blogId))

    // Here you would typically call an API to delete the blog
    try {
      setLoading(true);
      const response = await removeBlog(blogId);
      setLoading(false);
      // Update the state to remove the deleted blog
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== Number(blogId)));
        console.log("Blog deleted successfully");
      }catch (error) {
      console.error("Error deleting blog:", error);
      return;
      }
    }

  function searchBlog(e) {
    const searchTerm = e.target.previousSibling.value.toLowerCase();
    
    if (!searchTerm) {
      setNotFound(true);
      return;
    }
    setNotFound(false);
    e.target.previousSibling.value = '';
    navigate(`/search/${searchTerm}`);
    
  }
  
  return (
    <>
      <div className='flex flex-col m-5'>
        <div className="flex justify-center items-center max-sm:m-1 max-sm:p-5 ">
          <input type="text" placeholder='Search blog' className='border-1 p-3 justify-self-center w-2xs max-sm:w-60' />
          <span onClick={searchBlog} className='searchBtn'>🔍</span>
        </div>
        <div className='text-center'>Your Blogs ... </div>
        {notFound && <div className='text-red-500 font-bold font-mono flex justify-center items-center'>No blogs with that title found</div>}
        {blogs.map((blog, index) => (
          <div key={index} className='p-4 m-2 mb-15 shadow-grey-100 shadow-lg rounded-lg'>
            <h2 className='text-xl font-bold text-blue-600'>Title: {blog.title}</h2>
            <p className='m-2'>{blog.content}</p>
            <p className='text-sm text-gray-500'>Created at: {new Date(blog.createdAt).toLocaleDateString()} 
              <span key={index} onClick={deleteBlog} data-id={`${blog.id}`} className='float-right text-white bg-red-600 p-1.5 rounded hover:bg-red-400 cursor-pointer'> {loading && blog.id === deleteId ? "Deleting": "Delete" }</span></p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Theblog
