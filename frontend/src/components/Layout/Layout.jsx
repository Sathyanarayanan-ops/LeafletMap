// import React from "react";
// import { Box } from "@mui/material";
// import Header from "../Header/Header";
// import Ride from "../Ride/Ride";
// import Map from "../Map/Map";

// const Layout = () => {
//     return (
//         <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//             {/* Header */}
//             <Header />

//             {/* Main Content Area */}
//             <Box sx={{ position: "relative", flex: 1, height: "100%", overflow: "hidden" }}>
//                 {/* Full-Screen Map */}
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         height: "calc(100vh - 64px)", // Full height minus header height (adjust if needed)
//                         zIndex: 1,
//                     }}
//                 >
//                     <Map />
//                 </Box>

//                 {/* Floating Ride Card */}
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "20%", // Adjust vertical position
//                         left: "50%",
//                         transform: "translate(-50%, -20%)", // Center horizontally, adjust vertically
//                         zIndex: 10, // Ensure card stays above the map
//                         width: "400px",
//                         backgroundColor: "white", // Solid background
//                         borderRadius: "16px", // Rounded corners for aesthetics
//                         boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", // Card shadow
//                         padding: "24px", // Internal padding
//                     }}
//                 >
//                     <Ride />
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default Layout;
