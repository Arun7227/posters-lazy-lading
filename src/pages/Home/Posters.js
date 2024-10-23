import React from 'react'
import { baseApi } from '../../constant'
const Posters = ({posters,lastElementRef}) => {
    let imageBaseurl=`${baseApi}/images`
  return (
    <div className='grid grid-cols-3 gap-0  sm:gap-2 md:gap-4' >
        {
            posters &&
            posters.length &&
            posters.map((data,index)=>(
                <div className='mb-4 p-1 md:P-2' key={index} ref={index === posters.length - 1 ? lastElementRef : null}>
                <img
                 src={`${imageBaseurl}/${data['poster-image']}`} 
                 className='w-full object-cover rounded-sm' 
                 alt={data['poster-image']} 
                 loading='lazy'
                 onError={(e)=>(e.target.src=`${imageBaseurl}/poster1.jpg`)}
                 />
                 <h1 className='text-sm md:text-2xl mt-3'>{data.name}</h1>
                </div>
            ))
        }

   
    </div>
  )
}

export default Posters