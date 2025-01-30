import React, { useContext } from 'react'
import NoteContext from '../context/note/NoteContext'

function NoteItem({ title, description, date, id, updateNote, tag,showAlert }) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const getTagColor = (tag) => {
        switch (tag) {
            case "office":
                return "btn-outline-primary";
            case "personal":
                return "btn-outline-secondary";
            case "life":
                return "btn-outline-success";
            case "work":
                return "btn-outline-warning";
            case "general":
                return "btn-outline-info";
            case "college":
                return "btn-outline-danger";
            default:
                return "btn-outline-dark";
        }
    }
    return (
        <div>
            <div className="card my-1">
                <button className={`btn ${getTagColor(tag)}`}>{tag}</button>
                <h5 className="card-header">{date}</h5>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <div className="d-flex justify-content-between">
                        <button
                            className='btn btn-outline-success'
                            onClick={() => { updateNote({ title, description, tag, id }) }}
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button
                            className='btn btn-outline-danger'
                            onClick={() => { deleteNote(id); showAlert("Note is Deleted","info") }}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
