import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const DriverSignup = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        license_num: "",
        car_model:"",
        password: "",
        confirm_password: "", // Added confirm_password to state
    });

    const navigate = useNavigate();
    
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Check if passwords match
        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/driver-signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    license_num: formData.license_num,
                    car_model: formData.car_model,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                // alert("Signup successful! Please login.");
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    license_num: "",
                    car_model:"",
                    password: "",
                    confirm_password: "",
                });
                navigate('/driver-login');
            } else {
                const data = await response.json();
                setError(data.error || "Signup failed. Please try again.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            sx={{ backgroundColor: "#f5f5f5" }}
        >
            <Box
                sx={{
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Signup
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Last name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="email"
                        required
                    />
                    <TextField
                        label="License Number"
                        name="license_num"
                        value={formData.license_num}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="normal"
                        required
                    />
                    <TextField
                        label="Car Model"
                        name="car_model"
                        value={formData.car_model}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="password"
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type="password"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: "1rem" }}
                    >
                        Signup
                    </Button>
                            </form>
                            <Typography
                                variant="body2"
                                sx={{ marginTop: "1rem", textAlign: "center" }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ marginTop: "1rem", textAlign: "center" }}
                                >
                                    Already have an account?{" "}
                                    <Button
                                        variant="text"
                                        color="primary"
                                        onClick={() => navigate("/driver-login")} // Navigate to login page
                                        sx={{ textTransform: "none" }}
                                    >
                                        Login
                                    </Button>
                                </Typography>

                </Typography>
            </Box>
        </Box>
    );
};

export default DriverSignup;
