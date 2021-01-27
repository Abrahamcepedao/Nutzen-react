import React, { useState, useEffect } from 'react';
import firebase from "../../database/firebase";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  recipyContainer: {
    backgroundColor: 'rgba(250,250,250,0.45)',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '5px',
    borderRadius: '5px'
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
    }
}));

function RecetaRow({category, id, classes}) {
    classes = useStyles();
    const [recipes, setRecipes] = useState([]);
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
            setRecipes(rec);
        })
    },[])

    const removeRecipy = (recipyID) => {
        firebase.db.collection("recetas").doc(id).collection(category).doc(recipyID).delete();
    }

    return (
        <div>
            <p style={{fontWeight: "bold",  textAlign: "left"}}>{category}</p>
            {recipes && recipes.map((recipy) => (
                <div className={classes.recipyContainer} key={recipy.id}>
                    {/* image */}
                    <div className={classes.image} style={{backgroundImage: `url(${recipy.image})`}}></div>
                    {/* Title */}
                    <div style={{flex: '1'}}>
                        <p className={classes.recipyTitle}>{recipy.titulo}</p>
                    </div>
                    {/* TrashCan */}
                    <div>
                        <DeleteIcon onClick={() => removeRecipy(recipy.id)} className={classes.trashIcon}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecetaRow;
