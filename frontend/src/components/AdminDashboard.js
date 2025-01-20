import React from "react";
import "./Dashboard.css";

const AdminDashboard = () => {
    return (
        <div className="dashboard-container admin">
            <header>
                <div className="logo">SUIIT</div>
                <div className="admin-details">
                    <p>Admin Name: John Doe</p>
                </div>
            </header>
            <main>
                <h3>Manage Students</h3>
                {/* Add functionality to manage students */}
            </main>
        </div>
    );
};

export default AdminDashboard;
