import React, { useState, useEffect } from 'react';
import firebase from '../../database/firebase';
import { FormControl, TextField, Button, FormGroup, FormLabel, FormControlLabel, Checkbox } from '@material-ui/core';

function Recetas() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient: ""}]);
    const [steps, setSteps] = useState([{step: ""}]);
    const [notes, setNotes] = useState([{note: ""}]);
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        firebase.db.collection("recetas").onSnapshot(querySnapshot => {
            const cat = []; // categories
            querySnapshot.docs.forEach(doc => {
                const data = {
                    titulo: doc.data().titulo,
                    color: doc.data().color,
                    id: doc.id
                }
                cat.push(data);
            })
            console.log(cat);
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
    const handleRemoveClick = index => {
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
        firebase.db.collection("recetas").add({
            titulo: newCategory,
            color: "#344333"
        })
        setNewCategory("");
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
        

        console.log(selectedCategories);
        
        
    }

    const getCategoryID = (category) => {
        let categoryID = "";
        categories.map(cat => {
            console.log(cat.titulo);
            console.log(cat.titulo ===  category);
            if(cat.titulo === category){
                categoryID = cat.id;
            }
        })
        return categoryID;
    }

    const handleImageChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        selectedCategories.forEach(category => {
            const categoryID = getCategoryID(category);
            console.log("category: ",category);
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
                            firebase.db.collection("recetas").doc(categoryID).collection(category).add({
                                descripcion: description,
                                titulo: title,
                                image: url
                            })
                            .then(docRef => {
                                ingredients.forEach(ing => {
                                    firebase.db.collection("recetas").doc(categoryID).collection(category).doc(docRef.id).collection("ingredientes").add({
                                        texto: ing.ingredient
                                    })
                                });
                                steps.forEach(step => {
                                    firebase.db.collection("recetas").doc(categoryID).collection(category).doc(docRef.id).collection("proceso").add({
                                        texto: step.step
                                    })
                                });
                                notes.forEach(note => {
                                    firebase.db.collection("recetas").doc(categoryID).collection(category).doc(docRef.id).collection("notas").add({
                                        texto: note.note
                                    })
                                });
                            })
                            setProgress(0);
                            setImage(null);
                        });
                }
            )
        })
        
    }

    return (
        <div>
            <h1>Sube aquí tus recetas mamita</h1>
            <form>
                <FormControl>
                    <TextField 
                        id="filled-basic" 
                        variant="filled" 
                        placeholder="Ingresa nueva categoria..."
                        value={newCategory}
                        onChange={(event) => setNewCategory(event.target.value)}
                    />
                </FormControl>
                <Button 
                    onClick={addCategory}
                    disabled={!newCategory}
                >
                    Agregar
                </Button>
            </form>
            <form>
                <FormControl>
                    <TextField id="filled-basic" variant="filled" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)}/>
                    <TextField id="filled-basic" variant="filled" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)}/>
                    <p>Ingredientes</p>
                    {ingredients.map((item, i) => {
                        return (
                            <div>
                                <TextField 
                                    placeholder="Escribe ingrediente mamita..."
                                    onChange={e => handleInputChange(e, i)}
                                />

                            </div>
                        )
                    })}
                    <Button onClick={handleAddClick}>
                        Add
                    </Button>
                    
                    <p>Proceso</p>
                    {steps.map((item, i) => {
                        return (
                            <div>
                                <TextField 
                                    placeholder="Escribe paso mamita..."
                                    onChange={e => handleInputChangeSteps(e, i)}
                                />

                            </div>
                            
                        )
                    })}
                    <Button onClick={handleAddClickSteps}>
                        Add
                    </Button>
                    
                    <p>Notas</p>
                    {notes.map((item, i) => {
                        return (
                            <div>
                                <TextField 
                                    placeholder="Escribe nota mamita..."
                                    onChange={e => handleInputChangeNotes(e, i)}
                                />

                            </div>
                            
                        )
                    })}
                    <Button onClick={handleAddClickNotes}>
                        Add
                    </Button>
                    <FormLabel component="legend">Select categories</FormLabel>
                    <FormGroup>
                        {categories && categories.map((category) => (
                            <FormControlLabel
                                control={<Checkbox onChange={checkBoxChange} name={category.titulo} />}
                                label={category.titulo}
                            />
                        ))}
                    </FormGroup>

                    <progress className="imageUpload__progress" value={progress} max="100"/>
                    <input type="file" onChange={handleImageChange}/>
                    <Button onClick={handleUpload}>
                        Upload Image
                    </Button>
                </FormControl>
            </form>
            
        </div>
    )
}

export default Recetas
