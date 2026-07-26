import { Link } from "react-router-dom";


function Home() {


    return (

        <div className="min-h-screen bg-[#FAFAF8]">


            {/* Header */}

            <header
                className="
                    bg-white
                    border-b
                    border-gray-200
                "
            >

                <div
                    className="
                        max-w-7xl
                        mx-auto
                        px-8
                        py-5
                        flex
                        justify-between
                        items-center
                    "
                >


                    {/* Branding */}

                    <div>

                        <h1
                            className="
                                text-2xl
                                font-semibold
                                text-[#12304A]
                            "
                        >
                            School Board
                        </h1>


                        <p
                            className="
                                text-sm
                                text-gray-500
                                mt-1
                            "
                        >
                            Employee Onboarding Portal
                        </p>


                    </div>




                    {/* Navigation */}

                    <div
                        className="
                            flex
                            items-center
                            gap-8
                        "
                    >

                        <Link

                            to="/login"

                            className="
                                text-gray-700
                                hover:text-[#12304A]
                                transition
                            "

                        >
                            Portal Login

                        </Link>



                        <Link

                            to="/signup"

                            className="
                                bg-[#12304A]
                                text-white
                                px-6
                                py-3
                                rounded-md
                                font-medium
                                hover:bg-[#0D2438]
                                transition
                            "

                        >
                            Employee Registration

                        </Link>


                    </div>


                </div>


            </header>





            {/* Hero Section */}


            <section
                className="
                    max-w-7xl
                    mx-auto
                    px-8
                    py-24
                    grid
                    md:grid-cols-2
                    gap-16
                    items-center
                "
            >



                {/* Left */}

                <div>


                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-wider
                            font-semibold
                            text-[#C9A227]
                            mb-5
                        "
                    >
                        Human Resources Services
                    </p>



                    <h2
                        className="
                            text-5xl
                            leading-tight
                            font-bold
                            text-[#12304A]
                        "
                    >

                        Welcome to your
                        employee onboarding
                        portal

                    </h2>



                    <p
                        className="
                            mt-7
                            text-lg
                            leading-relaxed
                            text-gray-600
                            max-w-xl
                        "
                    >

                        A secure digital workspace where new employees
                        can access required documents, complete onboarding
                        tasks, and stay connected with the Human Resources team.

                    </p>




                    <div
                        className="
                            mt-9
                            flex
                            gap-4
                        "
                    >


                        <Link

                            to="/login"

                            className="
                                bg-[#12304A]
                                text-white
                                px-8
                                py-3
                                rounded-md
                                font-medium
                                hover:bg-[#0D2438]
                            "

                        >
                            Access Portal

                        </Link>



                        


                    </div>


                </div>
                    {/* Portal Preview */}


                <div
                    className="
                        bg-white
                        border
                        border-gray-200
                        shadow-sm
                        p-8
                    "
                >


                    <div
                        className="
                            border-b
                            border-gray-200
                            pb-5
                            mb-6
                        "
                    >

                        <h3
                            className="
                                text-xl
                                font-semibold
                                text-[#12304A]
                            "
                        >
                            New Employee Checklist
                        </h3>


                        <p
                            className="
                                text-sm
                                text-gray-500
                                mt-2
                            "
                        >
                            Track your onboarding progress
                        </p>


                    </div>





                    <ChecklistItem
                        title="Offer Letter"
                        status="Completed"
                        color="text-green-700"
                    />


                    <ChecklistItem
                        title="Employee Policies"
                        status="Pending"
                        color="text-yellow-700"
                    />


                    <ChecklistItem
                        title="HR Review"
                        status="In Progress"
                        color="text-blue-700"
                    />





                    <div
                        className="
                            mt-8
                            border-t
                            pt-5
                        "
                    >

                        <p
                            className="
                                text-sm
                                text-gray-500
                            "
                        >
                            Completion Progress
                        </p>


                        <div
                            className="
                                mt-3
                                w-full
                                bg-gray-200
                                h-2
                            "
                        >

                            <div
                                className="
                                    bg-[#12304A]
                                    h-2
                                    w-3/4
                                "
                            >

                            </div>


                        </div>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-gray-600
                            "
                        >
                            75% completed
                        </p>


                    </div>


                </div>


            </section>





            {/* Demo Access */}


            <section
                className="
                    max-w-7xl
                    mx-auto
                    px-8
                    py-16
                "
            >

                <div
                    className="
                        bg-white
                        border
                        border-gray-200
                        p-8
                    "
                >


                    <h2
                        className="
                            text-3xl
                            font-bold
                            text-[#12304A]
                        "
                    >
                        Demo Access
                    </h2>


                    <p
                        className="
                            mt-3
                            text-gray-600
                        "
                    >
                        Explore the onboarding workflow using the demo accounts.
                    </p>




                    <div
                        className="
                            mt-8
                            grid
                            md:grid-cols-2
                            gap-8
                        "
                    >



                        <div
                            className="
                                border
                                border-gray-200
                                p-6
                                bg-[#FAFAF8]
                            "
                        >

                            <h3
                                className="
                                    text-xl
                                    font-semibold
                                    text-[#12304A]
                                "
                            >
                                HR / Admin Account
                            </h3>


                            <p
                                className="
                                    mt-3
                                    text-gray-600
                                "
                            >
                                Manage employee documents,
                                assignments, and approvals.
                            </p>


                            <div
                                className="
                                    mt-4
                                    text-sm
                                    text-gray-700
                                "
                            >

                                <p>
                                    Username: <strong>admin</strong>
                                </p>

                                <p>
                                    Password: admin
                                </p>


                            </div>


                        </div>






                       



                    </div>



                    <p
                        className="
                            mt-6
                            text-sm
                            text-gray-500
                        "
                    >
                        HR and administrative accounts are created internally
                        and are not available through public registration.
                    </p>



                </div>


            </section>








            {/* Features */}



            <section
                className="
                    bg-white
                    border-t
                    border-gray-200
                    py-20
                    px-8
                "
            >


                <div
                    className="
                        max-w-7xl
                        mx-auto
                    "
                >


                    <h2
                        className="
                            text-3xl
                            font-bold
                            text-[#12304A]
                        "
                    >
                        A better way to manage onboarding
                    </h2>


                    <p
                        className="
                            mt-3
                            text-gray-600
                            max-w-2xl
                        "
                    >
                        Designed to simplify document management
                        between employees, departments, and HR teams.
                    </p>




                    <div
                        className="
                            mt-10
                            grid
                            md:grid-cols-3
                            gap-8
                        "
                    >


                        <FeatureCard

                            title="Secure Documents"

                            text="Employees can access and submit important onboarding documents securely."

                        />



                        <FeatureCard

                            title="HR Workflow"

                            text="HR teams can assign documents and review employee submissions."

                        />



                        <FeatureCard

                            title="Progress Tracking"

                            text="Monitor onboarding completion from beginning to approval."

                        />



                    </div>


                </div>


            </section>








            {/* Footer */}


            <footer
                className="
                    bg-[#12304A]
                    text-white
                    py-8
                    text-center
                "
            >

                <p>
                    School Board Employee Onboarding Portal
                </p>


                <p
                    className="
                        text-sm
                        text-gray-300
                        mt-2
                    "
                >
                    Secure employee services platform
                </p>


            </footer>



        </div>

    );

}







function ChecklistItem({title,status,color}) {


    return (

        <div
            className="
                flex
                justify-between
                items-center
                py-4
                border-b
                border-gray-100
            "
        >

            <span
                className="
                    text-gray-700
                "
            >
                {title}
            </span>


            <span
                className={`
                    font-medium
                    ${color}
                `}
            >
                {status}
            </span>


        </div>

    );

}







function FeatureCard({title,text}) {


    return (

        <div
            className="
                border
                border-gray-200
                p-7
                bg-[#FAFAF8]
            "
        >


            <h3
                className="
                    text-xl
                    font-semibold
                    text-[#12304A]
                "
            >
                {title}
            </h3>



            <p
                className="
                    mt-4
                    text-gray-600
                    leading-relaxed
                "
            >
                {text}
            </p>


        </div>

    );

}




export default Home;