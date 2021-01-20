import React from 'react'
import { Redirect } from "react-router-dom";
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

function Blog() {
    const [{user}] = useDataLayerValue();
    
    return (
        <div>
            {user ? (
                <h1>Admin blog</h1>
            ) : (
                <Redirect to="/login"/>
            )}
        </div>
    )
}

export default Blog
