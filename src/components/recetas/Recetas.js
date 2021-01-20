import React, { useEffect, useState} from 'react';
import firebase from "../../database/firebase";
import RecetaRow from "./RecetaRow";


function Recetas() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        firebase.db.collection("recetas").onSnapshot(querySnapshot => {
            const cat = []; // categories
            querySnapshot.docs.forEach(doc => {
                const data = {
                    titulo: doc.data().titulo,
                    color: doc.data().color,
                    id: doc.id
                }
                cat.push(data);
            })
            console.log("categories", cat)
            setCategories(cat);
        })
    },[])


    return (
        <div>
            <h1>Recetas</h1>
            {/* Receta Row */}
            {categories  && categories.map((category) => (
                <div>
                    <RecetaRow category={category.titulo} id={category.id}/>
                </div>
            ))}
        </div>
    )
}

export default Recetas;
