import { useState } from "react"
import { Link } from "react-router-dom"
import { registerUser } from "../services/api";

function Register() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [err, setErr] = useState("");
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
  const [loading, setLoading] = useState(false);
  

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
    <hr />
    <form className="display flex flex-col justify-center items-center mt-50">
      <div className=" flex justify-center align-middle p-2 mb-2">
        <input id="email" placeholder='Enter Email' onChange={(e)=>setNewEmail(e.target.value)} value={newEmail} type="text" className=" input-field" />  
      </div>

       <div className=" flex justify-center align-middle p-2 mb-2">
         <input id="password" placeholder='Enter Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} type="password" className="input-field" />  
      </div>

      {err && <div className=' rounded ml-10 mr-10 text-white bg-red-500 m-4 p-2 flex justify-center '>{err}</div>}

      <button  onClick={handleUser} type="submit" className="button"> {loading ? <div className="flex justify-center m-2">
                <span className="loading"></span>
              </div>: "Register"} </button>

      <div className="flex justify-self-center underline"><Link to="/">Sign In instead</Link></div>
    </form>
    

    

    </>
  )
}

export default Register