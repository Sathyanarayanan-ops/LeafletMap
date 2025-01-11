import React, {useState} from "react";
import apiClient from "./api";


const DriverMenu = () => {
    const [status,setStatus] = useState("");

    const handleBroadcast = async () => {
        try{
            const response = await apiClient.get("/broadcast-ride");
        }catch(error){
            console.error("Error broadcasting ride:",error);
        }
    };
    return(
        <h1>Rides Pop up here</h1>
    )
}

export default DriverMenu;