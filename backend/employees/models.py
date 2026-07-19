from django.db import models
from accounts.models import User


class EmployeeProfile(models.Model):

    JOB_TYPES = (
        ('TEACHER', 'Teacher'),
        ('TECHNICIAN', 'Technician'),
        ('ADMIN', 'Administrator'),
        ('MANAGER', 'Manager'),
        ('CUSTODIAN', 'Custodian'),
    )

    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='employee_profile'
    )

    department = models.CharField(
        max_length=100
    )

    job_type = models.CharField(
        max_length=50,
        choices=JOB_TYPES
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    start_date = models.DateField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"