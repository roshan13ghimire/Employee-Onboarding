from .views import SignupAPIView
from django.urls import path
from .views import EmployeeListAPIView, ProfileAPIView, EmployeeDetailAPIView
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

]
