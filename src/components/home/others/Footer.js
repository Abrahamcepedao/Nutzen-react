import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
//import { Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) =>({
    backgroundContainer: {
        width: '100vw',
        height: '100vh',
        minHeight: '800px',
        backgroundImage: "url(./img/home/landing/background.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.up('992')]: {
            backgroundAttachment: 'fixed'
        }
    },
}));


function Footer({classes}) {
    classes = useStyles();

    return (
        <div className={classes.backgroundContainer}>
            <h1>footer</h1>
        </div>
    )
}

export default Footer;
