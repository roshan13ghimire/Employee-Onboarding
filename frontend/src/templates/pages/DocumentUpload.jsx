import { useState } from "react";
import api from "../services/api";


function DocumentUpload({
    documentId,
    refreshDocuments
}) {


    const [file, setFile] = useState(null);



    const uploadDocument = async () => {


        if (!file) {

            alert("Please select a file");
            return;

        }



        const formData = new FormData();


        formData.append(
            "uploaded_file",
            file
        );



        try {


            await api.post(

                `/my-documents/${documentId}/upload/`,

                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );



            alert(
                "Document uploaded successfully"
            );


            refreshDocuments();



        } catch(error) {


            console.log(error.response);

            alert(
                "Upload failed"
            );

        }


    };



    return (


        <div className="bg-gray-50 border rounded-lg p-4">


            <h4 className="font-semibold mb-3">
                Upload Completed Document
            </h4>



            <input

                type="file"

                className="
                    block
                    w-full
                    text-sm
                    text-gray-700
                    border
                    rounded-lg
                    cursor-pointer
                    bg-white
                    p-2
                "

                onChange={
                    (e) =>
                    setFile(
                        e.target.files[0]
                    )
                }

            />


            <button

                onClick={uploadDocument}

                className="
                    mt-4
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    hover:bg-blue-700
                "

            >

                Upload

            </button>



        </div>


    );

}


export default DocumentUpload;