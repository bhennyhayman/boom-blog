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
   <div className="flex justify-between p-5 bg-white text-black">
    <div className='max-sm:text-[12px] cursor-pointer p-1'> <Link to='/home'>Home</Link></div>
    <div className='max-sm:text-[12px] cursor-pointer p-1'> <Link to='/blogs'>My blogs</Link></div>
    <div className='max-sm:text-[12px] cursor-pointer p-1'><Link to='/addblog'>Create blog</Link></div>
    <button className='max-sm:text-[12px] cursor-pointer text-red-600 font-bold p-1' onClick={signOut}>SignOut</button>
   </div>
    </>
  )
}

export default Header
