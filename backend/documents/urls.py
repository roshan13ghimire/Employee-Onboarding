from django.urls import path
from .views import (
    DocumentListAPIView,
    MyDocumentsAPIView,UploadDocumentAPIView,HRDocumentStatusAPIView
)


urlpatterns = [
    path(
        'documents/',
        DocumentListAPIView.as_view()
    ),
    path(
        'my-documents/',
        MyDocumentsAPIView.as_view()
    ),
    path(
    'my-documents/<int:id>/upload/',
    UploadDocumentAPIView.as_view()
),
path(
    'hr/documents-status/',
    HRDocumentStatusAPIView.as_view()
),
]