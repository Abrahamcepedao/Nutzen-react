import React, { useState, useEffect } from 'react';

//Firebase
import firebase from "../../database/firebase";

//MaterialUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';

//MaterialUI - icons
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

//Colors
import { PRIMARY, BLACK_BUTTON_PRIMARY, BLACK_BUTTON_SECONDARY, RED_BUTTON_PRIMARY, RED_BUTTON_SECONDARY } from "../../resources/Colors";

const useStyles = makeStyles((theme) => ({
  recipyContainer: {
    backgroundColor: 'rgba(250,250,250,0.45)',
    marginBottom: '10px',
    padding: '5px',
    borderRadius: '5px'
  },
  recipyInnerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
      width: '60px',
      height:  '60px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      borderRadius: '5px',
      marginRight: '15px'
  },
  recipyTitle: {
      position: 'relative',
      top: '7px',
      fontWeight: 'bold',
      textAlign: 'left'
  },
  trashIcon: {
        position: 'relative',
        fontSize: '35px',
        cursor: 'pointer',
        transition: 'transform 450ms',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
    btnsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
}));


const BlackButton = withStyles((theme) => ({
  root: {
    color: PRIMARY,
    backgroundColor: BLACK_BUTTON_PRIMARY,
    borderRadius: "100px",
    transition: "transform 450ms",
    fontWeight: "bolder",
    padding: "10px 20px",
    margin: 'auto',
    marginBottom: '20px',
    width: '80%',
    '&:hover': {
      backgroundColor: BLACK_BUTTON_SECONDARY,
      transform: "scale(1.08)",
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: BLACK_BUTTON_SECONDARY,
      border: 'none',
    },
    '&:focus': {
      backgroundColor: BLACK_BUTTON_SECONDARY,
    },
    '&:disabled': {
        opacity: '0.7',
        color: 'black'
    }
  },
}))(Button);

const RedButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: RED_BUTTON_PRIMARY,
    borderRadius: "100px",
    transition: "transform 450ms",
    fontWeight: "bolder",
    padding: "10px 20px",
    margin: 'auto',
    marginBottom: '20px',
    width: '80%',
    '&:hover': {
      backgroundColor: RED_BUTTON_SECONDARY,
      transform: "scale(1.08)",
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: RED_BUTTON_SECONDARY,
      border: 'none',
    },
    '&:focus': {
      backgroundColor: RED_BUTTON_SECONDARY,
    },
    '&:disabled': {
        opacity: '0.7',
        color: 'black'
    }
  },
}))(Button);

function RecetaRow({category, id, classes}) {
    classes = useStyles();

    //recipes
    const [recipes, setRecipes] = useState([]);

    //respone
    const [response, setResponse] = useState([]);

    useEffect(() => {
        firebase.db.collection("recetas").doc(id).collection(category).onSnapshot(snapshot => {
            const rec = []; // recipes
            const res = [];
            snapshot.docs.forEach(doc => {
                const data = {
                    titulo: doc.data().titulo,
                    image: doc.data().image,
                    id: doc.id
                }
                rec.push(data);

                const resData = {
                    state: false,
                }
                res.push(resData);
            })
            setRecipes(rec);
            setResponse(res);
        })
    },[])

    const handleChange = (index) => {
        const data = [...response];
        data[index].state = !response[index].state;
        setResponse(data);
    }

    const removeRecipy = (recipyID) => {
        firebase.db.collection("recetas").doc(id).collection(category).doc(recipyID).delete();
    }

    return (
        <div>
            <p style={{fontWeight: "bold",  textAlign: "left"}}>{category}</p>
            {recipes && recipes.map((recipy, index) => (
                <div className={classes.recipyContainer} key={recipy.id}>

                    {/* Recipy data */}
                    <div  className={classes.recipyInnerContainer} style={{marginBottom: response.length != 0 && response[index].state && "20px"}}>
                        {/* image */}
                        <div className={classes.image} style={{backgroundImage: `url(${recipy.image})`}}></div>
                        {/* Title */}
                        <div style={{flex: '1'}}>
                            <p className={classes.recipyTitle}>{recipy.titulo}</p>
                        </div>
                        {/* TrashCan */}
                        <div>
                            <DeleteIcon onClick={() => handleChange(index)} className={classes.trashIcon}/>
                        </div>
                    </div>

                    {/* Collapse */}
                    {response.length != 0 && (
                        <Collapse in={response[index].state} >
                                <h5>¿Estas segura de borrar la receta mamita?</h5>
                                <div className={classes.btnsContainer}>
                                    <div>
                                        <BlackButton onClick={() => handleChange(index)}>
                                            Cancelar
                                        </BlackButton>
                                    </div>
                                    <div>
                                        <RedButton onClick={() => removeRecipy(recipy.id)}>
                                            Eliminar
                                        </RedButton>
                                    </div>
                                </div>
                        </Collapse>
                    )}
                </div>
            ))}
        </div>
    )
}

export default RecetaRow;
