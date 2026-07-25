import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function HRUploadDocument() {


    const navigate = useNavigate();



    const [formData, setFormData] = useState({

        title: "",
        category: "",
        job_type: "",
        version: "1.0",
        action_type: "UPLOAD"

    });



    const [file, setFile] = useState(null);




    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };






    const handleSubmit = async (e) => {


        e.preventDefault();



        const data = new FormData();



        data.append(
            "title",
            formData.title
        );


        data.append(
            "category",
            formData.category
        );


        data.append(
            "job_type",
            formData.job_type
        );


        data.append(
            "version",
            formData.version
        );


        data.append(
            "action_type",
            formData.action_type
        );



        data.append(
            "file",
            file
        );





        try {



            await api.post(

                "/create-document/",

                data,

                {
                    headers: {

                        "Content-Type":
                        "multipart/form-data"

                    }
                }

            );



            alert(
                "Document uploaded successfully"
            );



            navigate(
                "/hr-dashboard"
            );



        } catch(error) {


            console.log(
                error.response
            );


            alert(
                "Upload failed"
            );


        }


    };







    return (


        <div className="max-w-3xl mx-auto">



            <div
                className="
                    bg-white
                    shadow-lg
                    rounded-2xl
                    p-8
                "
            >




                <div className="mb-8">


                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-gray-800
                        "
                    >

                        Upload New Document

                    </h1>



                    <p
                        className="
                            text-gray-500
                            mt-2
                        "
                    >

                        Add onboarding documents for employees.

                    </p>


                </div>






                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >





                    {/* Title */}

                    <div>

                        <label
                            className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >

                            Document Title

                        </label>



                        <input

                            name="title"

                            placeholder="Example: Employee Handbook"

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:ring-2
                                focus:ring-blue-500
                                focus:outline-none
                            "

                        />

                    </div>







                    {/* Category */}


                    <div>


                        <label
                            className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >

                            Category

                        </label>



                        <input

                            name="category"

                            placeholder="Example: Policy, Offer Letter"

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                            "

                        />


                    </div>









                    {/* Job Type */}


                    <div>


                        <label
                            className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >

                            Job Type

                        </label>



                        <input

                            name="job_type"

                            placeholder="Example: Teacher, Developer"

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                            "

                        />


                    </div>









                    {/* Version */}


                    <div>


                        <label
                            className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >

                            Version

                        </label>



                        <input

                            name="version"

                            value={formData.version}

                            onChange={handleChange}

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                            "

                        />


                    </div>









                    {/* Action Type */}


                    <div>


                        <label
                            className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >

                            Required Action

                        </label>




                        <select

                            name="action_type"

                            value={
                                formData.action_type
                            }

                            onChange={
                                handleChange
                            }

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                            "

                        >


                            <option value="UPLOAD">

                                Requires Upload

                            </option>



                            <option value="SIGNATURE">

                                Requires Signature

                            </option>



                            <option value="VIEW_ONLY">

                                View Only

                            </option>



                        </select>



                    </div>









                    {/* File Upload */}


                    <div>


                        <label
                            className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >

                            Upload File

                        </label>




                        <div
                            className="
                                border-2
                                border-dashed
                                rounded-xl
                                p-6
                                text-center
                                bg-gray-50
                            "
                        >



                            <input

                                type="file"

                                onChange={
                                    e =>
                                    setFile(
                                        e.target.files[0]
                                    )
                                }

                                className="
                                    mx-auto
                                "

                            />




                            {
                                file &&


                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        text-gray-600
                                    "
                                >

                                    Selected: {file.name}

                                </p>


                            }



                        </div>


                    </div>









                    <div className="flex gap-4">



                        <button

                            type="submit"

                            className="
                                flex-1
                                bg-blue-600
                                text-white
                                py-3
                                rounded-lg
                                font-semibold
                                hover:bg-blue-700
                            "

                        >

                            Upload Document

                        </button>





                        <button

                            type="button"

                            onClick={
                                () =>
                                navigate(
                                    "/hr-dashboard"
                                )
                            }


                            className="
                                px-6
                                border
                                rounded-lg
                                text-gray-600
                            "

                        >

                            Cancel

                        </button>



                    </div>





                </form>




            </div>



        </div>


    );

}



export default HRUploadDocument;