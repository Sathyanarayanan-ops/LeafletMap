import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import Ride from "./components/Ride/Ride";
import Map from "./components/Map/Map";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import DriverLogin from "./components/Auth/DriverLogin";
import DriverSignup from "./components/Auth/DriverSignup";
import DriverMenu from "./components/DriverMenu";


const App = () => {
    const [refreshMap, setRefreshMap] = useState(false);
    const [trip, setTrip] = useState([]); // Initialize trip as an empty array
    const [isLoggedIn, setIsLoggedIn] = useState(null); // Track auth state; `null` means unknown

    // Check for session validity on app load or refresh
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoggedIn(false);
                return;
            }

            //Changing to 8080
            try {
                const response = await fetch("http://localhost:8080/api/token/verify/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogin = (token) => {
        // Save token to localStorage or use cookies
        console.log("Token received",token)
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Remove token and reset auth state
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    const handleRefreshMap = (newTrip) => {
        setTrip(newTrip); // Update the trip array
        setRefreshMap((prev) => !prev); // Toggle state to trigger a refresh
    };

    // While checking session validity, show a loading indicator
    if (isLoggedIn === null) {
        return <p>Loading...</p>;
    }

    return (
        <Router>
            <Routes>
                {/* Default Route: Login Page */}
                <Route
                    path="/"
                    element={
                        isLoggedIn ? <Navigate to="/map" /> : <Login onLogin={handleLogin} />
                    }
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/driver-login" element={<DriverLogin onLogin={handleLogin}/>}/>
                <Route path="/driver-signup" element={<DriverSignup/>}/>
                <Route path="/driver-menu"  element={isLoggedIn ? <DriverMenu /> : <Navigate to="/driver-login" />} />
                {/* Map Page */}
                <Route
                    path="/map"
                    element={
                        isLoggedIn ? (
                            <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                                <Header onLogout={handleLogout} />
                                <Box sx={{ flex: 1 }}>
                                    <Map refreshMap={refreshMap} trip={trip} />
                                </Box>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "20%",
                                        left: "5%",
                                        zIndex: 10,
                                        width: "400px",
                                        backgroundColor: "white",
                                        borderRadius: "12px",
                                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                                        padding: "16px",
                                    }}
                                >
                                    <Ride onSearch={handleRefreshMap} />
                                </Box>
                            </Box>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
