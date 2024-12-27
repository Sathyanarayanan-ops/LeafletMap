// import React, { useState } from "react";
// import { Box } from "@mui/material";
// import Header from "./components/Header/Header";
// import Ride from "./components/Ride/Ride";
// import Map from "./components/Map/Map";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";


// const App = () => {
//     const [refreshMap, setRefreshMap] = useState(false);
//     const [trip, setTrip] = useState([]); // Initialize trip as an empty array
    
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };

//     // Function to handle refreshing the map and setting the trip
//     const handleRefreshMap = (newTrip) => {
//         setTrip(newTrip); // Update the trip array
//         setRefreshMap((prev) => !prev); // Toggle state to trigger a refresh
//     };

// //     return (
// //         <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
// //             {/* Header */}
// //             <Header />

// //             {/* Main Content Area */}
// //             <Box sx={{ flex: 1 }}>
// //                 <Map refreshMap={refreshMap} trip={trip} />  {/* Pass trip and refreshMap to Map */}
// //             </Box>

// //             {/* Floating Ride Form */}
// //             <Box
// //                 sx={{
// //                     position: "absolute",
// //                     top: "20%",
// //                     left: "5%",
// //                     zIndex: 10, // Ensure it floats above the map
// //                     width: "400px",
// //                     backgroundColor: "white",
// //                     borderRadius: "12px",
// //                     boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
// //                     padding: "16px",
// //                 }}
// //             >
// //                 <Ride onSearch={handleRefreshMap} /> {/* Pass handler to Ride */}
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default App;


//         return (
//             <Router>
//                 <Routes>
//                     {/* Default Route: Login Page */}
//                     <Route
//                         path="/"
//                         element={
//                             isLoggedIn ? <Navigate to="/map" /> : <Login onLogin={handleLogin} />
//                         }
//                     />
//                     <Route path="/signup" element={<Signup/>} />
//                     {/* Map Page */}
//                     <Route
//                         path="/map"
//                         element={
//                             isLoggedIn ? (
//                                 <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//                                     <Header />
//                                     <Box sx={{ flex: 1 }}>
//                                         <Map refreshMap={refreshMap} trip={trip} />
//                                     </Box>
//                                     <Box
//                                         sx={{
//                                             position: "absolute",
//                                             top: "20%",
//                                             left: "5%",
//                                             zIndex: 10,
//                                             width: "400px",
//                                             backgroundColor: "white",
//                                             borderRadius: "12px",
//                                             boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
//                                             padding: "16px",
//                                         }}
//                                     >
//                                         <Ride onSearch={handleRefreshMap} />
//                                     </Box>
//                                 </Box>
//                             ) : (
//                                 <Navigate to="/" />
//                             )
//                         }
//                     />
//                 </Routes>
//             </Router>
//         );
//         };

//         export default App;


import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import Ride from "./components/Ride/Ride";
import Map from "./components/Map/Map";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

const App = () => {
    const [refreshMap, setRefreshMap] = useState(false);
    const [trip, setTrip] = useState([]); // Initialize trip as an empty array
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth state

    // Check for token or login status on app load
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token"); // Or check for a cookie
            setIsLoggedIn(!!token); // Update isLoggedIn based on token presence
        };
        checkAuth();
    }, []);

    const handleLogin = (token) => {
        // Save token to localStorage or use cookies
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
