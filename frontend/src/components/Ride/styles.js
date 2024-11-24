<<<<<<< HEAD

=======
>>>>>>> 583f1c2c9b39cc04feac95141c2b8f5b60d5b179

//
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    width: "100%",  // Changed to 100% to fit parent container
  },
  textbar: {
    width: "320px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    '& .MuiFilledInput-root': {
      backgroundColor: "#f5f5f5",
    }
  },
  button: {
    height: "56px",
    width: "320px",
    backgroundColor: "#f5f5f5",
    color: "#000",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  deleteButton: {
    color: "#666",
  }
});

export default useStyles;
