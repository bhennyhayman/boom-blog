import  {Link}  from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../services/api';
import Theblog from './Theblog';


function Blogs({blogs, setBlogs}) {
  // This is a placeholder component for displaying blogs.
  return (
    <>
    {blogs.length > 0 ? <div>< Theblog blogs={blogs} setBlogs={setBlogs}/></div>: <div className='flex flex-col justify-center justify-self-center align-middle text-center text-2xl mt-20 p-20'>No blogs available <span className='text-blue-500 text'><Link to={'/addblog'}>Click to add</Link></span></div>}

    </>
  )
}

export default Blogs
