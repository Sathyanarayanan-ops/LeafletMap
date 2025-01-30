import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import navigate for redirection

const DriverLogin = ({ onLogin }) => {  // Receive onLogin prop
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/driver-login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const data = await response.json(); // Parse response JSON
                console.log("Login successful:", data); // Debug response
                onLogin(data.access); // Store token
                navigate("/driver-menu"); // Redirect
            } else {
                const data = await response.json();
                console.error("Login failed response:", data); // Debug failure
                setError(data.error || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error in handleLogin:", error); // Debug unexpected errors
            setError("Something went wrong. Please try again.");
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Reset error before login
        handleLogin();
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
                    Login
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
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
                        label="Password"
                        name="password"
                        value={formData.password}
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
                        Login
                    </Button>
                </form>
                <Typography
                    variant="body2"
                    sx={{ marginTop: "1rem", textAlign: "center" }}
                >
                    Don't have an account? <a href="/driver-signup">Signup</a>
                </Typography>
            </Box>
        </Box>
    );
};

export default DriverLogin;
