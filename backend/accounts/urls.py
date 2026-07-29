from .views import SignupAPIView
from django.urls import path
from .views import EmployeeListAPIView, ProfileAPIView, EmployeeDetailAPIView, EmployeeUpdateAPIView, EmployeeDeactivateAPIView
urlpatterns = [
path(
    "signup/",
    SignupAPIView.as_view()
),
path(
    "employees/",
    EmployeeListAPIView.as_view()
),
path(
    "profile/",
    ProfileAPIView.as_view()
),
path(
    "employees/<int:id>/",
    EmployeeDetailAPIView.as_view()
),
path(

    "employees/<int:id>/update/",

    EmployeeUpdateAPIView.as_view()

),
path(

    "employees/<int:id>/deactivate/",

    EmployeeDeactivateAPIView.as_view()

),
]
