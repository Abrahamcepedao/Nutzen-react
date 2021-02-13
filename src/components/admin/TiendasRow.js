import React, { useState } from 'react';

//Firebase
import firebase from "../../database/firebase";

//MaterialUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';

//MaterialUI - icons
import DeleteIcon from '@material-ui/icons/Delete';

//Colors
import { PRIMARY,  
        BLACK_BUTTON_PRIMARY, 
        BLACK_BUTTON_SECONDARY, 
        RED_BUTTON_PRIMARY, 
        RED_BUTTON_SECONDARY
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


const BlackButton = withStyles(() => ({
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


function TiendaRow({tiendaImg, id, classes}) {
    classes = useStyles();

    //collapse
    const [response, setResponse] = useState(false);

    

    const handleDeleteChange = () => {
        setResponse(!response);
    }

    const removeCategory = () => {
        firebase.db.collection("tiendas").doc(id).delete();
    }

    return (
        <div>
            <div className={classes.recipyContainer}>

                {/* Recipy data */}
                <div  className={classes.recipyInnerContainer} style={{marginBottom: response && "20px"}}>
                    {/* Title */}
                    <div  style={{flex: '1', textAlign: 'left'}}>
                        <img style={{width: '50px'}} src={tiendaImg}/>
                    </div>
                    {/* TrashCan Icon */}
                    <div>
                        <DeleteIcon onClick={() => handleDeleteChange()} className={classes.trashIcon}/>
                    </div>
                </div>

                {/* Collapse Delete */}
                <Collapse in={response} >
                        <h5>¿Estas segura de borrar la tienda mamita?</h5>

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

export default TiendaRow;
