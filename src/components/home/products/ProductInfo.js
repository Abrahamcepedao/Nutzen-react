import React from 'react';

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
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
        fontSize: '75px',
        fontWeight: 'bold',
        [theme.breakpoints.down('768')]: {
            fontSize: '45px',
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


export default function ProductInfo({classes, position, benefits, type, phrase}) {
    classes = useStyles();
    const isMobile = useMediaQuery({query: '(max-device-width: 992px)'});
    
    return (
        <div className={classes.container}>
            <div>
                <h1 className={classes.productTitle} style={{textAlign: isMobile ? "center" : position}}>{type}</h1>
                {/* matcha 200gr $220 --- 200gr $105, 300gr $145 */}
                {type !== "matcha" &&
                    <h4 className={classes.productWeight} style={{textAlign: isMobile ? "center" : position}}>200gr / 300gr</h4>
                }
                
                
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
