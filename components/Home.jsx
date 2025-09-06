import "../src/App.css"
import { useEffect, useState } from 'react'
import { randomBlogs } from '../services/api'
import { Link } from 'react-router-dom'
import {MdSearch} from "react-icons/md"
import SearchModal from "./SearchModal"
import { searchBlog } from "../services/api"

function Home({blogs, setBlogs }) {

  useEffect(()=>{
    async function getRandomBlogs(){
      const response = await randomBlogs();
      setBlogs(response);
    }
    getRandomBlogs();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async(e) => {
    e.preventDefault();
    if(!searchTerm){
      return;
    }
    setModal(true)
    const response = await searchBlog(searchTerm);
    setResults(response.blogs);
    

  }
  return (
    <>
    <div className="mb-10">
    <div className={`${modal ? "opacity-0" : "flex"} px-10 mt-5 text-2xl italic md:text-center`}>Latest blogs</div>
    <hr className="mt-2 md:mt-3" />

    <form className={`${modal ? "hidden" : "flex"} my-6 items-center mx-[20%] max-sm:mx-10 min-md:mx-[30%]`}>
      <input type="text" placeholder="Find blog" className="px-4 py-2 border-1 border-gray-800 max-sm:flex-1 flex-1"  value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      <button onClick={handleSearch} className="px-2 py-2 border-2 bg-white"><MdSearch size={20} color="black"/></button>
    </form>

    {modal ? <SearchModal setModal={setModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm} results={results}/> : <div className='flex flex-col'>
        {blogs.length > 0 ? <div>{blogs.map((blog)=>{
          return (
          <div key={blog.id} className='mx-3 my-2 shadow-gray-700 p-2 border-x-2 border-gray-900 bg-[#07070738] md:mx-[15%] lg:mx-[20%]'>
            <div className='text-[16px] text-fuchsia-700 p-2 font-bold' key={blog.title}>
            {blog.title}</div>
            <hr className="w-vw mx-3 mb-2 text-blue-300 shadow-2xl shadow-blue-600"/>
            <div className='p-2' key={blog.content}>{blog.content.slice(0,300)+ "..." }</div>
            <div className=' float-right text-[13px] mt-1 p-2 text-cyan-300'> {blog.createdAt.slice(0,10).split("-").reverse().join("/")}</div>
            <div className="text-blue-400 m-2 text-[14px]">
              <Link to={`/blog/${blog.id}`}>Read more...</Link></div>
            </div>)
            
        })}</div> : <h1 className='text-2xl text-center font-bold'>No blogs available</h1>}
    </div> }

    
   </div>

    </>
  )
}

export default Home
