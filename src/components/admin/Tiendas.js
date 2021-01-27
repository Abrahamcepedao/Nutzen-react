import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";
import firebase from '../../database/firebase';

function Tiendas() {
    const [{user}] = useDataLayerValue();
    const [url, setUrl] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {

    }, [])


    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    };

    const handleUpload = () => {
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
        
    }
    
    return (
        <div>
            {user ? (
                <>
                    <h1>Admin tiendas</h1>
                    <TextField placeholder="Agregar url.." value={url} onChange={e => setUrl(e.target.value)}/>
                    <progress className="imageUpload__progress" value={progress} max="100"/>
                    <input type="file" onChange={handleImageChange}/>
                    <Button onClick={handleUpload}>
                        Agregar tienda
                    </Button>
                </>
            ) : (
                <Redirect to="/login"/>
            )}
        </div>
    )
}

export default Tiendas
