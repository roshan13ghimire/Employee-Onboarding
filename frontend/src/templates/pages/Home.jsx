import { Link } from "react-router-dom";


function Home() {


    return (

        <div className="min-h-screen bg-gray-50">


            {/* Navbar */}

            <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">


                <h1 className="text-2xl font-bold text-blue-600">
                    Employee Portal
                </h1>



                <div className="space-x-4">


                    <Link
                        to="/login"
                        className="
                        px-5
                        py-2
                        text-blue-600
                        border
                        border-blue-600
                        rounded-lg
                        hover:bg-blue-50
                        "
                    >
                        Login
                    </Link>



                    <Link
                        to="/signup"
                        className="
                        px-5
                        py-2
                        bg-blue-600
                        text-white
                        rounded-lg
                        hover:bg-blue-700
                        "
                    >
                        Sign Up
                    </Link>


                </div>


            </nav>




            {/* Hero Section */}


            <section className="text-center py-20 px-5">


                <h2 className="
                    text-5xl
                    font-bold
                    text-gray-800
                    mb-6
                ">
                    Simplify Employee Onboarding
                </h2>



                <p className="
                    text-lg
                    text-gray-600
                    max-w-3xl
                    mx-auto
                    mb-8
                ">
                    A secure employee onboarding platform where HR teams
                    manage documents and employees complete onboarding
                    tasks from anywhere.
                </p>



                <div className="space-x-4">


                    <Link
                        to="/login"
                        className="
                        bg-blue-600
                        text-white
                        px-8
                        py-3
                        rounded-lg
                        hover:bg-blue-700
                        "
                    >
                        Get Started
                    </Link>



                    <Link
                        to="/signup"
                        className="
                        bg-gray-200
                        px-8
                        py-3
                        rounded-lg
                        hover:bg-gray-300
                        "
                    >
                        Create Account
                    </Link>


                </div>


            </section>





            {/* Features */}


            <section className="
                grid
                md:grid-cols-3
                gap-6
                px-10
                pb-20
            ">


                <div className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow
                ">

                    <h3 className="text-xl font-bold mb-3">
                        Document Management
                    </h3>

                    <p className="text-gray-600">
                        HR can create, assign and track
                        onboarding documents easily.
                    </p>

                </div>





                <div className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow
                ">

                    <h3 className="text-xl font-bold mb-3">
                        Employee Portal
                    </h3>

                    <p className="text-gray-600">
                        Employees can upload documents
                        and track onboarding progress.
                    </p>

                </div>





                <div className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow
                ">

                    <h3 className="text-xl font-bold mb-3">
                        Secure Access
                    </h3>

                    <p className="text-gray-600">
                        Role-based authentication keeps
                        employee data protected.
                    </p>

                </div>


            </section>





            {/* Footer */}


            <footer className="
                bg-gray-900
                text-white
                text-center
                py-5
            ">

                © 2026 Employee Portal

            </footer>



        </div>

    );

}


export default Home;