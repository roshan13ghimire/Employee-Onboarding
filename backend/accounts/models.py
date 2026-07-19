from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ('HR', 'HR Admin'),
        ('DEPARTMENT', 'Department Admin'),
        ('EMPLOYEE', 'Employee'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='EMPLOYEE'
    )

    email = models.EmailField(
        unique=True
    )

    def __str__(self):
        return self.email