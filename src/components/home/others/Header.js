import React from 'react';

//Link
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from "@material-ui/core/IconButton";

//Responsive
import { useMediaQuery } from 'react-responsive'

//Menu drawer
import clsx from "clsx";
import "./hamburgers/dist/hamburgers.css";

import Drawer from "@material-ui/core/Drawer";
import "bootstrap/dist/css/bootstrap.min.css";

//Colors
import { PRIMARY, BLACK_BUTTON_PRIMARY } from "../../../resources/Colors";

const drawerWidth = 175;

const useStyles = makeStyles((theme) =>({
    appBar: {
        height: "100px",
        backgroundColor: "black",
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        outline: "none",
        marginBottom: "0px",
        [theme.breakpoints.down("480")]: {
            height: "70px",
        },
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px 5px 20px',
        //background: PRIMARY,
//        backgroundImage: `linear-gradient(to top, rgba(255,255,255, 0)0%, ${PRIMARY} 60%)`
    },
    logoContainer: {
        flex: '1',
    },
    logoImg: {
        width: '200px'
    },
    menuContainer: {
        backgroundColor: 'none'
    },
    menuInnerContainer: {
        display: 'flex',
        backgroundColor: 'none',
    },
    menuItem: {
        marginLeft: '20px',
        marginRight: '20px',
        textAlign: 'center',
        backgroundColor: 'none',
        transition: 'transform 500ms',
        '&:hover': {
            transform: 'scale(1.08)',
        }
    },
    menuItemSocial: {
        marginLeft: '20px',
        marginRight: '20px',
        textAlign: 'center',
        backgroundColor: 'none',

    },
    menuItemLink: {
        color: BLACK_BUTTON_PRIMARY,
        '&:hover': {
            color: BLACK_BUTTON_PRIMARY
        }
    },
    menuItemContainer: {
        paddingTop: '10px',
        textAlign: 'center',
        fontSize: '20px'
    },
    menuItemContainerSocial: {
        paddingTop: '15px'
    },
    menuItemText: {
        position: "relative",
        fontWeight: 'normal',
        top: "15px"
    },
    socialIcon: {
        fontSize: '45px',
        cursor: 'pointer',
        transition: 'transform 500ms',
        color: BLACK_BUTTON_PRIMARY,
        '&:hover': {
            transform: 'scale(1.2)',
        }
    },
    hamburguerMenu: {
        backgroundColor: "black !important",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: PRIMARY,
        zIndex: "1",
        border: 'none',
        height: 'auto',
        borderBottomLeftRadius: '10px'
    },
    navButton: {
        outline: "none !important",
        zIndex: "10",
    },
    movilMenuContainer: {
        paddingTop: '100px',
        paddingBottom: '75px'
    }
}));


function Header({classes}) {
    classes = useStyles();
    const isMobile = useMediaQuery({query: '(max-device-width: 992px)'});
    const [open, setOpen] = React.useState(false);

    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    return (
        <div>
            {!isMobile &&  
                <div className={classes.headerContainer}>
                    <div className={classes.logoContainer}>
                        <Link to="/">
                            <img alt="Nutzen" className={classes.logoImg} src="./img/home/landing/logo_noback.png"/>
                        </Link>
                    </div>
                    <div className={classes.menuContainer}>
                        <div className={classes.menuInnerContainer}>
                            <div className={classes.menuItem}>
                                <Link to="/" className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <p className={classes.menuItemText}>INICIO</p>
                                    </div>
                                </Link>
                            </div>
                            <div className={classes.menuItem}>
                                <HashLink to="/#productos" smooth className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <p className={classes.menuItemText}>PRODUCTOS</p>
                                    </div>
                                </HashLink>
                            </div>
                            <div className={classes.menuItem}>
                                <HashLink to="/#tiendas" smooth className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <p className={classes.menuItemText}>TIENDAS</p>
                                    </div>
                                </HashLink>
                            </div>
                            <div className={classes.menuItem}>
                                <Link to="/recetas" className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <p className={classes.menuItemText}>RECETAS</p>
                                    </div>
                                </Link>
                            </div>
                            <div className={classes.menuItem}>
                                <HashLink to="/#contacto" smooth className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <p className={classes.menuItemText}>CONTACTO</p>
                                    </div>
                                </HashLink>
                            </div>
                            <div className={classes.menuItemSocial}>
                                <div className={classes.menuItemContainerSocial}>
                                    <InstagramIcon 
                                        className={classes.socialIcon} 
                                        style={{color: 'black', marginRight: '10px'}}
                                        onClick={() => {openInNewTab("https://www.instagram.com/nutzenmx/")}}
                                    />
                                    <FacebookIcon 
                                        className={classes.socialIcon} 
                                        style={{color: 'black'}}
                                        onClick={() => {openInNewTab("https://www.facebook.com/nutzenmx/")}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isMobile &&
                <div className={classes.headerContainer}>
                    <div className={classes.logoContainer}>
                        <img alt="Nutzen" className={classes.logoImg} src="./img/home/landing/logo_noback.png"/>
                    </div>
                    <div>
                        <IconButton
                            className={clsx(
                                "hamburger hamburger--spin",
                                {
                                ["is-active"]: open,
                                },
                                classes.navButton
                            )}
                            type="button"
                            onClick={() => setOpen(!open)}
                            >
                            <span className="hamburger-box">
                                <span
                                className={clsx("hamburger-inner", classes.hamburguerMenu)}
                                ></span>
                            </span>
                        </IconButton>
                    </div>
                </div>
            }
             <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                paper: classes.drawer,
                }}
            >
                <div className={classes.movilMenuContainer}>
                    <div className={classes.menuItem}>
                        <Link to="/" className={classes.menuItemLink}>
                            <div className={classes.menuItemContainer}>
                                <p className={classes.menuItemText}>INICIO</p>
                            </div>
                        </Link>
                    </div>
                    <div className={classes.menuItem}>
                        <HashLink to="/#productos" smooth className={classes.menuItemLink}>
                            <div className={classes.menuItemContainer}>
                                <p className={classes.menuItemText}>PRODUCTOS</p>
                            </div>
                        </HashLink>
                    </div>
                    <div className={classes.menuItem}>
                        <HashLink to="/#tiendas" smooth className={classes.menuItemLink}>
                            <div className={classes.menuItemContainer}>
                                <p className={classes.menuItemText}>TIENDAS</p>
                            </div>
                        </HashLink>
                    </div>
                    <div className={classes.menuItem}>
                        <Link to="/recetas" className={classes.menuItemLink}>
                            <div className={classes.menuItemContainer}>
                                <p className={classes.menuItemText}>RECETAS</p>
                            </div>
                        </Link>
                    </div>
                    <div className={classes.menuItem}>
                        <HashLink to="/#contacto" smooth className={classes.menuItemLink}>
                            <div className={classes.menuItemContainer}>
                                <p className={classes.menuItemText}>CONTACTO</p>
                            </div>
                        </HashLink>
                    </div>
                    <div className={classes.menuItemSocial}>
                        <div className={classes.menuItemContainerSocial}>
                            <InstagramIcon className={classes.socialIcon} style={{color: 'black', marginRight: '10px'}}/>
                            <FacebookIcon className={classes.socialIcon} style={{color: 'black'}}/>
                        </div>
                    </div>
                </div>
            </Drawer>
            
        </div>
    )
}

export default Header;
