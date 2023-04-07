import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export const AddNote = (props) => {
    const context = useContext(noteContext);
    // eslint-disable-next-line

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    // eslint-disable-next-line
    const { notes , addNote } = context;
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Added Note Successfully", "success");
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} required/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick} value={note.tag} className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    )
}
