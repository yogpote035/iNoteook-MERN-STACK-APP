import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/note/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

function AllNotes({ showAlert }) {
    const context = useContext(NoteContext);
    const { note, getAllNote, editNote } = context;
    const navigate = useNavigate();
    const [state, setState] = useState({
        title: "",
        description: "",
        tag: "",
        id: "",
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNote();
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const closeModal = useRef(null); //for close on click on save

    const updateNote = (currentNote) => {
        if (currentNote.title.length <= 0 || currentNote.description.length <= 0 || currentNote.tag.length < 0) {
            return alert("Enter Valid Value")
        }
        setState({
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag,
            id: currentNote._id,
        });
        ref.current.click();
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setState((preState) => ({
            ...preState,
            [name]: value
        }));
    }

    const onSaveChanges = () => {
        const { title, description, tag, id } = state;
        if (state.title.length <= 0 || state.description.length <= 0 || state.tag.length < 0) {
            return alert("Enter Valid Value For Note")
        }
        editNote(title, description, tag, id);
        showAlert("Note Updated Successfully", "success")
        setState({ title: "", description: "", tag: "", id: "" });
        closeModal.current.click();
    };

    return (
        <>
            <div className="container" style={{ marginTop: "5rem" }}>
                <button type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                    Edit Note
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" ref={closeModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Your Note Title</label>
                                    <input required type="text" name="title" value={state.title} className="form-control" onChange={onChange} id="title" placeholder="Your Note is Here" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Your Note Description</label>
                                    <textarea required className="form-control" placeholder="Enter Description of Your Note" name="description" onChange={onChange} id="description" value={state.description} rows="3"></textarea>
                                </div>

                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-6 gap-4 shadow-lg p-4 bg-white rounded" style={{ marginTop: "20px", border: "1px solid #dee2e6" }}>
                                        <h5 className="text-center mb-3">Select a Tag</h5>
                                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                                            {["office", "personal", "life", "work", "general", "college"].map((tagValue) => (
                                                <div key={tagValue}>
                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        value={tagValue}
                                                        name="tag"
                                                        id={tagValue}
                                                        autoComplete="off"
                                                        onChange={onChange}
                                                        checked={state.tag === tagValue}
                                                    />
                                                    <label className="btn btn-outline-success px-3" htmlFor={tagValue}>{tagValue.charAt(0).toUpperCase() + tagValue.slice(1)}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-between">
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-outline-success" onClick={onSaveChanges} disabled={state.title.length <= 1 || state.description.length <= 1 || state.tag.length <= 1}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: "5rem", marginBottom: "1rem" }}>
                <h3 className="text-success text-center">Your Notes</h3>

                <div className="row">
                    {note.length === 0 ? (
                        <p className="text-center text-primary">
                            It seems you don't have any notes yet. Start by adding a <span className="text-danger"><b>new note!</b></span>
                        </p>
                    ) : (
                        note.map((n) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-3" key={n._id}>
                                <NoteItem
                                    title={n.title}
                                    description={n.description}
                                    tag={n.tag}
                                    updateNote={() => updateNote(n)}
                                    date={n.date}
                                    showAlert={showAlert}
                                    id={n._id}
                                />
                            </div>
                        ))
                    )}
                </div>

            </div>
        </>
    );
}

export default AllNotes;
