from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.models import EmployeeProfile
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from .models import Document, EmployeeDocument
from .serializers import (
    DocumentSerializer,
    EmployeeDocumentSerializer,
    HRDocumentStatusSerializer
)
from accounts.permissions import IsHRUser
from accounts.permissions import IsEmployeeUser
from django.shortcuts import get_object_or_404

from .models import Document
from .serializers import DocumentSerializer


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

        return Response(serializer.data)



class MyDocumentsAPIView(APIView):

    permission_classes = [IsEmployeeUser]

    def get(self, request):

        employee = get_object_or_404(
            EmployeeProfile,
            user=request.user
        )

        documents = EmployeeDocument.objects.filter(
            employee=employee
        )

        serializer = EmployeeDocumentSerializer(
            documents,
            many=True
        )

        return Response(serializer.data)
class UploadDocumentAPIView(APIView):

    permission_classes = [
    IsAuthenticated,
    IsEmployeeUser
]
    parser_classes = [MultiPartParser]

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
            status='SUBMITTED'
        )

        return Response(
            {
                "message": "Document submitted successfully"
            },
            status=status.HTTP_200_OK
        )
    
class HRDocumentStatusAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):


        documents = EmployeeDocument.objects.all()

        serializer = HRDocumentStatusSerializer(
            documents,
            many=True
        )

        return Response(serializer.data)