import { useState } from "react"
import { submitBlog } from "../services/api";


function AddBlog() {


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

 async function handleAddBlog(){
    if(!title || !content){
      setError('Please enter title and content');
      return;
    }
    setLoading(true); // Start loading
    setError("");
    const response = await submitBlog(title, content); 
    setLoading(false); // Stop loading
    console.log(response);
    if(response.createdAt){
      setTitle('');
      setContent('');
      setError('Blog added successfully');
    }
    if(response.error) {
      setError(response.error || "error creating blog");
      const responseErr = JSON.parse(response.split("-")[1].trim());
      setError(responseErr.error)
    }
  }

  return (
    <>
   <div className="flex justify-around">
      <div className="grid-cols-1 align-middle justify-center p-4 m-3">
        <div className="flex">
          <label className="w-20">Enter title: </label>
          <input id="title" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className=" border rounded shadow-2xl w-80 h-10 p-3"/>
        </div>
        

      <div className="flex">
          <label className="w-20">Content: </label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} type="text" className="mt-2 border rounded shadow-md w-80 h-50 max-h-100 p-3"/>
      </div>

      {error && <div className="flex justify-self-center-safe m-3 text-red-600"> {error}</div>}

      <div>
        {/* Show loading spinner when submitting */}
        {loading && (
              <div className="flex justify-center m-2">
                <span className="animate-spin h-6 w-6 border-4 border-green-600 border-t-transparent rounded-full inline-block"></span>
              </div>
            )}
        <button onClick={handleAddBlog} className="p-3 m-5 flex justify-self-center bg-green-600 text-white rounded shadow-green-200 shadow-md cursor-pointer" disabled={loading}>
              {loading ? "Submitting..." : "Add Blog"}
            </button>
            
      </div>
      </div>   
    </div>
      </>
  )
}

export default AddBlog