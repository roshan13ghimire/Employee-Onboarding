# OnboardPro - Employee Onboarding Portal

A full-stack employee onboarding management system designed to digitize and automate the new employee onboarding process.

The platform replaces paper-based onboarding workflows by allowing HR administrators, department administrators, and new employees to manage documents, track onboarding progress, and prepare for future integrations with enterprise systems.

---

## Project Overview

Organizations often manage onboarding using emails, paper forms, and disconnected systems. This project provides a centralized web portal where:

- HR can manage onboarding documents and employee progress.
- Employees can access job-specific onboarding materials.
- Department administrators can access required employee information.
- Documents can be uploaded, tracked, and managed digitally.

The system is designed with scalability and enterprise workflows in mind.

---

# Current Features

## User Management

- Custom Django User Model
- Role-based user system

Supported roles:

- HR Admin
- Department Admin
- Employee

Each user has different access levels depending on their role.

---

## Employee Profile Management

Employees have a separate profile linked to their user account.

Employee information includes:

- Department
- Job type
- Employment status
- Start date

Supported job categories:

- Teacher
- Technician
- Administrator
- Manager
- Custodian

---

## Document Management

HR administrators can manage onboarding documents.

Features:

- Upload documents
- Categorize documents
- Assign documents by job type
- Track document versions
- Store employee-submitted documents

Document categories:

- Offer Letter
- Policy
- Benefits
- Agreements
- Training

---

## Employee Document Tracking

The system tracks document completion status.

Statuses:

- Pending
- Submitted
- Approved
- Rejected

Example workflow:
