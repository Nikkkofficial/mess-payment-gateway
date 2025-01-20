import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const [uniqueId, setUniqueId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uniqueId, password }),
        });
        const data = await response.json();

        if (data.token) {
            if (data.user.role === "student") {
                navigate("/student-dashboard");
            } else if (data.user.role === "admin") {
                navigate("/admin-dashboard");
            }
        } else {
            alert(data.message || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Unique ID"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <p>
                    Admin login? <a href="/admin-dashboard">Click here</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
