import { Link } from "react-router-dom";


function Sidebar() {


    const role = localStorage.getItem("role");



    const isHR =
        role === "ADMIN" ||
        role === "HR";



    return (


        <aside
            className="
                w-64
                min-h-screen
                bg-[#12304A]
                text-white
                p-5
            "
        >



            <h2
                className="
                    text-2xl
                    font-bold
                    mb-8
                "
            >

                {
                    isHR
                    ?
                    "HR Portal"
                    :
                    "Employee Portal"
                }

            </h2>






            <nav className="space-y-3">



                {/* Dashboard */}


                <Link

                    to={
                        isHR
                        ?
                        "/hr-dashboard"
                        :
                        "/dashboard"
                    }

                    className="
                        block
                        hover:bg-white/10
                        p-3
                        rounded-lg
                        transition
                    "

                >

                    Dashboard

                </Link>







                {
                    isHR ?


                    <>

                        {/* Upload Document */}


                        <Link

                            to="/upload-document"

                            className="
                                block
                                hover:bg-white/10
                                p-3
                                rounded-lg
                                transition
                            "

                        >

                            Upload Document

                        </Link>






                        {/* Assign Documents */}


                        <Link

                            to="/assign-document"

                            className="
                                block
                                hover:bg-white/10
                                p-3
                                rounded-lg
                                transition
                            "

                        >

                            Assign Documents

                        </Link>







                        {/* Document Library */}


                        <Link

                            to="/document-library"

                            className="
                                block
                                hover:bg-white/10
                                p-3
                                rounded-lg
                                transition
                            "

                        >

                            Document Library

                        </Link>








                        {/* Review Employee Documents */}


                        <Link

                            to="/hr-documents"

                            className="
                                block
                                hover:bg-white/10
                                p-3
                                rounded-lg
                                transition
                            "

                        >

                            Review Documents

                        </Link>



                    </>





                    :



                    <>

                        {/* Employee Documents */}


                        <Link

                            to="/my-documents"

                            className="
                                block
                                hover:bg-white/10
                                p-3
                                rounded-lg
                                transition
                            "

                        >

                            My Documents

                        </Link>


                    </>


                }









                {/* Profile */}


                <Link

                    to="/profile"

                    className="
                        block
                        hover:bg-white/10
                        p-3
                        rounded-lg
                        transition
                    "

                >

                    Profile

                </Link>






            </nav>





        </aside>


    );

}


export default Sidebar;