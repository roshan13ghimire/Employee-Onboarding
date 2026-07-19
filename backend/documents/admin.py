from django.contrib import admin
from .models import Document, EmployeeDocument


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):

    list_display = (
        'title',
        'category',
        'job_type',
        'version',
        'uploaded_by',
        'created_at'
    )

    list_filter = (
        'category',
        'job_type',
    )

    search_fields = (
        'title',
        'job_type',
    )


@admin.register(EmployeeDocument)
class EmployeeDocumentAdmin(admin.ModelAdmin):

    list_display = (
        'employee',
        'document',
        'status',
        'submitted_at'
    )

    list_filter = (
        'status',
    )

    search_fields = (
        'employee__user__email',
        'document__title',
    )