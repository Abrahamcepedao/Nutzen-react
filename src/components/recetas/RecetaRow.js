import React, { useState, useEffect } from 'react';
import firebase from "../../database/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

const useStyles = makeStyles((theme) => ({
  recipesContainer: {
    display: 'flex',
    overflowX: 'scroll',
    overflowY: 'visible'
  },
  recipeContainer: {
      width: "300px",
      height: "450px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "transform 450ms",
      borderRadius: '10px',
      marginRight: '20px',
      '&:hover': {
          transform: "scale(1.04)"
      },
      //boxShadow: '0 5px 10px rgb(25 25 25 / 25%), 0 10px 10px rgb(25 25 25 / 25%)'
  },
  recipyOverlay: {
    width: '300px',
    height: '450px',
    borderRadius: '10px',
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0)0%, rgb(0,0,0,0.8)100%)'
  },
  recipyLink: {
    '&:hover': {
          textDecoration: 'none !important'
      }
  },
  recipyTitle: {
      position: 'relative',
      top: '415px',
      left: '10px',
      color: 'white',
      fontWeight: 'bold',
      
  }
}));


function RecetaRow({category, id, classes}) {
    const [recipes, setRecipes] = useState([]);
    const [{},dispatch] = useDataLayerValue();
    classes = useStyles();
    
    useEffect(() => {
        firebase.db.collection("recetas").doc(id).collection("listaRecetas").onSnapshot(snapshot => {
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
    },[id])

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

    const calculateLength = (title) => {
        return (450 - 32 * (Math.floor(title.length / 20)+1))
    }

    return (
        <div style={{marginBottom: '50px'}}>
            <h2 style={{color: "black",  textAlign: "left", fontWeight: 'bold'}}>{category}</h2>
            <div className={classes.recipesContainer}>
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
                {recipes && recipes.map((recipy) => (
                    <Link to="/receta-post" className={classes.recipyLink} onClick={() => setRecipy(recipy.id)}>
                        <div 
                            className={classes.recipeContainer}
                            style={{backgroundImage: `url(${recipy.image})`}}
                            >
                                <div className={classes.recipyOverlay}>
                                    <h4 className={classes.recipyTitle} style={{top: calculateLength(recipy.titulo)}}>{recipy.titulo}</h4>
                                </div>
                            
                        </div>
                    </Link>
                    
                ))}
            </div>
        </div>
    )
}

export default RecetaRow
