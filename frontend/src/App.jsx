import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./templates/pages/Login";
import Dashboard from "./templates/pages/Dashboard";
import ProtectedRoute from "./templates/components/ProtectedRoute";


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

            </Routes>

        </BrowserRouter>

    );

}


export default App;