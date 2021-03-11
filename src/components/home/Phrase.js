import React, { useState, useEffect } from 'react';
import firebase from '../../database/firebase';

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

//Colors
import { PRIMARY } from "../../resources/Colors";

const useStyles = makeStyles((theme) => ({
    phraseBackground: {
        width: '100vw',
        height: '100vh',
        minHeight: '500px',
        backgroundImage: "url(./img/home/landing/background.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    overlay: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(224, 211, 186, 0.45)'
    },
    phraseContainer: {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        //background: PRIMARY,
         backgroundImage: 'radial-gradient(rgba(225, 210, 186, 1), 10%, rgba(225, 210, 186, 0)90%, rgba(225, 210, 186, 0)100%)',
        padding: '50px',
        //borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '100%',
        [theme.breakpoints.down('576')]: {
            maxWidth: '96%'
        }
    },
    phrase: {
        fontWeight: 'bold',
        fontSize: '75px',
        [theme.breakpoints.down('768')]: {
            fontSize: '45px'
        }
    }
}));

function Phrase({classes}) {
    const [phrase, setPhrase] = useState('Eres lo que haces');
    classes = useStyles();

    useEffect(() => {
        firebase.db.collection("frase").onSnapshot(snapshot => {
            snapshot.docs.forEach(doc => {
                setPhrase(doc.data().frase);
            })
        })
    }, [])

    return (
        <div className={classes.phraseBackground} style={{backgroundAttachment: isDesktop && "fixed"}}>
            <div className={classes.overlay}>
                <div className={classes.phraseContainer}>
                    <FormatQuoteIcon style={{fontSize: '35px'}}/>
                    <h1 className={classes.phrase}>{phrase}</h1>
                </div>
            </div>
        </div>
    )
}

export default Phrase
