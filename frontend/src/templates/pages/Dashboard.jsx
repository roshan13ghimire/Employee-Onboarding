import { useEffect, useState } from "react";
import api from "../services/api";

import DocumentUpload from "../components/DocumentUpload";
import Layout from "../components/Layout";


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

        <Layout>


            <h1 className="text-3xl font-bold mb-6">
                Employee Dashboard
            </h1>



            <h2 className="text-xl font-semibold mb-4">
                My Documents
            </h2>




            {
                documents.length === 0 ?


                (

                    <p className="text-gray-600">
                        No documents assigned
                    </p>

                )


                :


                (

                    <div className="space-y-4">


                    {
                        documents.map((doc) => (


                            <div
                                key={doc.id}
                                className="bg-white rounded-lg shadow p-6"
                            >


                                <h3 className="text-xl font-bold">
                                    {doc.document_title}
                                </h3>



                                <p className="mt-2">
                                    Status:

                                    <span className="ml-2 font-semibold">
                                        {doc.status}
                                    </span>

                                </p>



                                {
                                    doc.status === "PENDING" &&


                                    <div className="mt-4">


                                        <DocumentUpload

                                            documentId={doc.id}

                                            refreshDocuments={
                                                fetchDocuments
                                            }

                                        />


                                    </div>

                                }



                            </div>


                        ))
                    }


                    </div>

                )

            }



        </Layout>

    );

}


export default Dashboard;