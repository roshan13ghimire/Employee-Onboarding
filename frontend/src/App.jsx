import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./templates/pages/Login";
import Dashboard from "./templates/pages/Dashboard";
import ProtectedRoute from "./templates/components/ProtectedRoute";
import HRDashboard from "./templates/pages/HRDashboard";


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

            </Routes>

        </BrowserRouter>

    );

}


export default App;