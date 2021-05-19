import React, { useState, useEffect } from 'react';

//MaterialUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, FormControl, TextField } from '@material-ui/core';

//Data Layer
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

//Router
import { Redirect } from 'react-router-dom';

//Colors
import { PRIMARY, BLACK_BUTTON_PRIMARY, BLACK_BUTTON_SECONDARY } from "../../resources/Colors";

const useStyles = makeStyles((theme) => ({
    backgroundContainer: {
        backgroundColor: PRIMARY,
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        paddingTop: '50px',
        textAlign: 'center',
    },
    formContainer: {
        width: '90%',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '100px',
    },
    textFieldContainer: {
        width: '100%',
        marginBottom: '20px'
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

function Login({classes}) {
    classes = useStyles();

    const [password, setPassword] = useState(localStorage.getItem("password"))    
    const [error, setError] = useState("");
    const [{user}, dispatch] = useDataLayerValue();

    const envPassword = "Nutzen2016";

    useEffect(() => {
      if(password){
        console.log("password: ",password)
        setUser();
      }
      console.log(password)
    },[])

    const setUser = (event) => {
        if(event){
          event.preventDefault();
        }
        
        localStorage.setItem("password", password)
        console.log(password)
        if(password === envPassword){
            dispatch({
                type: "SET_USER",
                user: "Rocio"
            })
            console.log("user is set")
        } else{
            setError("Recuerda bien la contraseña mamita bonita..")
        }
    } 
    
    if(user){
        return (
            <Redirect to="/admin"/>
        )
    };
    

    return (
        <div className={classes.backgroundContainer}>
            <h1 style={{fontWeight: 'bold'}}>Has tu login mamita</h1>
            <form className={classes.formContainer}>
                <FormControl  style={{width: '100%',marginBottom: '20px'}}>
                    <MyTextField
                        id="outlined-password-input"
                        label="Pon la contraseña mamitaa"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FormControl>
                <BlackButton 
                    disabled={!password}
                    onClick={setUser}
                    onSubmit={setUser}
                    type="submit">
                    Login
                </BlackButton>
            </form>
            {error && (
                <div>
                    <h2>{error}</h2>
                </div>
            )}
        </div>
    )
}

export default Login
