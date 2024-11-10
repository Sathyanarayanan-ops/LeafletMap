import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Map = () => {
    const containerStyle = {
        width: "100%",
        height: "100%",
    };

    const center = {
        lat: 37.7749, // Default latitude (e.g., San Francisco)
        lng: -122.4194, // Default longitude
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyB8CNI5iZiL_W_Zu_nak5cP-6XeNupPQ38">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={{
                    scrollwheel: true,
                    disableDefaultUI: false, // Enables default controls like zoom buttons
                }}
            >
                {/* Add markers or other overlays here */}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
