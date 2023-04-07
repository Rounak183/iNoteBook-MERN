import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/note/fetchallnotes/`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        console.log(json);
        if (json.error) {
            setNotes([]);
        }
        else {
            setNotes(json);
        }
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/note/addnote/`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    } 

    // Delete a Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        // eslint-disable-next-line
        const json = await response.json();


        console.log("Deleting the note with id "+id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            body: JSON.stringify({title, description, tag})
        });
        // eslint-disable-next-line
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        // Logic to Edit in Client
        console.log("Editing the note with id " + id);
        for (let index = 0; index<newNotes.length; index++)
        {
            const element = newNotes[index];
            if (element._id === id)
            {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes , addNote , deleteNote , editNote , getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;