import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./templates/pages/Login";
import Dashboard from "./templates/pages/Dashboard";
import ProtectedRoute from "./templates/components/ProtectedRoute";
import HRDashboard from "./templates/pages/HRDashboard";
import Signup from "./templates/pages/Signup";
import AssignDocument from "./templates/pages/AssignDocument";
import HRDocuments from "./templates/pages/HRDocuments";


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
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/hr-dashboard"
    element={<HRDashboard />}
/>
<Route
    path="/signup"
    element={<Signup />}
/>
<Route
    path="/assign-document"
    element={<AssignDocument />}
/>
<Route
    path="/hr-documents"
    element={<HRDocuments />}
/>

            </Routes>

        </BrowserRouter>

    );

}


export default App;