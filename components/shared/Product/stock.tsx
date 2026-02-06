import React from 'react'

function Stock({value,className}:{value:number,className?:string}) {
    const stringValue = value.toFixed(2);
    const [int,float] = stringValue.split(".");
  return (
    <div className={`flex ${className}`}>
      <span className=' text-xs'>$</span>
      <p className='text-2xl font-bold'>{int}</p>
      <span className='text-xs'>{float}</span>
    </div>
  )
}

export default Stock