import React from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';

//MaterialUI
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

//Responsive
import { useMediaQuery } from 'react-responsive'

const useStyles = makeStyles((theme) =>({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 40px',
        [theme.breakpoints.down('768')]: {
            padding: '20px 10px'
        }
    },
    productTitle: {
        color: 'white',
        fontSize: '100px',
        fontWeight: 'bold',
        [theme.breakpoints.down('768')]: {
            fontSize: '75px',
            textAlign: 'center !important'
        }
    },
    productWeight: {
        color: 'white'
    },
    productPhrase: {
        color: 'white',
    },
    productBenefits: {
        color: 'white',
        fontSize: '25px',
    
    }
}));

const WhiteButton = withStyles((theme) => ({
  root: {
    color: 'black',
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "100px",
    transition: "transform 450ms",
    fontWeight: "bolder",
    padding: "10px 20px",
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: "rgb(235,235,235)",
      transform: "scale(1.08)",
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: "rgb(235,235,235)",
      border: 'none',
    },
    '&:focus': {
      backgroundColor: "rgb(235,235,235)",
    },
    '&:disabled': {
        opacity: '0.7',
        color: 'black'
    }
  },
}))(Button);

export default function ProductInfo({classes, position, benefits, type, phrase}) {
    classes = useStyles();
    const isMobile = useMediaQuery({query: '(max-device-width: 992px)'});
    
    return (
        <div className={classes.container}>
            <div>
                <h1 className={classes.productTitle} style={{textAlign: isMobile ? "center" : position}}>{type}</h1>
                <h4 className={classes.productWeight} style={{textAlign: isMobile ? "center" : position}}>200gr / 300gr</h4>
            </div>
            <h3 className={classes.productPhrase} style={{textAlign: isMobile ? "center" : position}}>{phrase}</h3>
            <div>
                {benefits.map((b) => (
                    <p className={classes.productBenefits} style={{textAlign: isMobile ? "center" : position}}><CheckRoundedIcon style={{fontSize: '30px'}}/>{b}</p>
                ))}
            </div>
            {/* <div style={{textAlign: position}}>
                <WhiteButton>
                    Ver recetas
                </WhiteButton>
            </div> */}
        </div>
    )
}
