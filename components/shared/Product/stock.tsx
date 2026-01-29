import React from 'react'

function Stock({value,className}:{value:number,className?:string}) {
    const stringValue = value.toFixed(2);
    const [int,float] = stringValue.split(".");
  return (
    <div className=''></div>
  )
}

export default Stock