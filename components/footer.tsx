import { APP_NAME } from "@/lib/constants";
import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex-center border-t">
      <div className="p-5">
        {currentYear} {APP_NAME}. All Right Reserved
      </div>
    </footer>
  );
}

export default Footer;
