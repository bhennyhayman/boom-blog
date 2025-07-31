import React, { use, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
      <div className='max-sm:text-[12px] text-center text-2xl m-2 p-2' key={blogs.id}> {blogs.title} </div>
      <div className='max-sm:text-[12px] p-5 shadow-2xl shadow-amber-50 m-5 border' key={blogs.content}> {blogs.content} </div>
      </>}
      
    </>
  )
}

export default Blog;
