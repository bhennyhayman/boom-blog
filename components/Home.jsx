import "../src/App.css"
import { useEffect } from 'react'
import { randomBlogs } from '../services/api'


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
   
    <div className='flex flex-col m-2'>
        {blogs.length > 0 ? <div>{blogs.map((blog)=>{
          return <div key={blog.id} className='shadow-lg shadow-black-200 m-2 p-2 rounded-lg'>
            <div className='text-2xl m-2 p-2' key={blog.title}>{blog.title}</div>
            <div className='m-2 p-2' key={blog.content}>{blog.content}</div>
            </div>
        })}</div> : <h1 className='text-2xl font-bold'>No blogs available</h1>}
    </div>
   

    </>
  )
}

export default Home
