import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="wrapper flex-1">{children}</main>
      <Footer />
    </div>
  );
}
