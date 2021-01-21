import React, { useState } from 'react';
import { Button, FormControl, TextField } from '@material-ui/core';
import { useDataLayerValue } from "../../ContextAPI/DataLayer";
import { Redirect } from 'react-router-dom';


function Login() {
    const [password, setPassword] = useState("")    
    const [error, setError] = useState("");
    const [{user}, dispatch] = useDataLayerValue();

    const envPassword = "Nutzen2016";

    const setUser = (event) => {
        event.preventDefault();
        if(password === envPassword){
            dispatch({
                type: "SET_USER",
                user: "Rocio"
            })
        } else{
            setError("Recuerda bien la contraseña mamita bonita..")
        }
    } 
    
    if(user){
        return (
            <Redirect to="/admin"/>
        )
    }

    return (
        <div>
            <h1>Has tu login mamita</h1>
            <form>
                <FormControl>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FormControl>
                <Button 
                    disabled={!password}
                    onClick={setUser}>
                    Login
                </Button>
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
