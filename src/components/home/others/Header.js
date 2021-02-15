import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import HomeIcon from "@material-ui/icons/Home";
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

//Colors
import { PRIMARY } from "../../../resources/Colors";

const useStyles = makeStyles((theme) =>({
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: PRIMARY,
//        backgroundImage: `linear-gradient(to top, rgba(255,255,255, 0)0%, ${PRIMARY} 60%)`
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
        color: 'black',
        '&:hover': {
            textDecoration: 'none',
            color: 'black',
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
    socialIcon: {
        transition: 'transform 500ms',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.2)'
        }
    }
}));


function Header({classes}) {
    classes = useStyles();

    return (
        <div className={classes.headerContainer}>
            <div className={classes.logoContainer}>
                <img alt="Nutzen" className={classes.logoImg} src="./img/home/landing/logo.png"/>
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
                    <div className={classes.menuItemSocial}>
                        <div className={classes.menuItemContainerSocial}>
                            <InstagramIcon className={classes.socialIcon} style={{color: 'black', marginRight: '10px'}}/>
                            <FacebookIcon className={classes.socialIcon} style={{color: 'black'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
