import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="d-flex">
                            <i className="fa-solid fa-trash-can mx-2 my-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Note Successfully", "success"); }}></i>
                            <i className="fa-solid fa-pen my-2" onClick={()=>{updateNote(note)}}></i>
                        </div>
                    </div>
                    <h6 className="card-title">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem