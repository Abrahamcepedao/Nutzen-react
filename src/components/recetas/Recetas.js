import React, { useEffect, useState} from 'react';
import firebase from "../../database/firebase";

//Components
import Header from '../home/others/Header';
import RecetaRow from "./RecetaRow";
import Footer from '../home/others/Footer';

//Material UI
import { makeStyles } from "@material-ui/core/styles";

//Colors
import { PRIMARY, BLACK_BUTTON_PRIMARY } from "../../resources/Colors";
import GoBack from '../home/others/GoBack';

const useStyles = makeStyles((theme) =>({
    background: {
        width: '100vw',
        height: '100vh',
        minHeight: '800px',
        backgroundImage: "url(./img/home/landing/background.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.up('992')]: {
            backgroundAttachment: 'fixed',
            minHeight: '500px'
        },
        zIndex: '1',
    },
    backgroundOverlay: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '800px',
        zIndex: '1',
        backgroundImage: `linear-gradient(to bottom, rgba(225, 210, 186, 0.75)0%, rgba(225, 210, 186, 0.5)50%, ${PRIMARY} 80%)`,
        [theme.breakpoints.up('992')]: {
            minHeight: '500px'
        },
    },
    backgroundInnerContainer: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%,-40%)',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '75px',
        color: BLACK_BUTTON_PRIMARY,
        textAlign: 'center',
        [theme.breakpoints.down('768')]: {
            fontSize: '35px'
        }
    },
    recipesContainer: {
        position: 'relative',
        top: '-200px',
        marginBottom: '-200px',
        padding: '50px 20px',
        zIndex: '2',
        backgroundColor: PRIMARY,
        borderBottom: `2px solid ${BLACK_BUTTON_PRIMARY}`
    } 

}));

function Recetas({classes}) {
    const [categories, setCategories] = useState([]);
    classes = useStyles();
    useEffect(() => {
        firebase.db.collection("recetas").onSnapshot(querySnapshot => {
            const cat = []; // categories
            querySnapshot.docs.forEach(doc => {
                const data = {
                    titulo: doc.data().titulo,
                    displayTitle: doc.data().displayTitle,
                    id: doc.id
                }
                cat.push(data);
            })
            //console.log("categories", cat)
            setCategories(cat);
        })
    },[])


    return (
        <div>
            {/* header */}
            <div className={classes.background}>
                <div className={classes.backgroundOverlay}>
                    <Header/>
                    <div className={classes.backgroundInnerContainer}>
                        <h1 className={classes.title}>Descubre nuestras recetas</h1>
                    </div>
                </div>
                
            </div>
            
            {/* Recipes */}
            <div className={classes.recipesContainer}>
                {/* Receta Row */}
                {categories  && categories.map((category) => (
                    <RecetaRow category={category.displayTitle} id={category.id}/>
                ))}
            </div>
            
            {/* Footer */}
            <Footer/>

            {/* Goback */}
            <GoBack/>
        </div>
    )
}

export default Recetas;
