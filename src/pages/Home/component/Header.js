import React, { useRef, useState } from 'react'
import leftArrow from "../../../assets/left-arrow.svg"
import searchIcon from "../../../assets/search.svg"
const Header = ({title}) => {
  const [showsearch,setShowSearch]=useState(false)
  const searchRef=useRef(null)
  const showsearchBox=()=>{
    setShowSearch(true)
      if (!showsearch) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  }
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
      document.removeEventListener('mousedown', handleClickOutside)
    }
  };
  return (
    // <div className='bg-[#171717] shadow-[0px_-2px_23px_0px_#171717] p-10 px-2'>
    <div className="fixed w-full z-50">
      <div className='header-bg bg-no-repeat bg-center bg-cover py-10  flex justify-between px-5 mx-auto' style={{ height: '100px', width: '100%'}}>
      <div>
      <img src={leftArrow} alt='icon' className='h-5 w-5 inline-block' />
      <h4 className='inline-block ml-2 align-middle'>{title}</h4> 
      </div>
      <div>
      {showsearch ? <input ref={searchRef} type='search' placeholder='search here...' className='rounded-lg px-2 py-1 search-d-animation outline-none text-black'/>:
        <img src={searchIcon} alt='icon' className='h-5 w-5 inline-block cursor-pointer' onClick={showsearchBox}/>}
      </div>

      </div>
    </div>
  )
}

export default React.memo(Header)