import { auth } from "@/auth";
import React from "react";

async function InsertProduct() {
  const session = await auth();
  if (session) {
    if (session.user?.role === "admin") {
      return (
        <div>
          <h1>Welcome to the insert product page</h1>
        </div>
      );
    } else {
      return <div>something went wrong</div>;
    }
  }
}

export default InsertProduct;
