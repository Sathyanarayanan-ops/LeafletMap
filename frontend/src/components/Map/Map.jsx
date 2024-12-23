import React,{useEffect, useRef, useState} from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import useStyles from "./styles";
import apiClient from "../api";


const Map = ({refreshMap}) => {
    const mapRef = useRef(null);
    const classes = useStyles();

    const [polyline,setPolyline] = useState(null);
    // const [refreshMap, setRefreshMap] = useState(false); // Tracks route updates


    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await apiClient.get("/trips/");
                setPolyline(response.data); // Update polyline with new route
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        };

        fetchRoute();
    }, [refreshMap]); // Re-fetch route whenever refreshMap changes

    

    // Get the data from backend 
    // const polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

    const limeOptions = { color: 'red' , weight: 7}

    return (
    <MapContainer 
        className= {classes.mapContainer}
        center={[33.99518, -118.46849]}
        zoom={13}
        ref={mapRef}
        scrollWheelZoom={true}
        // style={{height: "100vh", width: "100vw"}}
    >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[33.99518, -118.46849]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
         {/* Only render Polyline if we have data */}
         {polyline && (<Polyline pathOptions={limeOptions} positions={polyline} />
            )}
      
    </MapContainer>

    );
};

export default Map;
