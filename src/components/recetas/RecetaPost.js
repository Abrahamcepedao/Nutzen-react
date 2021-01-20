import React, { useState, useEffect } from 'react';
import firebase from "../../database/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

const useStyles = makeStyles((theme) => ({
  
}));

function RecetaPost({classes}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [notes, setNotes] = useState([]);
    
    const [{categoryId, categoryTitle, recipyId}, dispatch] = useDataLayerValue();
    
    useEffect(() => {
        console.log(categoryId);
        console.log(categoryTitle);
        console.log(recipyId);
        firebase.db.collection("recetas").doc(categoryId).collection(categoryTitle).doc(recipyId).onSnapshot(snapshot => {
            console.log(snapshot.data());
            setTitle(snapshot.data().titulo);
            setDescription(snapshot.data().descripcion);
            setImage(snapshot.data().image);
            
            //ingredientes
            firebase.db.collection("recetas").doc(categoryId).collection(categoryTitle).doc(recipyId).collection("ingredientes").onSnapshot(doc => {
                const ing = [];
                doc.docs.forEach(ingrediente => {
                    const data = {
                        texto: ingrediente.data().texto
                    }
                    ing.push(data);
                })
                console.log(ing);
                setIngredients(ing);
            })
            

            //proceso
            firebase.db.collection("recetas").doc(categoryId).collection(categoryTitle).doc(recipyId).collection("proceso").onSnapshot(doc => {
                const pro = [];
                doc.docs.forEach(proceso => {
                    const data = {
                        texto: proceso.data().texto
                    }
                    pro.push(data);
                })
                setSteps(pro);
            })
            console.log(steps)

            //notas
            firebase.db.collection("recetas").doc(categoryId).collection(categoryTitle).doc(recipyId).collection("notas").onSnapshot(doc => {
                const not = [];
                doc.docs.forEach(nota => {
                    const data = {
                        texto: nota.data().texto
                    }
                    not.push(data);
                })
                setNotes(not);
            })
            console.log(notes);
        })
    }, [])

    return (
        <div>
            <h1>Receta posts</h1>
        </div>
    )
}

export default RecetaPost
