from rest_framework import generics  # type: ignore
from .models import Document, EmployeeDocument
from .serializers import (
    DocumentSerializer,
    EmployeeDocumentSerializer
)


class DocumentListAPIView(generics.ListAPIView):

    queryset = Document.objects.all()
    serializer_class = DocumentSerializer



class EmployeeDocumentListAPIView(generics.ListAPIView):

    queryset = EmployeeDocument.objects.all()
    serializer_class = EmployeeDocumentSerializer