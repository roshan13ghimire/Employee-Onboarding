from rest_framework import serializers
from .models import Document
from .models import EmployeeDocument


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = [
            'id',
            'title',
            'category',
            'job_type',
            'version',
            'file',
        ]



class EmployeeDocumentSerializer(serializers.ModelSerializer):

    document_title = serializers.CharField(
        source='document.title',
        read_only=True
    )

    class Meta:
        model = EmployeeDocument

        fields = [
            'id',
            'document_title',
            'status',
            'uploaded_file',
            'submitted_at',
        ]

class HRDocumentStatusSerializer(serializers.ModelSerializer):

    employee_name = serializers.CharField(
        source='employee.user.username',
        read_only=True
    )

    document_name = serializers.CharField(
        source='document.title',
        read_only=True
    )

    class Meta:
        model = EmployeeDocument

        fields = [
            'id',
            'employee_name',
            'document_name',
            'status',
            'submitted_at',
        ]