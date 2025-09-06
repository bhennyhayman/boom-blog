import '../src/App.css'
import  {Navigate, NavLink}  from 'react-router-dom'
import { MdHome, MdLibraryBooks, MdBookmarkAdd, MdLogout } from 'react-icons/md';


function Header({setisLoggedIn}) {

  function signOut(){
    localStorage.removeItem("token");
    setisLoggedIn(false);
    <Navigate to='/' replace/>
  }
  
  return (
    <>
   <div id="home" className="flex justify-between p-5 bg-white text-black md:w-200 mx-auto">
    <div className='max-sm:text-[14px] hover:bg-cyan-500 hover:py-1 px-2 hover:rounded hover:text-white cursor-pointer p-1'> <NavLink to='/home' className={({ isActive }) =>
    isActive ? "text-blue-500 font-bold" : "text-gray-700"
  }><MdHome size={30} /></NavLink></div>
    <div className='max-sm:text-[14px]  hover:bg-cyan-500 hover:py-1 px-2 hover:rounded hover:text-white cursor-pointer p-1'> <NavLink to='/blogs' className={({ isActive }) =>
    isActive ? "text-blue-500 font-bold" : "text-gray-700"} ><MdLibraryBooks size={30} /></NavLink></div>
    <div className='max-sm:text-[14px] hover:bg-cyan-500 hover:py-1 px-2 hover:rounded hover:text-white cursor-pointer p-1'><NavLink to='/addblog' className={({ isActive }) =>
    isActive ? "text-blue-500 font-bold" : "text-gray-700"}><MdBookmarkAdd size={25}/></NavLink></div>
    <button className='max-sm:text-[14px] hover:py-1 px-2 hover:rounded hover:bg-blue-400' onClick={signOut}><MdLogout size={20} color='red' style={{ transform: "rotate(0deg)" }}/></button>
   </div>
    </>
  )
}

export default Header
