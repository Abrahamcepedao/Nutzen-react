import React from 'react';

//Link
import { HashLink } from 'react-router-hash-link';

//MaterialUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';

//Components
import Header from './others/Header';

//Colors
import { PRIMARY, BLACK_BUTTON_PRIMARY, BLACK_BUTTON_SECONDARY } from "../../resources/Colors";

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
            backgroundAttachment: 'fixed',
            minHeight: '600px',
        }
    },
    backgroundOverlay: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '800px',
        [theme.breakpoints.up('992')]: {
            minHeight: '600px',
        },
        backgroundColor: 'rgba(225, 210, 186, 0.75)'
    },
    phraseContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: "center",
        padding: "50px",
        [theme.breakpoints.down('576')]: {
            padding: "20px"
        }
    },
    phraseTitle: {
        color: BLACK_BUTTON_PRIMARY,
        fontWeight: 'bold',
        fontSize: '75px',
        textAlign: 'center',
        [theme.breakpoints.down('768')]: {
            fontSize: '45px'
        }
    },
    buttonLink: {
        '&:hover': {
            textDecoration: 'none',
        }
    }
}));

const BlackButton = withStyles((theme) => ({
  root: {
    color: PRIMARY,
    backgroundColor: BLACK_BUTTON_PRIMARY,
    borderRadius: "100px",
    transition: "transform 450ms",
    fontWeight: "bolder",
    padding: "10px 20px",
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: BLACK_BUTTON_SECONDARY,
      transform: "scale(1.08)",
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: BLACK_BUTTON_SECONDARY,
      border: 'none',
    },
    '&:focus': {
      backgroundColor: BLACK_BUTTON_SECONDARY,
    },
    '&:disabled': {
        opacity: '0.7',
        color: 'black'
    }
  },
}))(Button);


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
                    <HashLink smooth to="/#tiendas" className={classes.buttonLink}>
                        <BlackButton>¿Dónde comprar?</BlackButton>
                    </HashLink>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Landing;
