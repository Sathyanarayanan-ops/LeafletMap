import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    appBar: {
        backgroundColor: "#fff", // Black Uber-like theme
        color:"#000",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between", // Space between left and right groups
    },
    leftGroup: {
        display: "flex",
        alignItems: "center", // Vertically align items in the left group
        gap: "40px",
        color: "#000",
    },
    rightGroup: {
        display: "flex",
        alignItems: "center", // Vertically align items in the right group
        gap : "20px",
        color: "#000",
    },
    logo: {
        fontWeight: "bold",
        marginRight: "20px", // Spacing between the logo and "Ride"
        color:"#000",
    },
    button: {
        marginRight: "10px", // Spacing for the "Ride" button
        color: "#000",
    },
    iconButton: {
        marginLeft: "10px", // Spacing between the bill and user icons
        color: "#000",
    },
    textWithIcon: {
        display: "flex",
        alignItems: "center", // Vertically aligns text and icon
        fontSize: "12px", // Adjusts font size of the text
    },
    icon: {
        marginLeft: "2px",
        fontSize: "16px",
    },
    menuItem: {
        fontSize: "14px", // Example: Adjust font size for menu items
    },
});

export default useStyles;
