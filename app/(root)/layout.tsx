import Footer from "@/components/Footer";
import Header from "@/components/shared/header";
// import { Inter } from "next/font/google";

// const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-col h-screen">
        <Header />
        <main className="wrapper flex-1">
            {children}
        </main>
        <Footer />
      </div>
  );
}