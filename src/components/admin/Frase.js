import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";
import firebase from '../../database/firebase';

function Frase() {
    const [{user}] = useDataLayerValue();
    const [phrase, setPhrase] = useState('');
    const [newPhrase, setNewPhrase] = useState('');
    const [phraseID, setPhraseID] = useState('');

    useEffect(() => {
        firebase.db.collection("frase").onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                setPhrase(doc.data().frase);
                setPhraseID(doc.id);
            })
        })
    }, [])

    const handlePhraseChange = () => {
        firebase.db.collection("frase").doc(phraseID).set({
            frase: newPhrase
        })
        setPhrase(newPhrase);
    }

    return (
        <div>
            {user ? (
                <>
                    <h1>Admin frase</h1>
                    <h2>{`frase actual: ${phrase}`}</h2>
                    <TextField value={newPhrase} onChange={e => setNewPhrase(e.target.value)}/>
                    <Button onClick={handlePhraseChange}>
                        Cambiar frase
                    </Button>
                </>
            ) : (
                <Redirect to="/login"/>
            )}
        </div>
    )
}

export default Frase
