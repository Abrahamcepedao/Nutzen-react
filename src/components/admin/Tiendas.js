import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

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
            const uploadTask = firebase.storage.ref(`recetas/${category}/${image.name}`).put(image);
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
                        .ref(`recetas/${category}`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log("category ID", categoryID);
                            firebase.db.collection("recetas").doc(categoryID).collection(category).add({
                                descripcion: description,
                                titulo: title,
                                image: url
                            })
                            .then(docRef => {
                                ingredients.forEach(ing => {
                                    firebase.db.collection("recetas").doc(categoryID).collection(category).doc(docRef.id).collection("ingredientes").add({
                                        texto: ing.ingredient
                                    })
                                });
                                steps.forEach(step => {
                                    firebase.db.collection("recetas").doc(categoryID).collection(category).doc(docRef.id).collection("proceso").add({
                                        texto: step.step
                                    })
                                });
                                notes.forEach(note => {
                                    firebase.db.collection("recetas").doc(categoryID).collection(category).doc(docRef.id).collection("notas").add({
                                        texto: note.note
                                    })
                                });
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
                    <TextField placeholder="Agregar url.."/>
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
