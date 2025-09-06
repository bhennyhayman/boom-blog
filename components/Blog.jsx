import React, { use, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchAllBlogs } from '../services/api';
import "../src/App.css";

function Blog({blogs, setBlogs}) {

  const { id } = useParams();

  useEffect(() => {
    async function getBlogs() {
      const response = await fetchAllBlogs();
      if(response.length > 0){
        response.filter((blog)=>{
          if(blog.id === Number(id)){
            setBlogs(blog)
          }
        })
      }
    }
    getBlogs()
  },[id])

  
  return (
    <>

      {blogs && <>
      <div className='max-sm:text-[20px] italic text-center mx-20 mt-5 b border-1 border-gray-500 md:text-[30px] text-2xl p-4 shadow-2xl shadow-blue-500 border-l-8 border-l-cyan-700' key={blogs.id}> <span>Title: </span> {blogs.title} </div>
      <div className='max-sm:text-[18px] mx-5 my-3 p-5 shadow-2xl rounded shadow-cyan-500 h-full bg-black text-white' key={blogs.content}> {blogs.content} </div>
      <div className='text-center mx-auto px-3 py-2 rounded bg-blue-400 w-fit'><Link to='/'>Go to Home</Link></div>
      </>}
      
    </>
  )
}

export default Blog;
