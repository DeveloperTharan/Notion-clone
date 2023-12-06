import { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Your connected workspace for wiki, docs & projects | Notion",
  description: "Your connected workspace for wiki, docs & projects | Notion",
};

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />   
      <main className="container mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default MarketingLayout;
