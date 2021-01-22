import React, { useState, useEffect } from 'react';
import firebase from '../../database/firebase';
import { FormControl, TextField, Button } from '@material-ui/core';

function Recetas() {
    const [ingredients, setIngredients] = useState([{ingredient: ""}]);
    const [steps, setSteps] = useState([{step: ""}]);
    const [notes, setNotes] = useState([{note: ""}]);
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        firebase.db.collection("recetas").onSnapshot(querySnapshot => {
            const cat = [];
            querySnapshot.docs.forEach(doc => {
                const data = {
                    titulo: doc.data().titulo,
                    color: doc.data().color,
                    id: doc.id
                }
                cat.push(data);
            })
            setCategories(cat);
        })
    }, [categories])

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredients];
        list[index][name] = value;
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
        const { name, value } = e.target;
        const list = [...steps];
        list[index][name] = value;
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
        const { name, value } = e.target;
        const list = [...notes];
        list[index][name] = value;
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

    const addCategory =  (event) => {
        event.preventDefault();
        firebase.db.collection("recetas").add({
            titulo: newCategory,
            color: "#344333"
        })
        setNewCategory("");
    }

    /* const uplodadImage = async () => {
        const childPath = `recetas/${firebase.firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase.storage
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot)
                console.log(snapshot)
            })
        }
        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    } */

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
                    <TextField id="filled-basic" variant="filled" placeholder="Título"/>
                    <TextField id="filled-basic" variant="filled" placeholder="Descripción"/>
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
                </FormControl>
            </form>
            
        </div>
    )
}

export default Recetas
