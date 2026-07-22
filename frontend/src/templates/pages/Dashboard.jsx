import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import DocumentUpload from "../components/DocumentUpload";


function Dashboard() {

    const [documents, setDocuments] = useState([]);


    const fetchDocuments = async () => {

        try {

            const response = await api.get(
                "/my-documents/"
            );


            console.log(response.data);

            setDocuments(response.data);


        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchDocuments();

    }, []);



    return (

        <div>

            <Navbar />


            <h1>
                Employee Dashboard
            </h1>


            <h2>
                My Documents
            </h2>



            {
                documents.length === 0 ?

                (

                    <p>
                        No documents assigned
                    </p>

                )

                :

                (

                    documents.map((doc) => (

                        <div key={doc.id}>

                            <h3>
                                {doc.document_title}
                            </h3>


                            <p>
                                Status: {doc.status}
                            </p>


                            {
                                doc.status !== "SUBMITTED" &&

                                <DocumentUpload
                                    documentId={doc.id}
                                    refreshDocuments={fetchDocuments}
                                />

                            }


                        </div>

                    ))

                )
            }


        </div>

    );

}


export default Dashboard;