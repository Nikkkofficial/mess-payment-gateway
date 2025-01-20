import React from "react";
import "./Dashboard.css";

const StudentDashboard = () => {
    return (
        <div className="dashboard-container student">
            <header>
                <div className="logo">SUIIT</div>
                <div className="user-details">
                    <p>Roll: 123456</p>
                    <p>Hostel: A</p>
                </div>
            </header>
            <main>
                <div className="payment-box">
                    <h3>Mess Fee Details</h3>
                    <p>Month: January</p>
                    <p>Year: 2025</p>
                    <p>Amount Due: $500</p>
                    <button>Pay</button>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
