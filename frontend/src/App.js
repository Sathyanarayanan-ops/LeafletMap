import React from "react";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import Ride from "./components/Ride/Ride";
import Map from "./components/Map/Map";

const App = () => {
    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Header />

            {/* Main Content */}
            <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
                {/* Full-Screen Map */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "calc(100vh - 64px)", // Full height minus header height
                        zIndex: 1,
                    }}
                >
                    <Map />
                </Box>

                {/* Floating Ride Card */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "20%",
                        left: "5%",
                        zIndex: 10, // Ensure it's above the map
                        width: "400px",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                        padding: "16px",
                    }}
                >
                    <Ride />
                </Box>
            </Box>
        </Box>
    );
};

export default App;
