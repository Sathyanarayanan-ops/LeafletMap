import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import useStyles from "./styles"

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.logo}>
                    Uber
                </Typography>
                <Button color = "inherit" className={classes.button}>
                    Ride
                </Button>
                <Button color = "inherit" className={classes.button}>
                    User Details
                </Button>
                <Button color = "inherit" className={classes.button}>
                    Past Trips
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;