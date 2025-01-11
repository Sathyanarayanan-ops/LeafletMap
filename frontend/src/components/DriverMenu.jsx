import React, { useState, useEffect } from "react";
import apiClient from "./api";
import { Button, Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";

const DriverMenu = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAcceptRide = async (rideId) => {
        try{
            const response = await apiClient.patch("/accept-ride/",{
                ride_id:rideId,
            });

            if (response.status == 200){
                alert(`Ride ${rideId} accepted successfully!`);
            }else{
                alert("Failed to accept the ride , please try again");
            }
        }catch(error){
            console.error("Error accepting ride:",error);
        }
    };

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const rideResponse = await apiClient.get("/broadcast-ride/");
                setRides(rideResponse.data); // Fetch pending rides and set state
            } catch (err) {
                console.error("Error fetching rides:", err);
                setError("Failed to load pending rides.");
            } finally {
                setLoading(false);
            }
        };
        fetchRides();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {rides.map((ride) => (
                <Card key={ride.id} sx={{ maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h6">Ride ID: {ride.id}</Typography>
                        <Typography variant="subtitle1">Pickup: {ride.pickup}</Typography>
                        <Typography variant="subtitle1">Dropoff: {ride.dropoff}</Typography>
                        <Typography variant="subtitle1">
                            Stops: {ride.inter_stops.join(", ")}
                        </Typography>
                        <Typography variant="subtitle1">Cost: ${ride.cost}</Typography>
                        <Typography variant="subtitle1">
                            Distance: {ride.miles} miles
                        </Typography>
                        <Typography variant="subtitle1">Status: {ride.status}</Typography>
                        <Typography variant="subtitle2">Rider: {ride.rider_name}</Typography>
                        <Button onClick={() => handleAcceptRide(ride.id)}>Accept Ride</Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default DriverMenu;
