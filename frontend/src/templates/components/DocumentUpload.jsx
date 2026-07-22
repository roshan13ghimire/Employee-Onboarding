import { useState } from "react";
import api from "../services/api";


function DocumentUpload({ documentId, refreshDocuments }) {

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);


    const uploadFile = async () => {

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

            setUploading(true);


            const response = await api.post(
                `/my-documents/${documentId}/upload/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );


            console.log(response.data);


            alert("Upload successful");


            // Refresh document list after upload
            await refreshDocuments();


            // Clear selected file
            setFile(null);


        } catch (error) {

            console.log(error.response);

            alert("Upload failed");


        } finally {

            setUploading(false);

        }

    };


    return (

        <div>

            <input
                type="file"
                onChange={
                    (e) => setFile(e.target.files[0])
                }
                disabled={uploading}
            />


            <button
                onClick={uploadFile}
                disabled={uploading}
            >

                {
                    uploading
                    ? "Uploading..."
                    : "Upload"
                }

            </button>


        </div>

    );

}


export default DocumentUpload;