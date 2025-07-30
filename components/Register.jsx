import { useState } from "react"
import { Link } from "react-router-dom"
import { registerUser } from "../services/api";

function Register() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [err, setErr] = useState("");
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
  

  const handleUser = async(e) => {
    e.preventDefault()
    if(!newEmail || !newPassword){
      setErr("Cannot Register.. Enter email and password")
      return
    }
    if(!isValid) {
      setErr("Invalid email format");
      return;
    }
    if(newPassword.length < 6) {
      setErr("Password must be at least 6 characters long");
      return;
    }
    try{
      const data = await registerUser(newEmail, newPassword);
      console.log(data, "user registered");
      alert(data.message)
    }catch(error) {
      setErr(error.message || "Failed to register user");
      return;
    }

    // Clear input fields and error message on successful registration
    setErr("")
    setNewEmail("")
    setNewPassword("")

  }
  
  return (
    <>
    <form className="bg-green-700 text-white rounded-2xl flex-row align-middle justify-self-center pt-5 mt-20 shadow-2xl">
      <div id="email" className=" flex justify-center align-middle p-2 mb-2">
         <label className="text-1xl p-2">Email:</label>
        <input onChange={(e)=>{setNewEmail(e.target.value)}} value={newEmail} type="email" className="  border-b-2 border-blue-300 p-2 w-80" required/>  

      </div>

       <div id="password" className=" flex justify-center align-middle p-2 mb-2">
         <label className="text-1xl p-2">Password:</label>
         <input onChange={(e)=>{setNewPassword(e.target.value)}} value={newPassword} type="password" className="  border-b-2 border-blue-300 p-2 w-80 " />  
      </div>
      
      {err && <div className=" rounded ml-10 mr-10 text-white bg-red-500 m-4 p-2 flex justify-center ">{err}</div>}
      <button onClick={handleUser} type="submit" className="flex justify-self-center bg-blue-600 p-2 rounded text-white mb-5"> Register </button>

      
       <div className="flex justify-self-center underline"><Link to="/">Go back</Link></div>

    </form>
    

    

    </>
  )
}

export default Register