

import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from "./styles";
import apiClient from "../api";

const Ride = ({ onSearch }) => {
    const classes = useStyles();

    // State to track input values
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [stops, setStops] = useState([]); // Track additional stop fields

    // Check if all fields are filled
    const isSearchEnabled =
        pickupLocation.trim() !== "" && dropoffLocation.trim() !== "" && stops.every((stop) => stop.trim() !== "");

    const handleAddStop = () => {
        if (stops.length < 5) {
            setStops([...stops, ""]); // Add an empty stop if limit not reached
        }
    };

    const handleStopChange = (index, value) => {
        // Update the specific stop's value
        const updatedStops = [...stops];
        updatedStops[index] = value;
        setStops(updatedStops);
    };

    const handleRemoveStop = (index) => {
        // Remove the specific stop from the array
        const updatedStops = stops.filter((_, i) => i !== index);
        setStops(updatedStops);
    };

    const handleSearch = async () => {
        const trip = [
            pickupLocation,
            ...stops.filter((stop) => stop.trim() !== ""),
            dropoffLocation,
        ];
        console.log("Trip array being sent to the backend:", trip);

        try {
            const response = await apiClient.post("/trips/", { trip });
            console.log("Trip search response:", response.data);
            onSearch(trip); // Pass trip to parent (App) for Map rendering
        } catch (error) {
            console.error("Error searching trip:", error);
        }
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
                onChange={(e) => setPickupLocation(e.target.value)} // Update state
            />
            {/* Render dynamically added stop fields */}
            {stops.map((stop, index) => (
                <TextField
                    key={`stop-${index}`}
                    id={`stop-${index}`}
                    label={`Stop ${index + 1}`}
                    variant="filled"
                    className={classes.textbar}
                    value={stop}
                    onChange={(e) => handleStopChange(index, e.target.value)} // Update specific stop
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
                onChange={(e) => setDropoffLocation(e.target.value)} // Update state
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
                disabled={!isSearchEnabled} // Disable button if fields are empty
            >
                Search
            </Button>
        </div>
    );
};

export default Ride;
