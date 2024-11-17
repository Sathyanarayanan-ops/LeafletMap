import React,{useRef} from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import useStyles from "./styles";

const Map = () => {
    const mapRef = useRef(null);
    const classes = useStyles();

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
    </MapContainer>

    );
};

export default Map;
