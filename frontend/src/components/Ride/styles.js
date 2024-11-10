import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column", // Stack elements vertically
        alignItems: "center", // Center elements horizontally
        gap: "20px", // Add consistent vertical spacing between elements
        marginTop: "30px", // Add top margin for breathing room
        padding: "20px", // Internal padding for spacious feel
        borderRadius: "12px", // Rounded corners for a smooth look
        backgroundColor: "#fff", // Background color for the container
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Shadow for a nice outline
        width: "400px", // Container width
        margin: "0 auto", // Center the container on the page
    },
    textbar: {
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Matches button shadow
        width: "320px",
        borderRadius: "8px", // Rounded corners for consistency
        backgroundColor: "#f5f5f5", // Light gray background
        padding: "10px", // Add internal padding for a spacious look
    },
    button: {
        height: "56px", // Matches default TextField height
        width: "320px", // Matches TextField width
        backgroundColor: "#f5f5f5", // Matches TextField background
        color: "#000", // Black text for contrast
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Same shadow for consistency
        borderRadius: "8px", // Matches TextField rounded corners
        textTransform: "none", // Keeps text case natural
        fontWeight: "bold", // Add bold text for emphasis
        "&:hover": {
            backgroundColor: "#e0e0e0", // Slightly darker hover effect
        },
    },
});

export default useStyles;
