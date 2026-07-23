from django.urls import path
from .views import (
    AssignDocumentAPIView,
    DocumentListAPIView,
    MyDocumentsAPIView,UploadDocumentAPIView,HRDocumentStatusAPIView, HRDocumentsAPIView,CreateDocumentAPIView,
    AssignDocumentAPIView
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
    "hr-documents/<int:id>/status/",
    HRDocumentStatusAPIView.as_view()
),
path(
    "hr-documents/",
    HRDocumentsAPIView.as_view()
),
path(
    "create-document/",
    CreateDocumentAPIView.as_view()
),
path(
    "assign-document/",
    AssignDocumentAPIView.as_view()
),
]