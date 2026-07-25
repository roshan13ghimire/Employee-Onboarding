import { useEffect, useState } from "react";
import api from "../services/api";


function Profile() {


    const [profile, setProfile] = useState(null);



    const fetchProfile = async () => {


        try {


            const response = await api.get(
                "/profile/"
            );


            setProfile(response.data);



        } catch(error) {


            console.log(error);


        }


    };




    useEffect(() => {

        fetchProfile();

    }, []);





    if(!profile) {

        return (

            <div>

                Loading profile...

            </div>

        );

    }





    return (


        <div className="space-y-8">



            {/* Header */}


            <div>

                <h1
                    className="
                    text-3xl
                    font-bold
                    text-[#12304A]
                    "
                >

                    My Profile

                </h1>


                <p className="text-gray-600 mt-2">

                    View your account information.

                </p>


            </div>







            {/* Profile Card */}



            <div
                className="
                bg-white
                border
                rounded-xl
                p-8
                max-w-3xl
                "
            >



                <div
                    className="
                    flex
                    items-center
                    gap-5
                    mb-8
                    "
                >



                    <div
                        className="
                        w-16
                        h-16
                        rounded-full
                        bg-[#12304A]
                        text-white
                        flex
                        items-center
                        justify-center
                        text-2xl
                        font-bold
                        "
                    >

                        {
                            profile.username
                            .charAt(0)
                            .toUpperCase()
                        }


                    </div>





                    <div>

                        <h2
                            className="
                            text-xl
                            font-semibold
                            "
                        >

                            {profile.username}

                        </h2>


                        <p className="text-gray-500">

                            {profile.role}

                        </p>


                    </div>


                </div>







                <div
                    className="
                    grid
                    md:grid-cols-2
                    gap-6
                    "
                >



                    <InfoCard

                        label="Username"

                        value={profile.username}

                    />



                    <InfoCard

                        label="Email"

                        value={profile.email}

                    />



                    <InfoCard

                        label="Employee ID"

                        value={profile.employee_id || "N/A"}

                    />



                    <InfoCard

                        label="Department"

                        value={profile.department || "N/A"}

                    />



                    <InfoCard

                        label="Job Title"

                        value={profile.job_title || "N/A"}

                    />



                    <InfoCard

                        label="Role"

                        value={profile.role}

                    />



                </div>


            </div>



        </div>


    );

}







function InfoCard({

    label,
    value

}) {


    return (

        <div
            className="
            bg-gray-50
            border
            rounded-lg
            p-4
            "
        >

            <p
                className="
                text-sm
                text-gray-500
                "
            >

                {label}

            </p>


            <p
                className="
                font-medium
                mt-1
                "
            >

                {value}

            </p>


        </div>

    );

}



export default Profile;