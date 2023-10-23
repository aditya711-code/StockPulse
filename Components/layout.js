import NavBar from "./Navbar";
import { ReduxProvider } from "@/redux/Provider";
const Layout=({children})=>{
    return (
        <>
        <ReduxProvider>
            <NavBar/>
            <main>{children}</main>
         </ReduxProvider>
        </>
    )
}
export default Layout