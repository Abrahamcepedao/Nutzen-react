import React, { useState, useEffect } from 'react';
import firebase from "../../database/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

const useStyles = makeStyles((theme) => ({
  recipeContainer: {
      width: "200px",
      height: "200px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "transform 450ms",
      '&:hover': {
          transform: "scale(1.08)"
      }
  }
}));


function RecetaRow({category, id, classes}) {
    const [recipes, setRecipes] = useState([]);
    const [{categoryId, categoryTitle, recipyId}, dispatch] = useDataLayerValue();
    classes = useStyles();
    
    useEffect(() => {
        firebase.db.collection("recetas").doc(id).collection(category).onSnapshot(snapshot => {
            const rec = []; // recipes
            snapshot.docs.forEach(doc => {
                const data = {
                    titulo: doc.data().titulo,
                    image: doc.data().image,
                    id: doc.id
                }
                rec.push(data);
            })
            console.log("recipes", rec);
            setRecipes(rec);
        })
    },[])

    const setRecipy = (recipyId) => {
        dispatch({
            type: "SET_CATEGORY_ID",
            categoryId: id,
        })
        dispatch({
            type: "SET_CATEGORY_TITLE",
            categoryTitle: category,
        })
        dispatch({
            type: "SET_RECIPY_ID",
            recipyId: recipyId,
        })
    }

    return (
        <div>
            <h2 style={{color: "black",  textAlign: "left"}}>{category}</h2>
            <div>
                {recipes && recipes.map((item) => (
                    <Link to="/receta-post" onClick={() => setRecipy(item.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${item.image})`}}
                            >
                            <h2>{item.titulo}</h2>
                        </div>
                    </Link>
                    
                ))}
            </div>
        </div>
    )
}

export default RecetaRow
