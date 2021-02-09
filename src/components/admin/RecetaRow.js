import React, { useState, useEffect } from 'react';

//Firebase
import firebase from "../../database/firebase";

//MaterialUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, TextField, FormControl } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';

//MaterialUI - icons
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

//Colors
import { PRIMARY,  
        BLACK_BUTTON_PRIMARY, 
        BLACK_BUTTON_SECONDARY, 
        RED_BUTTON_PRIMARY, 
        RED_BUTTON_SECONDARY, 
        GREEN_BUTTON_PRIMARY,
        GREEN_BUTTON_SECONDARY  
} from "../../resources/Colors";

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

const GreenButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: GREEN_BUTTON_PRIMARY,
    borderRadius: "100px",
    transition: "transform 450ms",
    fontWeight: "bolder",
    padding: "10px 20px",
    margin: 'auto',
    marginBottom: '20px',
    width: '80%',
    '&:hover': {
      backgroundColor: GREEN_BUTTON_SECONDARY,
      transform: "scale(1.08)",
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: GREEN_BUTTON_SECONDARY,
      border: 'none',
    },
    '&:focus': {
      backgroundColor: GREEN_BUTTON_SECONDARY,
    },
    '&:disabled': {
        opacity: '0.7',
        color: 'black'
    }
  },
}))(Button);

const MyTextField = withStyles({
  root: {
    marginBottom: '20px',
    width: '100%',
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black'
      },
    },
  },
})(TextField);

function RecetaRow({category, id, classes}) {
    classes = useStyles();

    //recipes
    const [recipes, setRecipes] = useState([]);

    //respone
    const [response, setResponse] = useState([]);
    const [edit, setEdit] = useState([]);

    //new recipy info
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    //error and succes
    const [editError, setEditError] = useState('');
    const [editSuccess, setEditSuccess] = useState('');

    useEffect(() => {
        firebase.db.collection("recetas").doc(id).collection("listaRecetas").onSnapshot(snapshot => {
            const rec = []; // recipes
            const res = []; // response
            const ed = []; // edit
            snapshot.docs.forEach(doc => {
                const data = {
                    titulo: doc.data().titulo,
                    image: doc.data().image,
                    description: doc.data().descripcion,
                    id: doc.id
                }
                rec.push(data);

                const resData = {
                    state: false,
                }
                const editdata = {
                    status: false,
                }
                res.push(resData);
                ed.push(editdata);

                //set title
                setTitle(data.titulo);
                //set descripcion
                setDescription(data.description);
            })
            setRecipes(rec);
            setResponse(res);
            setEdit(ed);
        })
    },[])

    const handleChange = (index) => {
        const data = [...response];
        data[index].state = !response[index].state;
        setResponse(data);

        const otherData = [...edit];
        otherData[index].status = false;
        setEdit(otherData);
    }

    const handlEditChange = (index) => {
        const data = [...edit];
        data[index].status = !edit[index].status;
        setEdit(data);

        const otherData = [...response];
        otherData[index].state = false;
        setResponse(otherData);
    }

    const removeRecipy = (recipyID) => {
        firebase.db.collection("recetas").doc(id).collection("listaRecetas").doc(recipyID).delete();
    }

    const updateRecipy = (recipyID) => {
        if(title && description){
            firebase.db.collection("recetas").doc(id).collection("listaRecetas").doc(recipyID).set({
                titulo: title,
                descripcion: description
            },{
                merge: true,
            });
            setTitle('');
            setDescription('');
            setEditSuccess("Ya se actualizó rouss");
        } else{
            setEditError("Llena todos los datos mamita")
        }
        
    }

    return (
        <div>
            <p style={{fontWeight: "bold",  textAlign: "left"}}>{category}</p>
            {recipes && recipes.map((recipy, index) => (
                <div className={classes.recipyContainer} key={recipy.id}>

                    {/* Recipy data */}
                    <div  className={classes.recipyInnerContainer}>
                        {/* image */}
                        <div className={classes.image} style={{backgroundImage: `url(${recipy.image})`}}></div>
                        {/* Title */}
                        <div style={{flex: '1'}}>
                            <p className={classes.recipyTitle}>{recipy.titulo}</p>
                        </div>
                        {/* Edit Icon */}
                        <div>
                            <CreateIcon onClick={() => handlEditChange(index)} className={classes.trashIcon}/>
                        </div>
                        {/* TrashCan */}
                        <div>
                            <DeleteIcon onClick={() => handleChange(index)} className={classes.trashIcon}/>
                        </div>
                    </div>

                    {/* Edit recipe */}
                    {edit.length != 0 && (
                        <Collapse in={edit[index].status} >
                                <h5>Edita la receta mamita</h5>
                                <FormControl style={{width: '90%'}}>
                                    <MyTextField 
                                        variant="outlined"
                                        id="custom-css-outlined-input"
                                        placeholder="Ingresa nuevo título mamitaa"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                    <MyTextField 
                                        variant="outlined"
                                        id="custom-css-outlined-input"
                                        placeholder="Ingresa nuevo descripción mamitaa"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </FormControl>
                                <div className={classes.btnsContainer}>
                                    <div>
                                        <BlackButton onClick={() => handlEditChange(index)}>
                                            Cancelar
                                        </BlackButton>
                                    </div>
                                    <div>
                                        <GreenButton onClick={() => updateRecipy(recipy.id)}>
                                            Actualizar
                                        </GreenButton>
                                    </div>
                                </div>
                                {editSuccess && (
                                    <h4 style={{fontWeight: 'bold'}}>{editSuccess}</h4>
                                )}
                                {editError && (
                                    <h4 style={{fontWeight: 'bold'}}>{editError}</h4>
                                )}
                        </Collapse>
                    )}

                    {/* Delete recipe */}
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
