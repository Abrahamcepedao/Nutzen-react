import React, { useState } from 'react';

//Firebase
import firebase from "../../database/firebase";

//MaterialUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, FormControl, TextField } from '@material-ui/core'
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

function CategoryRow({category, id, classes}) {
    classes = useStyles();
    //categories
    const [newCategory, setNewCategory] = useState('');

    //collapse
    const [response, setResponse] = useState(false);
    const [edit, setEdit] = useState(false);

    const handlEditChange = () => {
        setResponse(false);
        setEdit(!edit);
    }

    const handleDeleteChange = () => {
        setEdit(false);
        setResponse(!response);
    }

    const removeCategory = () => {
        firebase.db.collection("recetas").doc(id).delete();
    }

    const updateCategory = () => {
        firebase.db.collection("recetas").doc(id).set({
            displayTitle: newCategory
        },{
          merge: true
        })
    }

    return (
        <div>
            <div className={classes.recipyContainer}>

                {/* Recipy data */}
                <div  className={classes.recipyInnerContainer} style={{marginBottom: response && "20px"}}>
                    {/* Title */}
                    <div  style={{flex: '1'}}>
                        <h3 style={{fontWeight: "bold",  textAlign: "left"}}>{category}</h3>
                    </div>
                    {/* Edit Icon */}
                    <div>
                        <CreateIcon onClick={() => handlEditChange()} className={classes.trashIcon}/>
                    </div>
                    {/* TrashCan Icon */}
                    <div>
                        <DeleteIcon onClick={() => handleDeleteChange()} className={classes.trashIcon}/>
                    </div>
                </div>

                {/* Collapse Edit */}
                <Collapse in={edit} >
                        <h5>Cambia el nombre mamitaa</h5>
                        <form>
                            <FormControl  style={{width: '80%'}}>
                                <MyTextField variant="outlined" id="custom-css-outlined-input" placeholder="Ingresa nuevo nombre mamitaa" value={newCategory} onChange={e => setNewCategory(e.target.value)}/>
                            </FormControl>
                        </form>
                        <div className={classes.btnsContainer}>
                            <div>
                                <BlackButton onClick={() => handlEditChange()}>
                                    Cancelar
                                </BlackButton>
                            </div>
                            <div>
                                <GreenButton onClick={() => updateCategory()}>
                                    Actualizar
                                </GreenButton>
                            </div>
                        </div>
                </Collapse>

                {/* Collapse Delete */}
                <Collapse in={response} >
                        <h5>¿Estas segura de borrar la categoría mamita?</h5>

                        <div className={classes.btnsContainer}>
                            <div>
                                <BlackButton onClick={() => handleDeleteChange()}>
                                    Cancelar
                                </BlackButton>
                            </div>
                            <div>
                                <RedButton onClick={() => removeCategory()}>
                                    Eliminar
                                </RedButton>
                            </div>
                        </div>
                </Collapse>
            </div>
        </div>
    )
}

export default CategoryRow;
