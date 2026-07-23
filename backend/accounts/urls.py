from .views import SignupAPIView
from django.urls import path
from .views import EmployeeListAPIView
urlpatterns = [
path(
    "signup/",
    SignupAPIView.as_view()
),
path(
    "employees/",
    EmployeeListAPIView.as_view()
),
]