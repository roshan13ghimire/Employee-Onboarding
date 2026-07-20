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

from .models import Document
from .serializers import DocumentSerializer


class DocumentListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        documents = Document.objects.all()

        serializer = DocumentSerializer(
            documents,
            many=True
        )

        return Response(serializer.data)



class MyDocumentsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        employee = EmployeeProfile.objects.get(
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

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, id):

        employee = EmployeeProfile.objects.get(
            user=request.user
        )

        employee_document = EmployeeDocument.objects.get(
            id=id,
            employee=employee
        )

        employee_document.uploaded_file = request.FILES.get(
            'uploaded_file'
        )

        employee_document.status = 'SUBMITTED'

        employee_document.save()

        return Response(
            {
                "message": "Document submitted successfully"
            },
            status=status.HTTP_200_OK
        )
    
class HRDocumentStatusAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "HR":
            return Response(
                {
                    "detail": "HR access required"
                },
                status=403
            )

        documents = EmployeeDocument.objects.all()

        serializer = HRDocumentStatusSerializer(
            documents,
            many=True
        )

        return Response(serializer.data)