import React from 'react';

//Link
import { Link } from "react-router-dom";

//MaterialUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Button } from '@material-ui/core'

//Colors
import { PRIMARY,  
        BLACK_BUTTON_PRIMARY, 
        BLACK_BUTTON_SECONDARY,  
} from "../../../resources/Colors";

//Bootstrap
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) =>({
    backgroundContainer: {
        width: '100vw',
        background: PRIMARY,
        padding: '50px'
    },
    logoImg: {
        width: '200px'
    },
    infoContainer: {
        textAlign: 'center'
    },
    socialIcons: {
        fontSize: '45px',
        cursor: 'pointer',
        transition: 'transform 500ms',
        '&:hover': {
            transform: 'scale(1.2)'
        }
    },
    recetasLink: {
        '&:hover': {
            textDecoration: 'none'
        }
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

function Footer({classes}) {
    classes = useStyles();
    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
    };

    return (
        <div className={classes.backgroundContainer}>
            <Row>
                <Col sm={6} md={3} className={classes.infoContainer}>
                    <img alt="Nutzen" className={classes.logoImg} src="./img/home/landing/logo.png"/>
                </Col>
                <Col sm={6} md={3} className={classes.infoContainer}>
                    <p><PhoneIphoneIcon/> (999) 908 8092</p>
                    <p><MailIcon/> admin@nutzen.mx</p>
                </Col>
                <Col sm={6} md={3} className={classes.infoContainer}>
                    <Link to="/recetas" className={classes.recetasLink}>
                        <BlackButton>Ver recetas</BlackButton>
                    </Link>
                </Col>
                <Col sm={6} md={3} className={classes.infoContainer}>
                    <div className={classes.menuItemContainerSocial}>
                        <InstagramIcon 
                            className={classes.socialIcons} 
                            style={{marginRight: '10px'}}
                            onClick={() => {openInNewTab("https://www.instagram.com/nutzenmx/")}}
                        />
                        <FacebookIcon 
                            className={classes.socialIcons}
                            onClick={() => {openInNewTab("https://www.facebook.com/nutzenmx/")}}
                        />
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

export default Footer;
