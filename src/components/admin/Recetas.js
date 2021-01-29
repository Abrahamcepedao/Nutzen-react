import React, { useState, useEffect } from 'react';

//Firebase
import firebase from '../../database/firebase';

//MaterialUI
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { FormControl, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';

//Colors
import { PRIMARY, BLACK_BUTTON_PRIMARY, BLACK_BUTTON_SECONDARY } from "../../resources/Colors";

//DataLayer
import { useDataLayerValue } from "../../ContextAPI/DataLayer";

//Router
import { Redirect } from 'react-router-dom';

//Components
import Header from './Header';
import RecetaRow from './RecetaRow';
import CategoryRow from './CategoryRow';


//Styles
const useStyles = makeStyles((theme) => ({
    backgroundContainer: {
        backgroundColor: PRIMARY,
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        paddingBottom: '50px',
        textAlign: 'center',
    },
    formContainer: {
        width: '90%',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '100px',
        backgroundColor: 'rgba(250,250,250,0.25)',
        padding: '20px 50px',
        borderRadius: '12px',
        marginBottom: '50px'
    },
    textFieldContainer: {
        width: '100%',
        marginBottom: '20px'
    },
    formLabel: {
        textAlign: 'left',
        fontWeight:'bold'
    },
    trashIcon: {
        position: 'relative',
        fontSize: '35px',
        cursor: 'pointer',
        top: '-10px',
        transition: 'transform 450ms',
        '&:hover': {
            transform: 'scale(1.1)'
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

const MyTextField = withStyles({
  root: {
    marginBottom: '20px',
    width: '100%',
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black'
      },
    },
  },
})(TextField);




function Recetas({classes}) {
    classes = useStyles();
    
    //data layer
    const [{user}, dispatch] = useDataLayerValue();

    //recipy info
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient: ""}]);
    const [steps, setSteps] = useState([{step: ""}]);
    const [notes, setNotes] = useState([{note: ""}]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    //categories
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);

    //error
    const [recipyError, setRecipyError] = useState('');
    const [categoryError, setCategoryError] = useState('');

    //success
    const [catSucces, setCatSucces] = useState('');
    const [recipySucces, setRecipySucces] = useState('');

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
            setCategories(cat);
        })
    }, [])

    // handle input change
    const handleInputChange = (e, index) => {
        const list = [...ingredients];
        list[index].ingredient = e.target.value;
        setIngredients(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...ingredients];
        list.splice(index, 1);
        setIngredients(list);
        
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setIngredients([...ingredients, { ingredient: "" }]);
    };

    // handle input change - Steps
    const handleInputChangeSteps = (e, index) => {
        const list = [...steps];
        list[index].step = e.target.value;
        setSteps(list);
    };

    // handle click event of the Remove button - Steps
    const handleRemoveClickSteps = index => {
        const list = [...steps];
        list.splice(index, 1);
        setSteps(list);
    };

    // handle click event of the Add button - Steps
    const handleAddClickSteps = () => {
        setSteps([...steps, { step: "" }]);
    };

    // handle input change - Notes
    const handleInputChangeNotes = (e, index) => {
        const list = [...notes];
        list[index].note = e.target.value;
        setNotes(list);
    };

    // handle click event of the Remove button - Notes
    const handleRemoveClickNotes = index => {
        const list = [...notes];
        list.splice(index, 1);
        setNotes(list);
    };

    // handle click event of the Add button
    const handleAddClickNotes = () => {
        setNotes([...notes, { note: "" }]);
    };

    const addCategory = (event) => {
        event.preventDefault();
        var val = true;
        categories.map(cat => {
            if(cat.titulo === newCategory){
                val = false;
            }
        })
        if(val){
            firebase.db.collection("recetas").add({
                titulo: newCategory,
                displayTitle: newCategory,
            })
            setNewCategory("");
            setCatSucces("Ya se agregó la categoría mamitaa");
        } else{
            setCategoryError("¡Rouss checa que la nueva categoría no exista!");
        }
        
    }

    const checkBoxChange = (event) => {
        if(event.target.checked  && selectedCategories.indexOf(event.target.name) == -1){
            const data = selectedCategories;
            data.push(event.target.name);
            setSelectedCategories(data);
        } else{
            const data = selectedCategories;
            data.splice(data.indexOf(event.target.name),1)
            setSelectedCategories(data);
        }
    }

    const getCategoryID = (category) => {
        let categoryID = "";
        categories.map(cat => {
            if(cat.titulo === category){
                categoryID = cat.id;
            }
        })
        return categoryID;
    }

    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const validity = () => {
        /* <--title--> */
        if(!title){
            return false;
        }

        /* <--description--> */
        if(!description){
            return false;
        }

        /* <--ingredients--> */
        ingredients.map((ing, index) => {
            if(ing === ""){
                ingredients.splice(index, 1);
            }
        })
        if(ingredients.length === 0){
            return false;
        }

        /* <--steps--> */
        steps.map((step, index) => {
            if(step === ""){
                steps.splice(index, 1);
            }
        })
        if(steps.length === 0){
            return false;
        }

        /* <--notes--> */
        notes.map((note, index) => {
            if(note === ""){
                notes.splice(index, 1);
            }
        })
        if(steps.length === 0){
            return false;
        }

        /* <--selectedCategories--> */
        if(selectedCategories.length === 0){
            return false;
        }

        /* <--image--> */
        if(!image){
            return false;
        }

        /* everything ok */
        return true;
    }

    const handleUpload = () => {
        if(validity()){
            selectedCategories.forEach(category => {
                const categoryID = getCategoryID(category);
                const uploadTask = firebase.storage.ref(`recetas/${category}/${image.name}`).put(image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) =>  {
                        // progress  function
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress)
                    },
                    (error) => {
                        // error function
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        // complete function
                        firebase.storage
                            .ref(`recetas/${category}`)
                            .child(image.name)
                            .getDownloadURL()
                            .then(url => {
                                console.log("category ID", categoryID);
                                firebase.db.collection("recetas").doc(categoryID).collection("listaRecetas").add({
                                    descripcion: description,
                                    titulo: title,
                                    image: url
                                })
                                .then(docRef => {
                                    ingredients.forEach(ing => {
                                        firebase.db.collection("recetas").doc(categoryID).collection("listaRecetas").doc(docRef.id).collection("ingredientes").add({
                                            texto: ing.ingredient
                                        })
                                    });
                                    steps.forEach(step => {
                                        firebase.db.collection("recetas").doc(categoryID).collection("listaRecetas").doc(docRef.id).collection("proceso").add({
                                            texto: step.step
                                        })
                                    });
                                    notes.forEach(note => {
                                        firebase.db.collection("recetas").doc(categoryID).collection("listaRecetas").doc(docRef.id).collection("notas").add({
                                            texto: note.note
                                        })
                                    });
                                })
                            });
                    }
                )
            })
            //recetes values
            setRecipyError('');
            setProgress(0);
            setImage(null);
            setTitle('');
            setDescription('');
            setIngredients([{ingredient: ""}]);
            setSteps([{step: ""}]);
            setNotes([{note: ""}]);
            setSelectedCategories([]);
            setRecipySucces("Ya se agregó la receta mamitaa")
        } else{
            setRecipyError("¡Mamitaa recuerda poner toda la info!")
        }
    }

    if(!user){
        return (
            <Redirect to="/login"/>
        )
    }

    return (
        <div className={classes.backgroundContainer}>
            <Header/>
            <h1 style={{fontWeight: 'bold', marginBottom: '100px'}}>Sube aquí tus recetas mamita</h1>
            
            {/* Add  Category */}
            <form className={classes.formContainer}>
                <h3 style={{fontWeight: 'bold', marginBottom: '50px'}}>Agrega categorias rouss</h3>
                <FormControl style={{width: '100%'}}>
                    <MyTextField 
                        variant="outlined"
                        id="custom-css-outlined-input"
                        placeholder="Ingresa nueva categoria mamitaa"
                        value={newCategory}
                        onChange={(event) => setNewCategory(event.target.value)}
                    />
                </FormControl>
                <BlackButton 
                    onClick={addCategory}
                    disabled={!newCategory}
                >
                    Agregar
                </BlackButton>
                {catSucces && (
                    <h4 style={{fontWeight: 'bold'}}>{catSucces}</h4>
                )}
                {categoryError && (
                    <h4 style={{fontWeight: 'bold'}}>{categoryError}</h4>
                )}
            </form>

            {/* Add recipe */}
            <form className={classes.formContainer}>
                <h3 style={{fontWeight: 'bold', marginBottom: '50px'}}>Agrega recetas rouss</h3>
                <FormControl style={{width:'100%'}}>
                    <MyTextField variant="outlined" id="custom-css-outlined-input" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)}/>
                    <MyTextField variant="outlined" id="custom-css-outlined-input" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)}/>
                    <p className={classes.formLabel}>Ingredientes</p>
                    {ingredients.map((item, i) => {
                        return (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <MyTextField variant="outlined" id="custom-css-outlined-input" 
                                    placeholder="Escribe ingrediente mamita..."
                                    value={item.ingredient}
                                    onChange={e => handleInputChange(e, i)}
                                />
                                <DeleteIcon className={classes.trashIcon} onClick={e => handleRemoveClick(i)}/>
                            </div>
                        )
                    })}
                    <BlackButton onClick={handleAddClick}>
                        Add
                    </BlackButton>
                    
                    <p className={classes.formLabel}>Proceso</p>
                    {steps.map((item, i) => {
                        return (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <MyTextField variant="outlined" id="custom-css-outlined-input" 
                                    placeholder="Escribe paso mamita..."
                                    value={item.step}
                                    onChange={e => handleInputChangeSteps(e, i)}
                                />
                                <DeleteIcon className={classes.trashIcon} onClick={e => handleRemoveClickSteps(i)}/>
                            </div>
                        )
                    })}
                    <BlackButton onClick={handleAddClickSteps}>
                        Add
                    </BlackButton>
                    
                    <p className={classes.formLabel}>Notas</p>
                    {notes.map((item, i) => {
                        return (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <MyTextField variant="outlined" id="custom-css-outlined-input" 
                                    placeholder="Escribe nota mamita..."
                                    value={item.note}
                                    onChange={e => handleInputChangeNotes(e, i)}
                                />
                                <DeleteIcon className={classes.trashIcon} onClick={e => handleRemoveClickNotes(i)}/>
                            </div>
                        )
                    })}
                    <BlackButton onClick={handleAddClickNotes}>
                        Add
                    </BlackButton>
                    <p className={classes.formLabel}>Selecciona categorias doña rous</p>
                    <FormGroup>
                        {categories && categories.map((category) => (
                            <FormControlLabel
                                control={<Checkbox color="default" icon={<CheckBoxOutlineBlankIcon/>} checkedIcon={<CheckBoxIcon/>} onChange={checkBoxChange} name={category.titulo} />}
                                label={category.displayTitle}
                            />
                        ))}
                    </FormGroup>
                    <p className={classes.formLabel}>Selecciona una imagen doña rous</p>
                    <input style={{margin: 'auto', width: '100%', marginBottom: '20px', textAlign: 'center'}} type="file" onChange={handleImageChange}/>
                    <progress style={{margin: 'auto', width: '100%', marginBottom: '20px'}} value={progress} max="100"/>
                    <BlackButton onClick={handleUpload}>
                        Agregar receta
                    </BlackButton>
                    {recipySucces && (
                        <h4 style={{fontWeight: 'bold'}}>{recipySucces}</h4>
                    )}
                    {recipyError && (
                        <h4 style={{fontWeight: 'bold'}}>{recipyError}</h4>
                    )}
                </FormControl>
            </form>
            
            {/* Delete recipes */}
            <div className={classes.formContainer}>
                <h3 style={{fontWeight: 'bold', marginBottom: '50px'}}>Borra recetas rouss</h3>
                <div>
                    {categories && categories.map((category) => (
                        <RecetaRow category={category.displayTitle} id={category.id}/>
                    ))}
                </div>
            </div>

            {/* Delete categories */}
            <div className={classes.formContainer}>
                <h3 style={{fontWeight: 'bold', marginBottom: '50px'}}>Borra categorías rouss</h3>
                <div>
                    {categories && categories.map((category) => (
                        <CategoryRow category={category.displayTitle} id={category.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Recetas
