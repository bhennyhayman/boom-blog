import "../src/App.css"
import { useEffect } from 'react'
import { randomBlogs } from '../services/api'
import { Link } from 'react-router-dom'


function Home({blogs, setBlogs }) {
  useEffect(()=>{
    async function getRandomBlogs(){
      const response = await randomBlogs();
      
      setBlogs(response);
    }
    getRandomBlogs();
  }, []);
  return (
    <>
    <div className="flex justify-center items-center m-1 p-5 ">
     <div><input type="text" placeholder='Search blog' className='border-1 p-2 min-sm:w-120 justify-self-center max-sm:p-2 w-60' /><span className='searchBtn'>🔍</span></div>
    </div>
   
    <div className='flex flex-col m-2 p-2'>
        {blogs.length > 0 ? <div>{blogs.map((blog)=>{
          return <div key={blog.id} className='bg-white text-black text-[14px] shadow-md shadow-white m-2 mb-5 p-2 rounded-lg '>
            <div className='text-[14px] p-2 font-bold' key={blog.title}>{blog.title}</div>
            <div className='p-2' key={blog.content}>{blog.content.slice(0,100)+ "..." }</div>
            <div className='text-[12px] float-right mt-1 p-2 text-gray-500'>Created at: {new Date(blog.createdAt).toLocaleDateString()}</div>
            <div className="text-blue-600 font-bold m-2">
              <Link to={`/blog/${blog.id}`}>Read more</Link></div>
            </div>
            
        })}</div> : <h1 className='text-2xl text-center font-bold'>No blogs available</h1>}
    </div>
   

    </>
  )
}

export default Home
