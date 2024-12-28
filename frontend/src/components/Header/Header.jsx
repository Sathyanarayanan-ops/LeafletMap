import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import useStyles from "./styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Header = ({ onLogout }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl); // To check if the dropdown menu is open

    // Opens the dropdown menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Closes the dropdown menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className={classes.appBar} color="inherit">
            <Toolbar className={classes.toolbar}>
                {/* Left Group: App Name and Ride Button */}
                <div className={classes.leftGroup}>
                    <Typography variant="h6" className={classes.logo}>
                        Uber
                    </Typography>
                    <IconButton color="inherit" className={classes.iconButton}>
                        <DirectionsCarIcon />
                        Ride
                    </IconButton>
                </div>
                {/* Right Group: MyTrips and Profile/Logout */}
                <div className={classes.rightGroup}>
                    <IconButton color="inherit" className={classes.iconButton}>
                        <span className={classes.textWithIcon}>MyTrips</span>
                        <ReceiptLongIcon />
                    </IconButton>
                    {/* Account/Profile Dropdown */}
                    <IconButton
                        color="inherit"
                        className={classes.iconButton}
                        onClick={handleMenuOpen}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>Wallet</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Support</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Manage Account</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        {/* Logout Option */}
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                onLogout(); // Call the logout handler passed from App.jsx
                            }}
                        >
                            Signout
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}; 

export default Header;
