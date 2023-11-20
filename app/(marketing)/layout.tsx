import { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
    title: 'Your connected workspace for wiki, docs & projects | Notion',
    description: 'Your connected workspace for wiki, docs & projects | Notion',
}

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MarketingLayout;