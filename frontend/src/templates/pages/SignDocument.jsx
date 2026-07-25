import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import api from "../services/api";


function SignDocument() {


    const signatureRef = useRef(null);

    const navigate = useNavigate();

    const { id } = useParams();



    const clearSignature = () => {

        signatureRef.current.clear();

    };




    const submitSignature = async () => {


        if(signatureRef.current.isEmpty()) {

            alert(
                "Please provide your signature"
            );

            return;

        }




        const signature =
            signatureRef.current
            .getCanvas()
            .toDataURL("image/png");





        try {


            await api.post(

                `/my-documents/${id}/sign/`,

                {
                    signature: signature
                }

            );



            alert(
                "Document signed successfully"
            );



            navigate("/dashboard");



        } catch(error) {


            console.log(error.response);


            alert(
                "Signature failed"
            );


        }


    };







    return (


        <div
            className="
                max-w-3xl
                mx-auto
            "
        >


            <div
                className="
                    bg-white
                    border
                    rounded-xl
                    shadow
                    p-8
                "
            >



                <h1
                    className="
                        text-3xl
                        font-bold
                        text-[#12304A]
                    "
                >

                    Digital Signature

                </h1>



                <p
                    className="
                        text-gray-600
                        mt-2
                        mb-6
                    "
                >

                    Please sign below to acknowledge this document.

                </p>





                <div
                    className="
                        border
                        rounded-lg
                        bg-gray-50
                    "
                >

                    <SignatureCanvas

                        ref={signatureRef}

                        penColor="black"

                        canvasProps={{
                            width: 600,
                            height: 250,
                            className:
                            "w-full"
                        }}

                    />

                </div>





                <div
                    className="
                        flex
                        gap-4
                        mt-6
                    "
                >



                    <button

                        onClick={clearSignature}

                        className="
                            px-5
                            py-2
                            border
                            rounded-lg
                            text-gray-700
                        "

                    >

                        Clear

                    </button>






                    <button

                        onClick={submitSignature}

                        className="
                            px-5
                            py-2
                            bg-[#12304A]
                            text-white
                            rounded-lg
                        "

                    >

                        Submit Signature

                    </button>



                </div>





            </div>


        </div>


    );


}


export default SignDocument;