import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import PaymentGateway from "./components/PaymentGateway";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/payment-gateway" element={<PaymentGateway />} />
            </Routes>
        </Router>
    );
}

export default App;
