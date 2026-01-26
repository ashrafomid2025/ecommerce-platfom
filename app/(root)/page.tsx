// import { div } from "framer-motion/client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      <p>prostore</p>
    </div>
  );
  // route nav, footer
}
