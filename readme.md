# Employee Onboarding Portal

A full-stack employee onboarding system designed to simplify the process of managing new employee documents, submissions, approvals, and digital signatures.

This project simulates a real-world onboarding workflow used by organizations such as companies, schools, and institutions where HR teams need a centralized platform to manage employee documentation.

---

## Project Overview

The onboarding process often involves multiple documents, approvals, signatures, and manual tracking. Many organizations still rely on emails, spreadsheets, and paper-based processes, which can make onboarding slow and difficult to manage.

The Employee Onboarding Portal provides a centralized digital solution where:

- HR teams can upload and manage onboarding documents
- Employees can access assigned documents
- Employees can complete required onboarding tasks
- HR can review and approve submitted documents
- Digital signatures can be collected electronically

This project was built as a portfolio application to demonstrate full-stack development skills using Django, React, and PostgreSQL.

---

# Features

## HR / Admin Features

- Secure login with role-based access
- Upload onboarding documents
- Create and manage document templates
- Define document action requirements
- Assign documents to employees
- Track employee onboarding progress
- Review submitted documents
- Approve or reject completed documents

---

## Employee Features

- Secure employee login
- View assigned onboarding documents
- Access original documents
- Complete documents based on required action type

Supported document actions:

### Upload

Employees can upload completed documents.

Examples:

- Signed offer letters
- Tax forms
- Company policy documents

---

### Digital Signature

Employees can digitally sign documents using a signature canvas.

The system stores:

- Signature image
- Submission date
- Completion status

---

### View Only

Employees can view documents that do not require any action.

---

# Document Workflow

```
HR uploads document
        |
        |
        v
Assign document to employee
        |
        |
        v
Employee receives document
        |
        |
        v
Employee completes required action
        |
        |
        v
Document submitted to HR
        |
        |
        v
HR approves or rejects submission
```

---

# Application Architecture

```
React Frontend
        |
        |
        v
Django REST Framework API
        |
        |
        v
PostgreSQL Database
```

The frontend communicates with the backend through REST APIs secured using JWT authentication.

---

# Technology Stack

## Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication
- django-decouple
- drf-spectacular (Swagger API Documentation)

## Frontend

- React
- React Router
- Axios
- Tailwind CSS

---

# Project Structure

```
Employee-Onboarding-Portal

├── backend
│
│   ├── accounts
│   │   ├── Custom User Model
│   │   └── Employee Profile
│   │
│   ├── documents
│       ├── Document Model
│       ├── EmployeeDocument Model
│       ├── Serializers
│       ├── APIs
│       └── Permissions
│
└── frontend
    │
    ├── pages
    │   ├── Login
    │   ├── Dashboard
    │   ├── My Documents
    │   ├── HR Dashboard
    │   └── Sign Document
```

---

# Authentication and Authorization

The application uses JWT authentication for secure communication between the frontend and backend.

The system supports multiple user roles:

| Role | Access |
|------|--------|
| HR | Manage documents, assign documents, review submissions |
| Employee | View assigned documents and complete onboarding tasks |
| Admin | Manage department-level information |

---

# Document Action Types

Each document can have a different completion requirement.

## Upload

The employee uploads a completed document.

Workflow:

```
PENDING
   |
   v
SUBMITTED
   |
   v
APPROVED / REJECTED
```

---

## Signature

The employee signs the document electronically.

The signature data is stored and linked to the employee document record.

---

## View Only

The employee only needs to view the document.

---

# Running the Project Locally

## Backend Setup

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create environment variables:

```
SECRET_KEY=
DEBUG=True

DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
```

Run database migrations:

```bash
python manage.py migrate
```

Start Django server:

```bash
python manage.py runserver
```

Backend:

```
http://127.0.0.1:8000/
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run React application:

```bash
npm run dev
```

Frontend:

```
http://localhost:5173/
```

---

# Screenshots

Add screenshots demonstrating:

- Login page
- Employee dashboard
- HR dashboard
- Document upload workflow
- Digital signature page
- Approval workflow

---

# Learning Outcomes

Building this project helped me understand how modern full-stack applications are designed and developed.

Key concepts learned:

- Designing REST APIs
- Connecting React applications with Django REST Framework
- JWT authentication
- Role-based permissions
- Database relationships
- File upload handling
- Digital signature implementation
- Frontend and backend integration
- Debugging full-stack applications

---

# Future Improvements

Possible future enhancements:

- Email notifications for pending documents
- Multi-factor authentication
- Employee onboarding progress tracking
- Document version history
- Department-based access control
- Audit logs
- Cloud deployment
- Improved document security

---

# Author

Roshan Ghimire

Full-stack developer building applications with Django, React, and PostgreSQL.

---

# License

This project is created for learning and portfolio purposes.