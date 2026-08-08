import pytest
from django.db import IntegrityError
from accounts.models import User, EmployeeProfile


@pytest.mark.django_db
def test_employee_profile_creation():
    user = User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    profile = EmployeeProfile.objects.create(
        user=user,
        employee_id="EMP001",
        department="IT",
        job_title="IT Support",
    )

    assert profile.user == user
    assert profile.employee_id == "EMP001"
    assert profile.department == "IT"
    assert profile.job_title == "IT Support"
    assert profile.is_active is True


@pytest.mark.django_db
def test_employee_id_must_be_unique():
    user1 = User.objects.create_user(
        username="employee1",
        password="testpassword",
        role="EMPLOYEE"
    )

    EmployeeProfile.objects.create(
        user=user1,
        employee_id="EMP001",
        department="IT",
        job_title="IT Support",
    )

    user2 = User.objects.create_user(
        username="employee2",
        password="testpassword",
        role="EMPLOYEE"
    )

    with pytest.raises(IntegrityError):
        EmployeeProfile.objects.create(
            user=user2,
            employee_id="EMP001",
            department="HR",
            job_title="HR Assistant",
        )