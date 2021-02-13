import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import firebase from '../../database/firebase';
import { Col, Row } from 'react-bootstrap';

//Colors
import { PRIMARY } from "../../resources/Colors";

const useStyles = makeStyles((theme) =>({
    backgroundContainer: {
        paddingTop: '50px',
        paddingBottom: '20px'
    },
    title: {
        textAlign: 'center',
        marginBottom: '100px ',
        fontWeight: 'bold'
    },
    logosContainer: {
        width: '100%',
        maxWidth: '1200px',
        margin: 'auto',
        background: 'none'
    },
    logoImg: {
        width: '90%',
        margin: 'auto'
    },
    logoContainer: {
        textAlign: 'center',
        marginBottom: '50px',
        background: PRIMARY,
        width: '100%',
        margin: 'auto',
        padding: '20px',
        borderRadius: '10px'
    }
}));


function Stores({classes}) {
    const [stores, setStores] = useState([]);
    classes = useStyles();
    useEffect(() => {
        firebase.db.collection("tiendas").onSnapshot(snapshot => {
            const strs = []; //store
            snapshot.forEach(doc => {
                const data = {
                    image: doc.data().image,
                    url: doc.data().url,
                    id: doc.id
                }
                strs.push(data);
            })
            setStores(strs);
        })
    }, [])

    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    return (
        <div id={"tiendas"} className={classes.backgroundContainer}>
            <h1 className={classes.title}>¿Dónde nos encontramos?</h1>
            <Row className={classes.logosContainer}>
                {stores && stores.map(store => (
                    <Col sm={6} lg={3}>
                    
                        <div className={classes.logoContainer}>
                            <img alt="Logo tienda" className={classes.logoImg} src={store.image} onClick={() => {
                                openInNewTab(
                                store.url
                                );
                            }}/>
                        </div>
                    </Col>
                ))}
            </Row>
            
        </div>
    )
}

export default Stores
