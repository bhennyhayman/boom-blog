import {Link, Navigate} from 'react-router-dom'
import { useState } from 'react'
import { loginUser } from '../services/api';

function Login({isLoggedIn,setisLoggedIn}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlelogin(e){
    e.preventDefault();
    if(!email || !password){
      setError("Enter email and password")
      return
    }
    try{
      setLoading(true);
      const data = await loginUser(email, password);
       if(data){
        console.log(data.message);
         <Navigate to="/" replace/>
         setisLoggedIn(data.token);
         localStorage.setItem("token", data.token);
       }
       setLoading(false);
    }catch(err){
      setError(err.message);
      setLoading(false);
      return;
    }
    setError("");
    setEmail('')
    setPassword('')
  }

  if(!isLoggedIn){
    return (
    <>
    <form className="display flex flex-col justify-center items-center mt-50">
      <div className=" flex justify-center align-middle p-2 mb-2">
        <input id="email" onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className="  border-b-2 border-blue-300 p-2 w-80 " />  
      </div>

       <div className=" flex justify-center align-middle p-2 mb-2">
         <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className=" border-b-2 border-blue-300 p-2 w-80 " />  
      </div>

      {error && <div className=' rounded ml-10 mr-10 text-white bg-red-500 m-4 p-2 flex justify-center '>{error}</div>}

      <button onClick={handlelogin} type="submit" className="flex justify-self-center bg-blue-600 p-2 rounded text-white mb-5"> {loading ? <div className="flex justify-center m-2">
                <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full inline-block"></span>
              </div>: "Login"} </button>

      <div className="flex justify-self-center underline"><Link to="/register">Click here to register</Link></div>
    </form>
    </>
  )

  }else{
    return(<Navigate to='/home' replace/>)
  }



  
}

export default Login