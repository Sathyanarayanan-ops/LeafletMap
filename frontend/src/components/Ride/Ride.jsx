import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from "./styles";
import apiClient from "../api";

const Ride = ({ onSearch }) => {
    const classes = useStyles();

    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [stops, setStops] = useState([]);
    const [fare, setFare] = useState(null);
    const [distance, setDistance] = useState(null);

    const isSearchEnabled =
        pickupLocation.trim() !== "" &&
        dropoffLocation.trim() !== "" &&
        stops.every((stop) => stop.trim() !== "");

    const handleAddStop = () => {
        if (stops.length < 5) {
            setStops([...stops, ""]);
        }
    };

    const handleStopChange = (index, value) => {
        const updatedStops = [...stops];
        updatedStops[index] = value;
        setStops(updatedStops);
    };

    const handleRemoveStop = (index) => {
        const updatedStops = stops.filter((_, i) => i !== index);
        setStops(updatedStops);
    };

    const handleSearch = async () => {
        const trip = [
            pickupLocation,
            ...stops.filter((stop) => stop.trim() !== ""),
            dropoffLocation,
        ];

        if (trip.some((location) => location === "")) {
            console.error("Invalid trip data: One or more locations are empty.");
            return;
        }

        try {
            const response = await apiClient.post("/trips/", { trip });
            const { distance_miles, fare } = response.data;

            setDistance(distance_miles);
            setFare(fare);

            onSearch(trip);
        } catch (error) {
            console.error("Error searching trip:", error);
        }
    };

    const handleRideNow = () => {
        console.log("Ride Now clicked! Initiate ride logic here.");
    };

    return (
        <div className={classes.container}>
            <h1>Get a ride</h1>
            <TextField
                id="pickup-location"
                label="Pickup Location"
                variant="filled"
                className={classes.textbar}
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
            />
            {stops.map((stop, index) => (
                <TextField
                    key={`stop-${index}`}
                    id={`stop-${index}`}
                    label={`Stop ${index + 1}`}
                    variant="filled"
                    className={classes.textbar}
                    value={stop}
                    onChange={(e) => handleStopChange(index, e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleRemoveStop(index)} className={classes.deleteButton}>
                                    <DeleteIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            ))}
            <TextField
                id="dropoff-location"
                label="Dropoff Location"
                variant="filled"
                className={classes.textbar}
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleAddStop}>
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                className={classes.button}
                onClick={handleSearch}
                disableElevation
                disabled={!isSearchEnabled}
            >
                {fare !== null && distance !== null ? `Distance: ${distance} mi | Fare: $${fare}` : "Search"}
            </Button>

            {fare !== null && distance !== null && (
                <Button
                    className={classes.button}
                    onClick={handleRideNow}
                    disableElevation
                    style={{ marginTop: "10px" }}
                >
                    Ride Now
                </Button>
            )}
        </div>
    );
};

export default Ride;
