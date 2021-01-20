import React from 'react';
import { Redirect } from "react-router-dom";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

function Tiendas() {
    const [{user}] = useDataLayerValue();
    
    return (
        <div>
            {user ? (
                <h1>Admin tiendas</h1>
            ) : (
                <Redirect to="/login"/>
            )}
        </div>
    )
}

export default Tiendas
