import React, { useState, useEffect } from 'react';
import firebase from "../../database/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";
import { Redirect } from 'react-router-dom';

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

        if(categoryId){
            firebase.db.collection("recetas").doc(categoryId).collection("listaRecetas").doc(recipyId).onSnapshot(snapshot => {
                setTitle(snapshot.data().titulo);
                setDescription(snapshot.data().descripcion);
                setImage(snapshot.data().image);
            })
            //ingredientes
            firebase.db.collection("recetas").doc(categoryId).collection("listaRecetas").doc(recipyId).collection("ingredientes").onSnapshot(doc => {
                const ing = [];
                doc.docs.forEach(ingrediente => {
                    const data = {
                        texto: ingrediente.data().texto,
                        id: ingrediente.id
                    }
                    ing.push(data);
                })
                setIngredients(ing);
            })
            

            //proceso
            firebase.db.collection("recetas").doc(categoryId).collection("listaRecetas").doc(recipyId).collection("proceso").onSnapshot(doc => {
                const pro = [];
                doc.docs.forEach(proceso => {
                    const data = {
                        texto: proceso.data().texto,
                        id: proceso.id
                    }
                    pro.push(data);
                })
                setSteps(pro);
            })

            //notas
            firebase.db.collection("recetas").doc(categoryId).collection("listaRecetas").doc(recipyId).collection("notas").onSnapshot(doc => {
                const not = [];
                doc.docs.forEach(nota => {
                    const data = {
                        texto: nota.data().texto,
                        id: nota.id
                    }
                    not.push(data);
                })
                setNotes(not);
            })
        }

        

    }, [])

    if(!categoryId){ return (<Redirect to="/recetas"/>) }

    return (
        <div>
            <h1>Receta posts</h1>
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={image}/>
            <p>Ingredientes</p>
            <ul>
                {ingredients && ingredients.map(item => (
                    <li key={item.id}>{item.texto}</li>
                ))}
            </ul>
            <p>Proceso</p>
            <ul>
                {steps && steps.map(item => (
                    <li key={item.id}>{item.texto}</li>
                ))}
            </ul>
            <p>Notas</p>
            <ul>
                {notes && notes.map(item => (
                    <li key={item.id}>{item.texto}</li>
                ))}
            </ul>
        </div>
    )
}

export default RecetaPost
