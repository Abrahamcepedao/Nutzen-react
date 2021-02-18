import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
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
        fontSize: '75px',
        textAlign: 'center',
        [theme.breakpoints.down('768')]: {
            fontSize: '45px'
        }
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
                    {/* <h1 className={classes.phraseTitle}>Tu crema de cacahuate en Mérida</h1> */}
                </div>
                
            </div>
        </div>
    )
}

export default Landing;
