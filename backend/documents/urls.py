from django.urls import path
from .views import (
    DocumentListAPIView,
    EmployeeDocumentListAPIView
)


urlpatterns = [

    path(
        '',
        DocumentListAPIView.as_view()
    ),

    path(
        'employee/',
        EmployeeDocumentListAPIView.as_view()
    ),

]