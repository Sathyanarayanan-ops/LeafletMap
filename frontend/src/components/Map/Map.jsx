
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useStyles from "./styles";
import apiClient from "../api";

const Map = ({ refreshMap, trip = [] }) => {
    const mapRef = useRef(null); // Reference to the map container
    const classes = useStyles();

    const [loading, setLoading] = useState(false); // Tracks loading state
    const [polyline, setPolyline] = useState([]); // Polyline data from the backend

    // Fetch route from backend whenever `refreshMap` changes
    useEffect(() => {
        const fetchRoute = async () => {
            try {
                setLoading(true); // Start loading spinner
                console.log("Fetching route data...");
                const response = await apiClient.get("/trips/");
                console.log("Polyline data fetched:", response.data);

                if (response.data && Array.isArray(response.data)) {
                    setPolyline(response.data); // Update polyline state
                } else {
                    console.error("Invalid polyline data:", response.data);
                    setPolyline([]); // Reset polyline if data is invalid
                }
            } catch (error) {
                console.error("Error fetching route:", error);
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        // Fetch route only if `trip` is non-empty
        if (trip && trip.length > 0) {
            fetchRoute();
        }
    }, [refreshMap]); // Trigger fetch whenever refreshMap changes

    // Polyline options for rendering
    const limeOptions = { color: "red", weight: 7 };

    // Pan map to the first trip location when trip data changes
    useEffect(() => {
        if (mapRef.current && trip && trip.length > 0) {
            console.log("Trip data received by Map Component",trip)
            const map = mapRef.current;
            const [lat, lng] = trip[0]; // First trip location
            if (lat && lng) {
                map.setView([lat, lng], 13); // Pan to the first trip location
            }
        }
    }, [trip]);

    return (
        <>
            {/* Show a loading spinner when fetching data */}
            {loading && (
                <div className="loading-spinner" style={{ textAlign: "center", margin: "10px" }}>
                    <p>Loading route data...</p>
                </div>
            )}
            <MapContainer
                className={classes.mapContainer}
                center={trip.length > 0 ? trip[0] : [33.99518, -118.46849]} // Center map on pickup location
                zoom={13}
                scrollWheelZoom={true}
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Save map instance to ref
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Render markers for each trip location */}
                {trip &&
                    trip.length > 0 &&
                    trip.map((location, index) => {
                        if (
                            !location ||
                            !Array.isArray(location) ||
                            location.length !== 2 ||
                            typeof location[0] !== "number" ||
                            typeof location[1] !== "number"
                        ) {
                            console.error(`Invalid trip location at index ${index}:`, location);
                            return null; // Skip invalid location
                        }

                        return (
                            <CircleMarker
                                key={index}
                                center={location}
                                radius={10}
                                color={
                                    index === 0
                                        ? "green" // Pickup Location
                                        : index === trip.length - 1
                                        ? "blue" // Dropoff Location
                                        : "orange" // Stops
                                }
                            >
                                <Popup>
                                    {index === 0
                                        ? "Pickup Location"
                                        : index === trip.length - 1
                                        ? "Dropoff Location"
                                        : `Stop ${index}`}
                                </Popup>
                            </CircleMarker>
                        );
                    })}

                {/* Render polyline if polyline data is available */}
                {polyline && polyline.length > 0 && (
                    <Polyline pathOptions={limeOptions} positions={polyline} />
                )}
            </MapContainer>
        </>
    );
};

export default Map;
