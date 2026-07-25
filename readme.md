# Employee Onboarding Portal

A full-stack employee onboarding system designed to simplify the process of managing employee documents, submissions, and approvals.

The application provides a centralized platform where HR teams can upload onboarding documents, assign them to employees, and track completion progress. Employees can securely access their documents, upload completed forms, and digitally sign required documents.

## Live Demo

Frontend:
https://employee-onboarding-gamma.vercel.app/

Backend API:
https://employee-onboarding-backend-traj.onrender.com/

Django Admin:
https://employee-onboarding-backend-traj.onrender.com/admin/

## Features

### HR/Admin
- Secure authentication with role-based access
- Upload and manage onboarding documents
- Assign documents to employees
- Track document completion status
- Review and approve/reject submitted documents

### Employee
- Secure login
- View assigned onboarding documents
- Upload completed documents
- Digitally sign documents using a signature canvas
- Track onboarding progress

## Document Actions

Each document can have different completion requirements:

- UPLOAD: Employee uploads the completed document
- SIGNATURE: Employee signs the document digitally
- VIEW_ONLY: Employee only views the document

## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication
- Supabase PostgreSQL Database

### Frontend
- React
- React Router
- Axios
- Tailwind CSS

## Deployment

The application is deployed using:

- Frontend: Vercel
- Backend: Render
- Database: Supabase PostgreSQL

## Screenshots

Stay tuned for screenshots.
