import React from 'react'

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';

//Link
import { HashLink } from 'react-router-hash-link';


const useStyles = makeStyles((theme) =>({
    container: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "999999"
    },
    arrowIcon: {
        color: "black",
        fontSize: "35px",
        transition: "transform 450ms",
        '&:hover': {
            transform: "scale(1.2)",
        }
    }
}))

export default function GoBack({classes}) {
    classes = useStyles();

    return (
        <div className={classes.container}>
            <HashLink smooth to="#header">
                <KeyboardArrowUpRoundedIcon className={classes.arrowIcon}/>
            </HashLink>
        </div>
    )
}
