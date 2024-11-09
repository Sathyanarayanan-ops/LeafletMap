import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    appBar: {
        backgroundColor: "#000", // Black Uber-like theme
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    logo: {
        fontWeight: "bold",
    },
    button: {
        marginLeft: "10px",
    },
});

export default useStyles;
