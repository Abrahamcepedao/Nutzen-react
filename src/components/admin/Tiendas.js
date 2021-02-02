import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
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
    formLabel: {
        textAlign: 'left',
        fontWeight:'bold'
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


function Tiendas({classes}) {
    const [{user}] = useDataLayerValue();
    const [url, setUrl] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    
    //Error and succes
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');

    classes = useStyles();
    useEffect(() => {

    }, [])


    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if(image && url){
            const uploadTask = firebase.storage.ref(`tiendas/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) =>  {
                    // progress  function
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress)
                },
                (error) => {
                    // error function
                    console.log(error);
                    alert(error.message);
                },
                () => {
                    // complete function
                    firebase.storage
                        .ref(`tiendas`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(imageUrl => {
                            firebase.db.collection("tiendas").add({
                                image: imageUrl,
                                url: url
                            })
                            setProgress(0);
                            setImage(null);
                        });
                }
            )
            setImage(null);
            setUrl('')
            setError('');
            setSucces("Ya se agregó la tienda rouss");
        } else{
            setSucces('');
            setError("Mamitaa agrega toda la info!");
        }
    }
    
    return (
        <div>
            {user ? (
                <div className={classes.backgroundContainer}>
                    <Header/>
                    <h1 style={{marginBottom: '100px', fontWeight: 'bold', color: TEXT_COLOR}}>Admin tiendas</h1>
                    <div className={classes.formContainer}>
                        <MyTextField variant="outlined" id="custom-css-outlined-input"  placeholder="Agregar url.." value={url} onChange={e => setUrl(e.target.value)}/>
                        <p className={classes.formLabel}>Selecciona una imagen doña rous</p>
                        <input style={{margin: 'auto', width: '100%', marginBottom: '20px', textAlign: 'center'}} type="file" onChange={handleImageChange}/>
                        <progress style={{margin: 'auto', width: '100%', marginBottom: '20px'}} value={progress} max="100"/>
                        <BlackButton onClick={handleUpload}>
                            Agregar tienda
                        </BlackButton>
                        {succes && (
                            <p style={{fontWeight: 'bold'}}>{succes}</p>
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

export default Tiendas
