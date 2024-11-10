import React, {useState} from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import useStyles from "./styles"
import AccountCircle from "@mui/icons-material/AccountCircle"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';


const Header = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    
    const isMenuOpen = Boolean(anchorEl); // to check if menu is open 
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // closes the menu
    };

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                {/* Left Group : Logo + Ride */}
                <div className={classes.leftGroup}>
                    <Typography variant="h6" className={classes.logo}>
                        Uber
                    </Typography>
                    <IconButton color = "inherit" className={classes.iconButton}>
                        <DirectionsCarIcon/>
                        Ride
                    </IconButton>
                </div>
                {/* Right Group */}
                <div className={classes.rightGroup}>
                        <IconButton 
                            color="inherit"
                            className={classes.iconButton}                      
                        >
                            <span className={classes.textWithIcon}>
                                MyTrips
                            </span>
                            <ReceiptLongIcon />
                        </IconButton>
                   {/* Tooltip in mui provides addiitional info when users hover over an element  */}
                        <IconButton color="inherit" className={classes.iconButton} 
                            onClick={handleMenuOpen} // Opening menu on click  
                        >
                            <AccountCircle />
                        </IconButton>
                        {/* DropDown Menu */}
                        <Menu
                            anchorEl={anchorEl}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal:"right",
                            }}
                            transformOrigin={{
                                vertical:"top",
                                horizontal:"right",
                            }}
                            >
                            <MenuItem onClick={handleMenuClose}>Wallet</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Support</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Manage Account</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;