import React, { useState, useEffect } from 'react';
import firebase from "../../database/firebase";

import { useDataLayerValue } from "../../ContextAPI/DataLayer";
import { Redirect } from 'react-router-dom';


//Material UI
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import PlaylistAddCheckRoundedIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import { makeStyles } from "@material-ui/core/styles";

//Colors
import { PRIMARY, BLACK_BUTTON_PRIMARY } from "../../resources/Colors";

//Device detect
import { isDesktop } from 'react-device-detect'

//Components
import Footer from '../home/others/Footer';
import Header from '../home/others/Header';
import { Col, Row } from 'react-bootstrap';
import GoBack from '../home/others/GoBack';

const useStyles = makeStyles((theme) => ({
  container: {
    background: PRIMARY,
    borderBottom: `2px solid ${BLACK_BUTTON_PRIMARY}`
  },
  background: {
        width: '100vw',
        height: '100vh',
        minHeight: '600px',
        backgroundImage: "url(./img/home/landing/background.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.up('992')]: {
            minHeight: '800px'
        },
        zIndex: '1',
    },
    backgroundOverlay: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '800px',
        [theme.breakpoints.up('992')]: {
            minHeight: '600px'
        },
        zIndex: '1',
        backgroundImage: `linear-gradient(to bottom, rgba(225, 210, 186, 0.75)0%, rgba(225, 210, 186, 0.5)50%, ${PRIMARY} 80%)`,
    },
    backgroundInnerContainer: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%,-40%)',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '75px',
        color: 'black',
        textAlign: 'center',
        [theme.breakpoints.down('768')]: {
            fontSize: '35px'
        }
    },
    recipyContainer: {
        zIndex: '2',
        position: 'relative',
        top: '-200px',
        width: '90%',
        maxWidth: '1000px',
        margin: 'auto',
        padding: '50px',
        borderRadius: '25px',
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255, 1)70%, rgba(255,255,255, 0.5)100%)`,
        [theme.breakpoints.down('768')]: {
            marginBottom: '-150px'
        }
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: '25px'
    },
    subtitleIcon: {
        fontSize: '30px'
    },
    processContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    textItem: {
        fontSize: "20px"
    },
    number: {
        position: "relative",
        top: "5px",
        fontSize: '22px',
        fontWeight: 'bold',
        marginRight: '10px',
        borderBottom: `10px solid ${PRIMARY}`,
        lineHeight: '10px'
    }
}));

function RecetaPost({classes}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [notes, setNotes] = useState([]);
    
    const [{categoryId, categoryTitle, recipyId}] = useDataLayerValue();
    
    classes = useStyles();

    useEffect(() => {
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

        

    }, [categoryId, categoryTitle, recipyId])

    if(!categoryId){ return (<Redirect to="/recetas"/>) }

    return (
        <>
            <div className={classes.container}>
                {/* Header */}
                <div className={classes.background} style={{backgroundImage: `url(${image})`, backgroundAttachment: isDesktop && "fixed"}}>
                    <div className={classes.backgroundOverlay}>
                        <Header/>
                        <div className={classes.backgroundInnerContainer}>
                            <h1 className={classes.title}>{title}</h1>
                        </div>
                    </div>
                    
                </div>

                {/* Body */}
                <div className={classes.recipyContainer}>
                    
                    
                    <p style={{textAlign: 'center', fontWeight: 'bolder', fontSize: '25px'}}><FormatQuoteRoundedIcon style={{fontSize: '50px', textAlign: 'center', margin: 'auto'}}/>{description}</p>
                    <Row style={{marginBottom: '30px'}}>
                        <Col md={6}>
                            <p className={classes.subTitle}><KitchenRoundedIcon className={classes.subtitleIcon}/>Ingredientes</p>
                                {ingredients && ingredients.map(item => (
                                    <p key={item.id} className={classes.textItem}><FiberManualRecordRoundedIcon style={{fontSize: '30px'}}/> {item.texto}</p>
                                ))}
                        </Col>
                        <Col md={6}>   
                            <p className={classes.subTitle}><FormatListBulletedRoundedIcon className={classes.subtitleIcon}/> Proceso</p>
                                {steps && steps.map((item, i) => (
                                    <div key={item.id} className={classes.processContainer}>
                                        <p className={classes.number}>{i+1}</p>
                                        <p className={classes.textItem}>{item.texto}</p>
                                    </div>
                                ))}
                        </Col>
                    </Row>
                    
                    
                    <p className={classes.subTitle}><PlaylistAddCheckRoundedIcon className={classes.subtitleIcon}/> Notas</p>
                        {notes && notes.map(item => (
                            <p key={item.id} className={classes.textItem}><FiberManualRecordRoundedIcon style={{fontSize: '30px'}}/> {item.texto}</p>
                        ))}
                </div>
            </div>
            {/* Footer */}
            <Footer/>

            {/* GoBack */}
            <GoBack/>
        </>
    )
}

export default RecetaPost
