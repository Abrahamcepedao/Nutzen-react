import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";
import firebase from '../../database/firebase';
import Header from './Header';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { PRIMARY, TEXT_COLOR, BLACK_BUTTON_PRIMARY, BLACK_BUTTON_SECONDARY } from "../../resources/Colors";

const useStyles = makeStyles((theme) => ({
    backgroundContainer: {
        backgroundColor: PRIMARY,
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        paddingBottom: '50px',
        textAlign: 'center',
    },
    formContainer: {
        width: '90%',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '100px',
        backgroundColor: 'rgba(250,250,250,0.25)',
        padding: '20px 50px',
        borderRadius: '12px',
        marginBottom: '50px'
    },
}));


const BlackButton = withStyles((theme) => ({
  root: {
    color: PRIMARY,
    backgroundColor: BLACK_BUTTON_PRIMARY,
    borderRadius: "100px",
    transition: "transform 450ms",
    fontWeight: "bolder",
    padding: "10px 20px",
    margin: 'auto',
    marginBottom: '20px',
    width: '80%',
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

const MyTextField = withStyles({
  root: {
    marginBottom: '20px',
    width: '100%',
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black'
      },
    },
  },
})(TextField);


function Frase({classes}) {
    const [{user}] = useDataLayerValue();
    const [phrase, setPhrase] = useState('frase');
    const [newPhrase, setNewPhrase] = useState('');
    const [phraseID, setPhraseID] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    classes = useStyles();

    useEffect(() => {
        firebase.db.collection("frase").onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                setPhrase(doc.data().frase);
                setPhraseID(doc.id);
            })
        })
    }, [])

    const handlePhraseChange = () => {
        if(newPhrase){
            firebase.db.collection("frase").doc(phraseID).set({
                frase: newPhrase
            })
            setPhrase(newPhrase);
            setError('');
            setSuccess('Ya se cambio la frase mamitaa');
        } else{
            setSuccess('');
            setError('Mamitaa ponga una frase no sea floja JAJAJ');
        }
        
    }

    return (
        <div>
            {user ? (
                <div className={classes.backgroundContainer}>
                    <Header/>
                    <h1 style={{marginBottom: '100px', fontWeight: 'bold', color: TEXT_COLOR}}>Admin frase</h1>
                    <div className={classes.formContainer}>
                        <h4>{`frase actual: ${phrase}`}</h4>
                        <MyTextField variant="outlined" id="custom-css-outlined-input"  value={newPhrase} onChange={e => setNewPhrase(e.target.value)}/>
                        <BlackButton onClick={handlePhraseChange}>
                            Cambiar frase
                        </BlackButton>
                        {success && (
                            <p style={{fontWeight: 'bold'}}>{success}</p>
                        )}
                        {error && (
                            <p style={{fontWeight: 'bold'}}>{error}</p>
                        )}
                    </div>
                </div>
            ) : (
                <Redirect to="/login"/>
            )}
        </div>
    )
}

export default Frase
