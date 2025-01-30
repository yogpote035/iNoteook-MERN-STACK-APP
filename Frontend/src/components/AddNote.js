import React, { useContext, useState } from 'react'
import NoteContext from '../context/note/NoteContext'
import { useNavigate } from 'react-router-dom'
function AddNote({ showAlert }) {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [state, setState] = useState({
        title: "",
        description: "",
        tag: "",
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setState((preState) => ({
            ...preState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (state.title.length <= 0 || state.description.length <= 0 || state.tag.length < 0) {
            return showAlert("Please Fill All Fields", "warning");
        }
        addNote(state.title, state.description, state.tag)
        showAlert("Note Added Successfully", "success");
        navigate("/notes")

    }
    return (
        <div className='container ' style={{ marginTop: "5rem", marginBottom: "1rem" }}>
            <form action="">
                <h2 className='text-success text-center'>Add A Note</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Your Note Title</label>
                    <input type="text" name='title' required className="form-control" onChange={onChange} id="title" placeholder="Your Note is Here" />
                </div>


                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Your Note Description</label>
                    <textarea className="form-control" required placeholder='Enter Description of Your Note' name='description' onChange={onChange} id="description" rows="3">
                    </textarea>
                </div>


                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 gap-4 shadow-lg p-4 bg-white rounded" style={{ marginTop: "20px", border: "1px solid #dee2e6" }}>
                        <h5 className="text-center mb-3">Select a Tag</h5>

                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <input
                                type="radio"
                                className="btn-check"
                                value={"office"}
                                name="tag"
                                id="office"
                                autoComplete="off"
                                onChange={onChange}
                            />
                            <label className="btn btn-outline-success px-3" htmlFor="office">Office</label>

                            <input
                                type="radio"
                                className="btn-check"
                                value={"personal"}
                                name="tag"
                                id="personal"
                                autoComplete="off"
                                onChange={onChange}

                            />
                            <label className="btn btn-outline-danger px-3" htmlFor="personal">Personal</label>

                            <input
                                type="radio"
                                className="btn-check"
                                value={"life"}
                                name="tag"
                                id="life"
                                autoComplete="off"
                                onChange={onChange}
                            />
                            <label className="btn btn-outline-success px-3" htmlFor="life">Life</label>

                            <input
                                type="radio"
                                className="btn-check"
                                value={"work"}
                                name="tag"
                                id="work"
                                autoComplete="off"
                                onChange={onChange}

                            />
                            <label className="btn btn-outline-danger px-3" htmlFor="work">Work</label>

                            <input
                                type="radio"
                                className="btn-check"
                                value={"general"}
                                name="tag"
                                id="general"
                                autoComplete="off"
                                onChange={onChange}

                            />
                            <label className="btn btn-outline-danger px-3" htmlFor="general">General</label>

                            <input
                                type="radio"
                                className="btn-check"
                                value={"college"}
                                name="tag"
                                id="college"
                                autoComplete="off"
                                onChange={onChange}
                            />
                            <label className="btn btn-outline-danger px-3" htmlFor="college">College</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" disabled={state.title.length <= 1 || state.description.length <= 1 || state.tag.length <= 1 || !localStorage.getItem("token")} className='btn btn-outline-info m-5' onClick={handleSubmit}>Add A Note</button>
                </div>
            </form>

        </div>
    )
}

export default AddNote