import React, { useState, useEffect } from 'react';
import firebase from '../../database/firebase';

function Stores() {
    const [stores, setStores] = useState([]);

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
            <h1>¿Dónde nos encontramos?</h1>
            {stores && stores.map(store => (
                <div>
                    <img src={store.image} onClick={() => {
                        openInNewTab(
                          store.url
                        );
                      }}/>
                </div>
            ))}
        </div>
    )
}

export default Stores
