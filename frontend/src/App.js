// import React, { useState } from "react";
// import { Box } from "@mui/material";
// import Header from "./components/Header/Header";
// import Ride from "./components/Ride/Ride";
// import Map from "./components/Map/Map";
// import axios from 'axios';


// const App = () => {
//     // const handleLocationUpdate = (trip) => {
//     //     console.log("Trip data received", trip);
//     // }

//     return (
//         <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//             {/* Header */}
//             <Header />

//             {/* Main Content Area */}
//             <Box sx={{flex:1}}>
//                 {/* Done to prevent map from covering/blocking over the floating window */}
//                 <Map/>  
//             </Box>
//                 {/* Floating Ride Form */}
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "20%",
//                         left: "5%",
//                         zIndex: 10, // Ensure it floats above the map
//                         width: "400px",
//                         backgroundColor: "white",
//                         borderRadius: "12px",
//                         boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
//                         padding: "16px",
//                     }}
//                 >
//                     <Ride />
//                 </Box>
//             </Box>
//     );
// };

// export default App;


import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import Ride from "./components/Ride/Ride";
import Map from "./components/Map/Map";

const App = () => {
    const [refreshMap, setRefreshMap] = useState(false);

    const handleRefreshMap = () => {
        setRefreshMap((prev) => !prev); // Toggle state to trigger a refresh
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <Box sx={{ flex: 1 }}>
                <Map refreshMap={refreshMap} />  
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
                <Ride onSearch={handleRefreshMap} /> {/* Pass handler to Ride */}
            </Box>
        </Box>
    );
};

export default App;
