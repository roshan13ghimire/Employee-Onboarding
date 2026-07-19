from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Document, EmployeeDocument
from .serializers import (
    DocumentSerializer,
    EmployeeDocumentSerializer
)


from .permissions import IsHRAdmin


class DocumentListAPIView(generics.ListAPIView):

    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [
        IsAuthenticated,
        IsHRAdmin
    ]


class EmployeeDocumentListAPIView(generics.ListAPIView):

    queryset = EmployeeDocument.objects.all()
    serializer_class = EmployeeDocumentSerializer
    permission_classes = [IsAuthenticated]