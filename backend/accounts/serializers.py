from rest_framework import serializers
from .models import User, EmployeeProfile
from .models import EmployeeProfile


class SignupSerializer(serializers.ModelSerializer):

    employee_id = serializers.CharField()
    department = serializers.CharField()
    job_title = serializers.CharField()


    class Meta:

        model = User

        fields = [
            "username",
            "email",
            "password",
            "employee_id",
            "department",
            "job_title",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }


    def create(self, validated_data):

        employee_id = validated_data.pop("employee_id")
        department = validated_data.pop("department")
        job_title = validated_data.pop("job_title")


        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )


        EmployeeProfile.objects.create(
            user=user,
            employee_id=employee_id,
            department=department,
            job_title=job_title,
        )


        return user



class EmployeeListSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )


    class Meta:

        model = EmployeeProfile

        fields = [
            "id",
            "username",
            "employee_id",
            "department",
            "job_title",
        ]