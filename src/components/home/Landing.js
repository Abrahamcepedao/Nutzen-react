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
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './others/Header';

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
                <Header/>


                {/* Frase */}
                <div className={classes.phraseContainer}>
                    <h1 className={classes.phraseTitle}>Tu crema de cacahuate en Mérida</h1>
                </div>
                
            </div>
        </div>
    )
}

export default Landing;
