from rest_framework import serializers  # type: ignore[import]
from .models import Document, EmployeeDocument


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = "__all__"



class EmployeeDocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployeeDocument
        fields = "__all__"