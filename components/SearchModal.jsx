import React, { useState } from 'react'

const SearchModal = ({setModal, searchTerm, setSearchTerm, results}) => {7

  const [read, setRead] = useState(false);
  function handleReadMore(){
    setRead(!read);
  }

  return (
    <div className='fixed top-0 h-screen w-dvw bg-[#161515e0]  p-2'>
      <div className='relative mt-40'>
        <p className='text-center text-[18px]'>Search results for {searchTerm}</p>
        <div className='absolute top-[-5px] bg-red-500 px-3 rounded-full py-0 right-10 text-2xl cursor-pointer' onClick={()=>{
          setModal(false);
          setSearchTerm("");
        }}>x</div>

         {results.length > 0 ? results.map((result, index)=> {
            return <React.Fragment key={index}>
          <div  className='mx-[8%] mt-10 p-[4%] border-1 border-gray-800 shadow-[1px_1px_10px_gray]'>
          <p className='text-[16px] pb-2 text-fuchsia-400'>Title: {result.title} </p>
          <p > {read ?  result.content :result.content.slice(0,50)+" ..."}</p>
          <div className='flex justify-between mx-1'>
          <p onClick={handleReadMore} className='text-blue-300 mt-2'>Read more</p>
          </div>
          </div>
            </React.Fragment>
        }) : <div className='text-center text-2xl mt-15'> Nothing Found  </div>}
        
      </div>
    </div>
  )
}

export default SearchModal