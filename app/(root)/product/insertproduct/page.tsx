import { auth } from '@/auth'
import React from 'react'

async function InsertProduct() {
    const session = await auth();
    if(session){
        if(session.user?.roll === "admin"){
    return (
        <div>Welcome to the insert product page</div>
    )
}

else{
    return (<div>Something went wrong</div>)
}
}}
export default InsertProduct
