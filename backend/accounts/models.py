from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ('HR', 'HR'),
        ('EMPLOYEE', 'Employee'),
        ('ADMIN', 'Department Admin'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='EMPLOYEE'
    )

    def __str__(self):
        return self.username

class EmployeeProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    employee_id = models.CharField(
        max_length=50,
        unique=True
    )

    department = models.CharField(
        max_length=100
    )

    job_title = models.CharField(
        max_length=100
    )

    def __str__(self):
        return self.user.username