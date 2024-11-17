

import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({

    mapContainer: {
        width: "100vw" ,
        height: "100vh",
        zIndex:1, // Lower so it does not overlap floating components
      },
});

export default useStyles;