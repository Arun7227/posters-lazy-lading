import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from "./component/Header.js"
import { baseApi } from '../../constant.js';
import Posters from './Posters.js';

const HomePage = () => {
const [posters,Setposters]=useState([]);
const [common,Setcommon]=useState({
  totalcotentReturned:0,
  lasttotalcotentReturned:0,
  title:'',
  loading:false,
  hasMore:true,
})
const [page,SetPage]=useState(1)
const observer = useRef();


const fetchNewData=async()=>{
try{
  debugger
  if(common.totalcotentReturned!=common.lasttotalcotentReturned)return

  if(common.loading || !common.hasMore)return;
  Setcommon(prev=>(
    {
      ...prev,
      loading:true
    }
  ))
  let responce=await fetch(`${baseApi}/data/page${page}.json`)
  let responseData=await responce.json();
  let newItems=responseData.page['content-items'].content
  Setposters(prevItems=>[...prevItems,...newItems]);
  SetPage(prevpage=>prevpage+1);
  Setcommon(prev=>(
    {
      ...prev,
      hasMore:newItems.length>0,
      lasttotalcotentReturned:responseData.page['page-size-returned'],
    }
  ))
}catch(err){
  console.error('Error fetching data:', err);
}
Setcommon(prev=>(
  {
    ...prev,
    loading:false
  }
))


}

const fetchData=async()=>{
  let response=await fetch(`${baseApi}/data/page${page}.json`);
  let fetchedData=await response.json();
  
  Setcommon((prev)=>({
    ...prev,
    totalcotentReturned:fetchedData.page['page-size-returned'],
    lasttotalcotentReturned:fetchedData.page['page-size-returned'],
    title:fetchedData.page.title
  }))
  Setposters(fetchedData.page['content-items'].content)
   SetPage(page+1)
}
useEffect(()=>{
   fetchData()
 console.log(page)

},[])



const lastElementRef = useCallback(
  (node) => {
    if (common.loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && common.hasMore) {
        fetchNewData();
      }
    });
    if (node) observer.current.observe(node);
  },
  [common.loading, common.hasMore, fetchNewData]
);

  return (
    <>
    <Header title={common.title}/>
    <div className='container mx-auto px-2 relative pt-28'>
        <Posters posters={posters} lastElementRef={lastElementRef}/>
        {common.loading && <p className='text-center'>Loading more items...</p>}
    </div>
    </>
  )
}

export default HomePage