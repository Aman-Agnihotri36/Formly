import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" w-full md:flex-col md:items-center">
            <Header />
            {children}

        </div>
    )
}

export default Layout