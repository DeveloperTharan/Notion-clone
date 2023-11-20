import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Getting Started',
    description: 'Getting Started | Notion',
}

const Main = ({ children } : { children : React.ReactNode }) => {
    return(
        <div>
            <main>{children}</main>
        </div>
    ) 
}

export default Main;