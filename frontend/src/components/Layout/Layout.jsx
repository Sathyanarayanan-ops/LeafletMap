import React from "react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material";
import Header from "../Header/Header";
import Ride from "../Ride/Ride";
import Map from "../Map/Map";
import Trips from "../Trips/Trips";

const Layout = () => {
    return (
        <Box sx = {{height:'100vh',display:'flex', flexDirection: 'column'}}>
            {/* Header goes at the top */}
            <Header/>

            {/* Main content Area */}
            <Box sx={{flex : 1, display : 'flex'}}>
                {/* Sidebar with Ride and trips */}
                <Box sx = {{width:'30%', padding:'10px',borderRight:'1px solid lightgray'}}>
                    <Ride/>
                    <Trips/>
                </Box>
                {/* Map taking remaining space */}
                <Box sx={{flex:1, padding:'10px'}}>
                    <Map/>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;