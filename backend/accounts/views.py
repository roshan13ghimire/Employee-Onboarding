from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsHRUser
from .models import EmployeeProfile
from .serializers import EmployeeListSerializer

from .serializers import SignupSerializer

class SignupAPIView(APIView):

    permission_classes = [
        AllowAny
    ]
    def post(self, request):

        serializer = SignupSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Account created successfully"
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
class EmployeeListAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsHRUser
    ]


    def get(self, request):

        employees = EmployeeProfile.objects.all()


        serializer = EmployeeListSerializer(
            employees,
            many=True
        )


        return Response(
            serializer.data
        )
class ProfileAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]


    def get(self, request):

        user = request.user


        profile = None


        if hasattr(user, "employeeprofile"):

            profile = user.employeeprofile



        return Response(
            {
                "username": user.username,
                "email": user.email,
                "role": user.role,

                "employee_id":
                    profile.employee_id if profile else None,

                "department":
                    profile.department if profile else None,

                "job_title":
                    profile.job_title if profile else None,
            }
        )