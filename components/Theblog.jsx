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
      <div className='flex flex-col'>
        <div className='text-[18px] text-center italic py-4'>MY BLOGS</div>
        <div className="flex my-5 mx-5 justify-center items-center ">
          <input type="text" placeholder='Search blog' className='border-1 py-2 px-5 shadow-sm shadow-cyan-100 border-gray-400'/>
          <span onClick={searchBlog} className='cursor-pointer shadow-sm shadow-cyan-100 hover:bg-cyan-300 transition-all ease-in  px-[10px] border-l-0 py-[9px]'>🔍</span>
        </div>

         {notFound && <div className='text-red-500 bg-white py-2 font-bold font-mono text-[18px] flex justify-center items-center italic'>Enter a title</div>}
       
        {blogs.map((blog, index) => (
          <div key={index} className='flex flex-col max-sm:mx-6 max-sm:my-1 border-1 p-5 shadow-lg shadow-cyan-10 my-5 mx-10 shadow-cyan-800 border-gray-700'>
            <h2 className='text-[16px] italic font-bold text-cyan-500'>Title: {blog.title}</h2>
            <hr className='text-cyan-300 m-2' />
            <p className='m-2 '>{blog.content}</p>
            <p className='flex items-center justify-between text-gray-500 align-middle p-2'>Created at: {new Date(blog.createdAt).toLocaleDateString()} 
              <span key={index} onClick={deleteBlog} data-id={`${blog.id}`} className='text-white bg-red-600 px-3 py-1 rounded hover:bg-red-300 cursor-pointer'> {loading && blog.id === deleteId ? "Deleting": "Delete" }</span></p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Theblog
