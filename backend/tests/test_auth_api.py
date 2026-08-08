import base64

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient

from accounts.models import User, EmployeeProfile
from documents.models import Document, EmployeeDocument

@pytest.mark.django_db
def test_login_success():
    user = User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    client = APIClient()

    response = client.post(
        "/api/token/",
        {
            "username": "testemployee",
            "password": "testpassword",
        },
        format="json"
    )

    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data

@pytest.mark.django_db
def test_login_wrong_password():
    User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    client = APIClient()

    response = client.post(
        "/api/token/",
        {
            "username": "testemployee",
            "password": "wrongpassword",
        },
        format="json"
    )

    assert response.status_code == 401

@pytest.mark.django_db
def test_profile_requires_authentication():
    client = APIClient()

    response = client.get("/api/profile/")

    assert response.status_code == 401

@pytest.mark.django_db
def test_profile_with_valid_token():
    User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    client = APIClient()

    login_response = client.post(
        "/api/token/",
        {
            "username": "testemployee",
            "password": "testpassword",
        },
        format="json"
    )

    access_token = login_response.data["access"]

    client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )

    response = client.get("/api/profile/")

    assert response.status_code == 200

@pytest.mark.django_db
def test_employee_cannot_access_hr_documents():
    User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    client = APIClient()

    login_response = client.post(
        "/api/token/",
        {
            "username": "testemployee",
            "password": "testpassword",
        },
        format="json"
    )

    access_token = login_response.data["access"]

    client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )

    response = client.get("/api/hr-documents/")

    assert response.status_code == 403

@pytest.mark.django_db
def test_hr_can_access_hr_documents():
    User.objects.create_user(
        username="testhr",
        password="testpassword",
        role="HR"
    )

    client = APIClient()

    login_response = client.post(
        "/api/token/",
        {
            "username": "testhr",
            "password": "testpassword",
        },
        format="json"
    )

    access_token = login_response.data["access"]

    client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )

    response = client.get("/api/hr-documents/")

    assert response.status_code == 200

@pytest.mark.django_db
def test_employee_can_view_own_documents():
    user = User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    employee = EmployeeProfile.objects.create(
        user=user,
        employee_id="EMP001",
        department="IT",
        job_title="IT Support"
    )

    test_file = SimpleUploadedFile(
        "employee_handbook.pdf",
        b"Test document content",
        content_type="application/pdf"
    )

    document = Document.objects.create(
        title="Employee Handbook",
        category="HR",
        job_type="All Employees",
        file=test_file,
        action_type="VIEW_ONLY",
        uploaded_by=user
    )

    EmployeeDocument.objects.create(
        employee=employee,
        document=document,
        status="PENDING"
    )

    client = APIClient()

    login_response = client.post(
        "/api/token/",
        {
            "username": "testemployee",
            "password": "testpassword",
        },
        format="json"
    )

    access_token = login_response.data["access"]

    client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )

    response = client.get("/api/my-documents/")

    assert response.status_code == 200
    assert len(response.data) == 1

@pytest.mark.django_db
def test_employee_can_sign_document():
    user = User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    employee = EmployeeProfile.objects.create(
        user=user,
        employee_id="EMP001",
        department="IT",
        job_title="IT Support"
    )

    test_file = SimpleUploadedFile(
        "employee_handbook.pdf",
        b"Test document content",
        content_type="application/pdf"
    )

    document = Document.objects.create(
        title="Employee Handbook",
        category="HR",
        job_type="All Employees",
        file=test_file,
        action_type="SIGNATURE",
        uploaded_by=user
    )

    employee_document = EmployeeDocument.objects.create(
        employee=employee,
        document=document,
        status="PENDING"
    )

    client = APIClient()

    login_response = client.post(
        "/api/token/",
        {
            "username": "testemployee",
            "password": "testpassword",
        },
        format="json"
    )

    access_token = login_response.data["access"]

    client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )

    signature_data = (
        "data:image/png;base64,"
        + base64.b64encode(b"fake-signature-image").decode()
    )

    response = client.post(
        f"/api/my-documents/{employee_document.id}/sign/",
        {
            "signature": signature_data
        },
        format="json"
    )

    assert response.status_code == 200
    assert response.data["message"] == "Document signed successfully"

    employee_document.refresh_from_db()

    assert employee_document.status == "SUBMITTED"
    assert employee_document.signature
    assert employee_document.signed_at is not None
    assert employee_document.submitted_at is not None
@pytest.mark.django_db
def test_hr_can_approve_document():
    hr_user = User.objects.create_user(
        username="testhr",
        password="testpassword",
        role="HR"
    )

    employee_user = User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    employee = EmployeeProfile.objects.create(
        user=employee_user,
        employee_id="EMP001",
        department="IT",
        job_title="IT Support"
    )

    test_file = SimpleUploadedFile(
        "employee_handbook.pdf",
        b"Test document content",
        content_type="application/pdf"
    )

    document = Document.objects.create(
        title="Employee Handbook",
        category="HR",
        job_type="All Employees",
        file=test_file,
        action_type="SIGNATURE",
        uploaded_by=hr_user
    )

    employee_document = EmployeeDocument.objects.create(
        employee=employee,
        document=document,
        status="SUBMITTED"
    )

    client = APIClient()

    login_response = client.post(
        "/api/token/",
        {
            "username": "testhr",
            "password": "testpassword",
        },
        format="json"
    )

    access_token = login_response.data["access"]

    client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )

    response = client.post(
        f"/api/hr-documents/{employee_document.id}/status/",
        {
            "action": "APPROVE"
        },
        format="json"
    )

    assert response.status_code == 200
    assert response.data["status"] == "APPROVED"

    employee_document.refresh_from_db()

    assert employee_document.status == "APPROVED"
    assert employee_document.rejection_reason is None

@pytest.mark.django_db
def test_hr_cannot_reject_document_without_reason():
    hr_user = User.objects.create_user(
        username="testhr",
        password="testpassword",
        role="HR"
    )

    employee_user = User.objects.create_user(
        username="testemployee",
        password="testpassword",
        role="EMPLOYEE"
    )

    employee = EmployeeProfile.objects.create(
        user=employee_user,
        employee_id="EMP001",
        department="IT",
        job_title="IT Support"
    )

    test_file = SimpleUploadedFile(
        "employee_handbook.pdf",
        b"Test document content",
        content_type="application/pdf"
    )

    document = Document.objects.create(
        title="Employee Handbook",
        category="HR",
        job_type="All Employees",
        file=test_file,
        action_type="SIGNATURE",
        uploaded_by=hr_user
    )

    employee_document = EmployeeDocument.objects.create(
        employee=employee,
        document=document,
        status="SUBMITTED"
    )

    client = APIClient()

    login_response = client.post(
        "/api/token/",
        {
            "username": "testhr",
            "password": "testpassword",
        },
        format="json"
    )

    access_token = login_response.data["access"]

    client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )

    response = client.post(
        f"/api/hr-documents/{employee_document.id}/status/",
        {
            "action": "REJECT"
        },
        format="json"
    )

    assert response.status_code == 400
    assert response.data["error"] == "Rejection reason is required"

    employee_document.refresh_from_db()

    assert employee_document.status == "SUBMITTED"