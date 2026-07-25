import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


function Layout({children}) {


    return (

        <div
            className="
                min-h-screen
                bg-[#FAFAF8]
            "
        >


            <Navbar />


            <div
                className="
                    flex
                "
            >


                <Sidebar />



                <main

                    className="
                        flex-1
                        p-8
                    "

                >

                    {children}


                </main>



            </div>



        </div>

    );

}


export default Layout;