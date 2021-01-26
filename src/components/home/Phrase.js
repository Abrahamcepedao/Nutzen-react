import React, { useState, useEffect } from 'react';
import firebase from '../../database/firebase';

function Phrase() {
    const [phrase, setPhrase] = useState('Eres lo que haces');

    useEffect(() => {
        firebase.db.collection("frase").onSnapshot(snapshot => {
            snapshot.docs.forEach(doc => {
                setPhrase(doc.data().frase);
            })
        })
    }, [])

    return (
        <div>
            <h1>{phrase}</h1>;
        </div>
    )
}

export default Phrase
