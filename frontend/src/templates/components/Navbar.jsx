import { useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");

    };


    return (
        <div>

            <h2>
                Employee Portal
            </h2>

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );

}


export default Navbar;