import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Your connected workspace for wiki, docs & projects | Notion',
    description: 'Your connected workspace for wiki, docs & projects | Notion',
  }

const MarketingLayout = ({ children } : { children: React.ReactNode }) => {
    return(
        <html>
            <body>   
                <div className="container mx-auto">
                    {children}
                </div>
            </body>
        </html>
    )
 }

 export default MarketingLayout;