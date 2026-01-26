import Footer from "@/components/Footer";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div  className="flex flex-col h-screen">
    <Header />
      <main className=" Wrapper flex-1">
        
        {children}
        
      </main>
      <Footer />
   </div>
  );
}