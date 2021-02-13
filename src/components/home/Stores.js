import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import firebase from '../../database/firebase';
import { Col, Row } from 'react-bootstrap';

const useStyles = makeStyles((theme) =>({
    title: {
        textAlign: 'center',
        marginBottom: '100px '
    },
    logoImg: {
        width: '60%',
        margin: 'auto'
    },
    logoContainer: {
        textAlign: 'center',
        marginBottom: '50px'
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
        <div id={"tiendas"}>
            <h1 className={classes.title}>¿Dónde nos encontramos?</h1>
            <Row>
                {stores && stores.map(store => (
                    <Col sm={6} lg={3}>
                    
                        <div className={classes.logoContainer}>
                            <img className={classes.logoImg} src={store.image} onClick={() => {
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
