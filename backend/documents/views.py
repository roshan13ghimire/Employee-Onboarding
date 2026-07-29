from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.core.files.base import ContentFile

import base64


from .models import Document, EmployeeDocument

from .serializers import (
    DocumentSerializer,
    EmployeeDocumentSerializer,
    HRDocumentStatusSerializer,
    AssignDocumentSerializer,
    HRDocumentSerializer,
    CreateDocumentSerializer,
    EmployeeProfileDocumentSerializer
)

from accounts.models import EmployeeProfile

from accounts.permissions import (
    IsHRUser,
    IsEmployeeUser
)





class DocumentListAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsHRUser
    ]


    def get(self, request):

        documents = Document.objects.all()


        serializer = DocumentSerializer(
            documents,
            many=True
        )


        return Response(
            serializer.data
        )








class MyDocumentsAPIView(APIView):

    permission_classes = [
        IsEmployeeUser
    ]


    def get(self, request):

        employee = get_object_or_404(
            EmployeeProfile,
            user=request.user
        )


        documents = EmployeeDocument.objects.filter(
            employee=employee
        )


        serializer = HRDocumentSerializer(
            documents,
            many=True
        )


        return Response(
            serializer.data
        )









class UploadDocumentAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsEmployeeUser
    ]


    parser_classes = [
        MultiPartParser
    ]



    def post(self, request, id):


        employee = EmployeeProfile.objects.get(
            user=request.user
        )



        employee_document = get_object_or_404(

            EmployeeDocument,

            id=id,

            employee=employee

        )



        serializer = EmployeeDocumentSerializer(

            employee_document,

            data=request.data,

            partial=True

        )



        serializer.is_valid(
            raise_exception=True
        )



        serializer.save(

            status="SUBMITTED",

            submitted_at=timezone.now()

        )



        return Response(

            {
                "message":
                "Document submitted successfully"
            },

            status=status.HTTP_200_OK

        )









class SignDocumentAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsEmployeeUser
    ]



    def post(self, request, id):


        employee = get_object_or_404(

            EmployeeProfile,

            user=request.user

        )



        employee_document = get_object_or_404(

            EmployeeDocument,

            id=id,

            employee=employee

        )



        signature_data = request.data.get(
            "signature"
        )



        if not signature_data:

            return Response(

                {
                    "error":
                    "Signature is required"
                },

                status=400

            )



        try:


            format, imgstr = signature_data.split(
                ";base64,"
            )


            ext = format.split("/")[-1]


            file_name = (
                f"signature_{id}.{ext}"
            )



            employee_document.signature.save(

                file_name,

                ContentFile(

                    base64.b64decode(imgstr)

                )

            )



        except Exception:


            return Response(

                {
                    "error":
                    "Invalid signature format"
                },

                status=400

            )





        employee_document.status = "SUBMITTED"



        employee_document.signed_at = timezone.now()



        employee_document.submitted_at = timezone.now()



        employee_document.save()



        return Response(

            {
                "message":
                "Document signed successfully"
            },

            status=200

        )









class HRDocumentStatusAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsHRUser
    ]



    def post(self, request, id):


        document = get_object_or_404(

            EmployeeDocument,

            id=id

        )



        action = request.data.get(
            "action"
        )



        if action == "APPROVE":


            document.status = "APPROVED"



        elif action == "REJECT":


            document.status = "REJECTED"



        else:


            return Response(

                {
                    "error":
                    "Invalid action"
                },

                status=400

            )



        document.save()



        return Response(

            {
                "message":
                "Status updated",

                "status":
                document.status
            }

        )









class HRDocumentsAPIView(APIView):

    permission_classes = [
        IsHRUser
    ]



    def get(self, request):


        documents = EmployeeDocument.objects.all()



        serializer = HRDocumentSerializer(

            documents,

            many=True

        )



        return Response(

            serializer.data

        )









class CreateDocumentAPIView(APIView):

    permission_classes = [
        IsHRUser
    ]



    def post(self, request):


        serializer = CreateDocumentSerializer(

            data=request.data

        )



        if serializer.is_valid():


            serializer.save(

                uploaded_by=request.user

            )



            return Response(

                {
                    "message":
                    "Document created successfully"
                },

                status=201

            )



        return Response(

            serializer.errors,

            status=400

        )









class AssignDocumentAPIView(APIView):

    permission_classes = [
        IsHRUser
    ]



    def post(self, request):


        serializer = AssignDocumentSerializer(

            data=request.data

        )



        serializer.is_valid(

            raise_exception=True

        )



        employee = get_object_or_404(

            EmployeeProfile,

            id=serializer.validated_data["employee_id"]

        )



        document = get_object_or_404(

            Document,

            id=serializer.validated_data["document_id"]

        )



        EmployeeDocument.objects.create(

            employee=employee,

            document=document

        )



        return Response(

            {
                "message":
                "Document assigned successfully"
            },

            status=201

        )
class EmployeeDocumentsAPIView(APIView):


    permission_classes = [
        IsAuthenticated,
        IsHRUser
    ]



    def get(self, request, id):


        employee = get_object_or_404(

            EmployeeProfile,

            id=id

        )


        documents = EmployeeDocument.objects.filter(

            employee=employee

        )


        serializer = EmployeeProfileDocumentSerializer(

            documents,

            many=True

        )


        return Response(

            serializer.data

        )
class EmployeeProgressAPIView(APIView):


    permission_classes = [
        IsAuthenticated,
        IsHRUser
    ]



    def get(self, request, id):


        employee = get_object_or_404(

            EmployeeProfile,

            id=id

        )



        documents = EmployeeDocument.objects.filter(

            employee=employee

        )



        total_documents = documents.count()



        completed_documents = documents.filter(

            status="APPROVED"

        ).count()





        if total_documents == 0:

            progress = 0

        else:

            progress = round(

                (completed_documents / total_documents) * 100

            )





        if progress == 100:

            onboarding_status = "COMPLETED"


        elif progress > 0:

            onboarding_status = "IN_PROGRESS"


        else:

            onboarding_status = "NOT_STARTED"





        return Response(

            {
                "total_documents": total_documents,

                "completed_documents": completed_documents,

                "progress": progress,

                "status": onboarding_status
            }

        )