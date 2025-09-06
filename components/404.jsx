import Login from './Login'
import {Link, Navigate} from 'react-router-dom'

function ErrorPage({isLoggedIn}) {
    if(!isLoggedIn){
      return <Navigate to="/" replace />
    }else{
      return (
      <div className='text-red-600 text-2xl flex justify-center m-30'>Page doesn't exist</div>
    )
    }
    
}

export default ErrorPage
