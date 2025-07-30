import '../src/App.css'
import  {Link, Navigate}  from 'react-router-dom'

function Header({isLoggedIn,setisLoggedIn}) {

  function signOut(){
    localStorage.removeItem("token");
    setisLoggedIn(false);
    <Navigate to='/' replace/>
  }
  
  return (
    <>
   <div className="flex justify-around p-5 bg-amber-200 text-blue-700">
    <div> <Link to='/home'>Home</Link></div>
    <div> <Link to='/blogs'>My blogs</Link></div>
    <div><Link to='/addblog'>Create blog</Link></div>
    <button onClick={signOut}>SignOut</button>
   </div>
    </>
  )
}

export default Header
