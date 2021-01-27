import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { PRIMARY, TEXT_COLOR } from "../../resources/Colors";
import { Link } from "react-router-dom";

import HomeIcon from '@material-ui/icons/Home';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
/* import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'; */
import StorefrontIcon from '@material-ui/icons/Storefront';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    backgroundContainer: {
        backgroundColor: PRIMARY,
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        height: '100px',
        paddingTop: '20px',
        paddingBottom: '20px',
        textAlign: 'center',
        marginBottom: '30px'
    },
    itemsContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(250,250,250,0.25)',
        width: '90%',
        maxWidth: '600px',
        margin: 'auto',
        borderRadius:  '15px',
        padding: '10px'
    },
    itemLink: {
        color: TEXT_COLOR,
        '&:hover': {
            color:  TEXT_COLOR,
            textDecoration: 'none'
        }
    },
    item: {
        padding: '5px',
        '&:hover': {
            backgroundColor: 'rgba(250,250,250,0.45)',
            borderRadius: '5px',
        }
    },
    itemLabel: {
        marginBottom: '0px'
    }
}));

function Header({classes}) {
    classes = useStyles();

    return (
        <div className={classes.backgroundContainer}>
            <div className={classes.itemsContainer}>
                <Link className={classes.itemLink}  to="/admin">
                    <div className={classes.item}>
                        <HomeIcon className={classes.itemIcon}/>
                        <p className={classes.itemLabel}>Inicio</p>
                    </div>
                </Link>
                <Link className={classes.itemLink}  to="/admin/recetas">
                    <div className={classes.item}>
                        <RestaurantMenuIcon className={classes.itemIcon}/>
                        <p className={classes.itemLabel}>Recetas</p>
                    </div>
                </Link>
                <Link className={classes.itemLink}  to="/admin/tiendas">
                    <div className={classes.item}>
                        <StorefrontIcon className={classes.itemIcon}/>
                        <p className={classes.itemLabel}>Tiendas</p>
                    </div>
                </Link>
                <Link className={classes.itemLink}  to="/admin/frase">
                    <div className={classes.item}>
                        <CreateIcon className={classes.itemIcon}/>
                        <p className={classes.itemLabel}>frase</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
