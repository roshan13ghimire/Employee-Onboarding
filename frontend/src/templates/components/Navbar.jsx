import { useNavigate } from "react-router-dom";


function Navbar() {


    const navigate = useNavigate();


    const role = localStorage.getItem("role");



    const logout = () => {


        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");


        navigate("/login");


    };



    return (

        <div className="
            bg-white
            border-b
            px-8
            py-4
            flex
            justify-between
            items-center
        ">


            <h2 className="
                text-xl
                font-bold
                text-[#12304A]
            ">


            {
                role === "ADMIN" || role === "HR"

                ?

                "HR Portal"

                :

                "Employee Portal"

            }


            </h2>




            <button

                onClick={logout}

                className="
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                "

            >

                Logout

            </button>


        </div>

    );

}


export default Navbar;