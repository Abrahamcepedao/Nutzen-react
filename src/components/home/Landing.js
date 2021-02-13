import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
//import { Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import HomeIcon from "@material-ui/icons/Home";
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) =>({
    backgroundContainer: {
        width: '100vw',
        height: '100vh',
        minHeight: '800px',
        backgroundImage: "url(./img/home/landing/background.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.up('992')]: {
            backgroundAttachment: 'fixed'
        }
    },
    backgroundOverlay: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.25)'
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px'
    },
    logoContainer: {
        flex: '1',
    },
    logoImg: {
        width: '200px'
    },
    menuContainer: {
        backgroundColor: 'none',
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
    },
    menuItemLink: {
        color: 'white',
        '&:hover': {
            textDecoration: 'none',
            color: 'white',
        }
    },
    menuItemContainer: {
        paddingTop: '10px',
        textAlign: 'center'
    },
    menuItemContainerSocial: {
        paddingTop: '20px'
    },
    menuItemText: {
        fontWeight: 'bold'
    },
    phraseContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    phraseTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '50px'
    }
}));


function Landing({classes}) {
    classes = useStyles();

    return (
        <div className={classes.backgroundContainer}>
            <div className={classes.backgroundOverlay}>
                {/* Header */}
                <div className={classes.headerContainer}>
                    <div className={classes.logoContainer}>
                        <img className={classes.logoImg} src="./img/home/landing/logo.png"/>
                    </div>
                    <div className={classes.menuContainer}>
                        <div className={classes.menuInnerContainer}>
                            <div className={classes.menuItem}>
                                <Link to="/" className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <HomeIcon />
                                        <p className={classes.menuItemText}>Inicio</p>
                                    </div>
                                </Link>
                            </div>
                            <div className={classes.menuItem}>
                                <HashLink to="/#productos" smooth className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <LocalGroceryStoreIcon />
                                        <p className={classes.menuItemText}>Productos</p>
                                    </div>
                                </HashLink>
                            </div>
                            <div className={classes.menuItem}>
                                <HashLink to="/#tiendas" smooth className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <StorefrontIcon />
                                        <p className={classes.menuItemText}>Tiendas</p>
                                    </div>
                                </HashLink>
                            </div>
                            <div className={classes.menuItem}>
                                <Link to="/recetas" className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <MenuBookIcon />
                                        <p className={classes.menuItemText}>Recetas</p>
                                    </div>
                                </Link>
                            </div>
                            <div className={classes.menuItem}>
                                <HashLink to="/#contacto" smooth className={classes.menuItemLink}>
                                    <div className={classes.menuItemContainer}>
                                        <PhoneIphoneIcon />
                                        <p className={classes.menuItemText}>Contacto</p>
                                    </div>
                                </HashLink>
                            </div>
                            <div className={classes.menuItem}>
                                <div className={classes.menuItemContainerSocial}>
                                    <InstagramIcon style={{color: 'white', marginRight: '10px'}}/>
                                    <FacebookIcon style={{color: 'white'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Frase */}
                <div className={classes.phraseContainer}>
                    <h1 className={classes.phraseTitle}>Tu crema de cacahuate en Mérida</h1>
                </div>
                
            </div>
        </div>
    )
}

export default Landing;
