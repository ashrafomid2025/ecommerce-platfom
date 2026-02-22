import { auth } from "@/auth"
import { redirect } from "next/navigation";

async function page() {
    const session = await auth();
    if(session){
    if( session?.user?.role === "Admin"){
  return (
    <div>
        <h1>Wellcom To the insert Product Page</h1>
    </div>
  )
   }
   else{
    return redirect('/');
   }
    }
}

export default page