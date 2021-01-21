import React, { useState } from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

function Recetas() {
    const [ingredients, setIngredients] = useState([{ingredient: ""}]);
    const [steps, setSteps] = useState([{step: ""}]);
    const [notes, setNotes] = useState([{note: ""}]);

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

    return (
        <div>
            <h1>Sube aquí tus recetas mamita</h1>
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
