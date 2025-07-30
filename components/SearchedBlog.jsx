import { useState } from "react"
import { useParams } from "react-router-dom";

function SearchedBlog({blogs, setBlogs}) {
  
  const { searchTerm } = useParams();

  const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (filteredBlogs.length === 0) {
    return (<>
      <div className='text-center font-bold text-red-600 text-2xl mt-2'>Search results for: {searchTerm}</div>
    <div className='text-red-500 font-bold font-mono flex justify-center text-2xl items-center align-middle mt-30'>No blog with that title found</div>
    </>);
  }

  return (
    <div className='flex flex-col m-4 p-2'>
      <div className='text-center font-bold text-red-600 text-2xl'>Search results for: {searchTerm}</div>
      {filteredBlogs.map((blog, index) => (
        <div key={index} className='p-4 m-2 mb-15 shadow-grey-100 shadow-lg rounded-lg'>
          <h2 className='text-xl font-bold text-blue-600'>Title: {blog.title}</h2>
          <p className='m-2'>{blog.content}</p> 
          <p className='text-sm text-gray-500'>Created at: {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchedBlog