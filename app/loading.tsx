import React from "react";
import Image from "next/image";
import loader from "../app/assets/loader.gif";
function LoadingPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={loader} height={150} width={150} alt="Loading" />
    </div>
  );
}

export default LoadingPage;
