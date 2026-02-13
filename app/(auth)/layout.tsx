// import { Inter } from "next/font/google";

// const inter = Inter({subsets: ["latin"]})

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex-center w-full min-h-screen">
            {children}
      </div>
  );
}