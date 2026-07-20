import { useEffect, useState } from "react";
import api from "../services/api";


function Dashboard(){

    const [documents, setDocuments] = useState([]);


    useEffect(()=>{

        fetchDocuments();

    },[]);



    const fetchDocuments = async()=>{

        const response = await api.get(
            "/my-documents/"
        );

        setDocuments(response.data);

    };


    return (

        <div>

            <h1>
                Employee Dashboard
            </h1>


            <h2>
                My Documents
            </h2>


            {
                documents.map((doc)=>(

                    <div key={doc.id}>

                        <h3>
                            {doc.document_title}
                        </h3>

                        <p>
                            Status: {doc.status}
                        </p>

                    </div>

                ))
            }


        </div>

    )

}


export default Dashboard;