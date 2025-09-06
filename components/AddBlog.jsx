import { useState } from "react"
import { submitBlog } from "../services/api";


function AddBlog() {


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(''); // Add loading state

 async function handleAddBlog(){
    if(!title || !content){
      setError('Please enter a title and content');
      return;
    }
    setLoading(true); // Start loading
    setError("");
    setSuccess("");
    // Call the API to submit the blog
    const response = await submitBlog(title, content); 
    setLoading(false); // Stop loading
    if(response.createdAt){
      setTitle('');
      setContent('');
      setSuccess('Blog added successfully');
    }
    if(response.error) {
      setError(response.error || "error creating blog");
      const responseErr = JSON.parse(response.split("-")[1].trim());
      setError(responseErr.error)
    }
  }

  return (
    <>
   <div className="h-screen">
      <div >
        <h1 className="text-center py-4 text-[18px] italic">Creating your Blog</h1>
  
        <div className="flex flex-col justify-center max-sm:mx-5 max-sm:my-5 mx-10 bg-gray-100 text-black p-5 shadow-lg shadow-gray-500 max-sm:rounded">
          <input id="title" placeholder="Title here ..." value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="m-2 p-3 border-1 border-gray-400 rounded-[3px]"/>
          <textarea placeholder="Content .." value={content} onChange={(e)=>setContent(e.target.value)} type="text" className="m-2 p-3 border-1 border-gray-400 rounded-[3px] h-100"/>
      </div>

      {error && <div className="flex justify-self-center text-[18px] text-red-500 bg-white px-5 py-3 rounded"> {error}</div>}
      {success && <div className="flex justify-self-center items-center text-[18px] text-green-600 bg-white px-5 py-3 rounded">{success}</div>}

      <div className="flex justify-center items-center bg-cyan-800 w-fit mx-auto my-3 rounded p-2 hover:bg-cyan-600 hover:shadow-md hover:shadow-gray-500 transition-all duration-300 ease-in">
        {/* Show loading spinner when submitting */}
        {loading && (
              <div className="flex justify-center m-2">
                <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full inline-block"></span>
              </div>
            )}
        <div onClick={handleAddBlog} className="px-2 py-1 cursor-pointer" disabled={loading}>
              {loading ? "Submitting..." : "Add Blog"}
            </div>
            
      </div>
      </div>   
    </div>
      </>
  )
}

export default AddBlog