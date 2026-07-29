import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./templates/pages/Login";
import Dashboard from "./templates/pages/Dashboard";
import ProtectedRoute from "./templates/components/ProtectedRoute";
import HRDashboard from "./templates/pages/HRDashboard";
import Signup from "./templates/pages/Signup";
import AssignDocument from "./templates/pages/AssignDocument";
import HRDocuments from "./templates/pages/HRDocuments";
import Home from "./templates/pages/Home";
import HRUploadDocument from "./templates/pages/HRUploadDocument";
import Layout from "./templates/components/Layout";
import Navbar from "./templates/components/Navbar";
import Profile from "./templates/pages/Profile";
import MyDocuments from "./templates/pages/MyDocuments";
import HRDocumentLibrary from "./templates/pages/HRDocumentLibrary";
import SignDocument from "./templates/pages/SignDocument";
import EmployeeManagement from "./templates/pages/EmployeeManagement";
import EmployeeProfile from "./templates/pages/EmployeeProfile";
import EditEmployee from "./templates/pages/EditEmployee";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

<Route
    path="/dashboard"
    element={
        <Layout>
            <Dashboard />
        </Layout>

    }
/>
<Route
    path="/hr-dashboard"
    element={<Layout>
            <HRDashboard />
        </Layout>}
/>
<Route

    path="/my-documents"

    element={
        <Layout>
            <MyDocuments />
        </Layout>
    }

/>
<Route
    path="/sign-document/:id"
    element={
        <Layout>
            <SignDocument />
        </Layout>
    }
/>
        

<Route
    path="/signup"
    element={<Signup />}
/>
<Route
    path="/assign-document"
    element={        <Layout>
            <AssignDocument />
        </Layout>}
/>
<Route
    path="/hr-documents"
    element={        <Layout>
            <HRDocuments />
        </Layout>}
/>
<Route

    path="/document-library"

    element={
        <Layout>
            <HRDocumentLibrary />
        </Layout>
    }

/>
<Route
    path="/"
    element={<Home />}
/>
<Route
    path="/upload-document"
    element={        <Layout>
            <HRUploadDocument />
        </Layout>}
/>
<Route
    path="/profile"
    element={
        <Layout>
            <Profile />
        </Layout>
    }
/>
<Route
    path="/employees"
    element={
        <Layout>
            <EmployeeManagement />
        </Layout>
    }
/>
<Route
    path="/employees/:id"
    element={
        <Layout>
            <EmployeeProfile />
        </Layout>
    }
/>
<Route

    path="/employees/:id/edit"

    element={<EditEmployee />}

/>

            </Routes>

        </BrowserRouter>

    );

}


export default App;