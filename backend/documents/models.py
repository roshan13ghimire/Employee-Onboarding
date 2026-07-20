from django.db import models
from accounts.models import User
from accounts.models import EmployeeProfile


class Document(models.Model):

    title = models.CharField(max_length=200)

    category = models.CharField(
        max_length=100
    )

    job_type = models.CharField(
        max_length=100
    )

    version = models.CharField(
        max_length=20,
        default="1.0"
    )

    file = models.FileField(
        upload_to="documents/"
    )

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return self.title




class EmployeeDocument(models.Model):

    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('SUBMITTED', 'Submitted'),
        ('APPROVED', 'Approved'),
    )

    employee = models.ForeignKey(
        EmployeeProfile,
        on_delete=models.CASCADE
    )

    document = models.ForeignKey(
        Document,
        on_delete=models.CASCADE
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    uploaded_file = models.FileField(
        upload_to="completed_documents/",
        blank=True,
        null=True
    )

    submitted_at = models.DateTimeField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return f"{self.employee} - {self.document}"