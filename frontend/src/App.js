import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import Ride from "./components/Ride/Ride";
import Map from "./components/Map/Map";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

const App = () => {

    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    const [directions, setDirections] = useState(null);

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const geocodeAddress = async (address) => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.results.length > 0){
            return data.results[0].geometry.location;
        }
        return null;
    }

    const handleLocationUpdate = async ({pickup : pickupAddress , dropoff: dropoffAddress }) => {
        const pickupCoordinates = await geocodeAddress(pickupAddress);
        const dropoffCoordinates = await geocodeAddress(dropoffAddress);

        setPickup(pickupCoordinates);
        setDropoff(dropoffCoordinates);

        if (pickupCoordinates && dropoffCoordinates) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: pickupCoordinates,
                    destination: dropoffCoordinates,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result,status) => {
                    if(status==="OK"){
                        setDirections(result);
                    }else{
                        console.error("Error fetching directions",result);
                    }
                }
            );
        }
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
                {/* Google Map */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "calc(100vh - 64px)", // Full height minus header
                        zIndex: 1,
                    }}
                >
                    <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                            center={pickup || { lat: 37.7749, lng: -122.4194 }} // Default to San Francisco
                            zoom={10}
                        >
                            {/* Render Markers */}
                            {pickup && <Marker position={pickup} />}
                            {dropoff && <Marker position={dropoff} />}

                            {/* Render Directions */}
                            {directions && <DirectionsRenderer directions={directions} />}
                        </GoogleMap>
                    </LoadScript>
                </Box>

                {/* Floating Ride Form */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "20%",
                        left: "5%",
                        zIndex: 10, // Ensure it floats above the map
                        width: "400px",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                        padding: "16px",
                    }}
                >
                    <Ride onLocationUpdate={handleLocationUpdate} />
                </Box>
            </Box>
        </Box>
    );
};

export default App;
