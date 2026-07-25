import { useEffect, useState } from "react";
import api from "../services/api";


function AssignDocument() {


    const [employees, setEmployees] = useState([]);
    const [documents, setDocuments] = useState([]);


    const [employeeId, setEmployeeId] = useState("");
    const [documentId, setDocumentId] = useState("");


    const [message, setMessage] = useState("");



    const fetchData = async () => {


        try {


            const employeesResponse = await api.get(
                "/employees/"
            );


            const documentsResponse = await api.get(
                "/documents/"
            );



            setEmployees(
                employeesResponse.data
            );


            setDocuments(
                documentsResponse.data
            );



        } catch(error) {


            console.log(error);


        }


    };




    useEffect(() => {


        fetchData();


    }, []);






    const assignDocument = async () => {


        if(!employeeId || !documentId) {


            setMessage(
                "Please select employee and document."
            );


            return;

        }



        try {


            await api.post(

                "/assign-document/",

                {
                    employee_id: employeeId,
                    document_id: documentId
                }

            );



            setMessage(
                "Document assigned successfully."
            );



            setEmployeeId("");
            setDocumentId("");



        } catch(error) {


            console.log(error);


            setMessage(
                "Unable to assign document."
            );


        }


    };






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

                    Assign Document

                </h1>



                <p
                    className="
                        text-gray-600
                        mt-2
                    "
                >

                    Assign onboarding documents to employees.

                </p>


            </div>








            {/* Form Card */}


            <div
                className="
                    bg-white
                    border
                    rounded-xl
                    p-8
                    max-w-2xl
                "
            >




                <div className="space-y-6">





                    {/* Employee */}


                    <div>


                        <label
                            className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >

                            Select Employee

                        </label>



                        <select

                            value={employeeId}

                            onChange={
                                e =>
                                setEmployeeId(
                                    e.target.value
                                )
                            }


                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#12304A]
                            "

                        >


                            <option value="">

                                Choose employee

                            </option>



                            {
                                employees.map(emp => (


                                    <option

                                        key={emp.id}

                                        value={emp.id}

                                    >

                                        {emp.username}
                                        {" - "}
                                        {emp.job_title}


                                    </option>


                                ))
                            }


                        </select>


                    </div>









                    {/* Document */}


                    <div>


                        <label
                            className="
                                block
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >

                            Select Document

                        </label>




                        <select


                            value={documentId}


                            onChange={
                                e =>
                                setDocumentId(
                                    e.target.value
                                )
                            }


                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#12304A]
                            "


                        >



                            <option value="">

                                Choose document

                            </option>




                            {
                                documents.map(doc => (


                                    <option

                                        key={doc.id}

                                        value={doc.id}

                                    >

                                        {doc.title}

                                    </option>


                                ))
                            }



                        </select>


                    </div>








                    {/* Button */}


                    <button


                        onClick={assignDocument}


                        className="
                            w-full
                            bg-[#12304A]
                            text-white
                            py-3
                            rounded-lg
                            font-medium
                            hover:bg-[#0D2438]
                            transition
                        "


                    >

                        Assign Document

                    </button>







                    {
                        message &&


                        <div

                            className="
                                bg-gray-100
                                border
                                rounded-lg
                                p-4
                                text-gray-700
                            "

                        >

                            {message}

                        </div>


                    }





                </div>



            </div>






            {/* Information Card */}


            <div

                className="
                    bg-blue-50
                    border
                    border-blue-100
                    rounded-xl
                    p-6
                    max-w-2xl
                "

            >

                <h3
                    className="
                        font-semibold
                        text-[#12304A]
                    "
                >

                    HR Tip

                </h3>


                <p
                    className="
                        text-gray-600
                        mt-2
                    "
                >

                    Assign the correct onboarding documents
                    based on the employee's role and department.

                </p>


            </div>



        </div>


    );

}


export default AssignDocument;