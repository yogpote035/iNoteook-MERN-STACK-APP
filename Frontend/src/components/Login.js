import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login({ showAlert }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/auth/login";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Login Failed:", data.error);
                return showAlert("Login Failed: " + (data.error || "Unknown error"), "danger");
            }

            // ✅ Extract token
            if (!data) {
                return showAlert("Login Failed: No token received", "danger");
            }
            localStorage.setItem("token", data.authToken);
            console.log("Stored Token:", localStorage.getItem("token"));

            showAlert("Login Successful", "success");
            navigate("/notes");

            setFormData({ email: "", password: "" });
        } catch (error) {
            showAlert("Login Failed"+error.message, "danger");
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{ marginTop: "4rem" }}>
            <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
                <h3 className="text-center mb-3">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3">
                    Don't have an account?
                    <NavLink className="btn btn-link p-0" to="/signup">
                        Sign Up
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default Login;
