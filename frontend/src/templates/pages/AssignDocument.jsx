import { useEffect, useState } from "react";
import api from "../services/api";


function AssignDocument() {


    const [employees, setEmployees] = useState([]);
    const [documents, setDocuments] = useState([]);


    const [employeeId, setEmployeeId] = useState("");
    const [documentId, setDocumentId] = useState("");



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


        try {


            await api.post(
                "/assign-document/",
                {
                    employee_id: employeeId,
                    document_id: documentId
                }
            );


            alert(
                "Document assigned"
            );


        } catch(error) {

            console.log(error);

        }

    };




    return (

        <div>


            <h1>
                Assign Document
            </h1>



            <select
                onChange={
                    e => setEmployeeId(e.target.value)
                }
            >

                <option>
                    Select Employee
                </option>


                {
                    employees.map(emp => (

                        <option
                            key={emp.id}
                            value={emp.id}
                        >
                            {emp.username}
                        </option>

                    ))
                }


            </select>



            <select
                onChange={
                    e => setDocumentId(e.target.value)
                }
            >

                <option>
                    Select Document
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



            <button
                onClick={assignDocument}
            >
                Assign
            </button>


        </div>

    );

}


export default AssignDocument;