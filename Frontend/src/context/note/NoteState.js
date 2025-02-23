// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = ({ children }) => {

    const [note, setNote] = useState([])

    const getAllNote = async () => {
        const url = `https://inoteook-mern-stack-app.onrender.com/api/notes/notes`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
        });

        if (!response.ok) {
            throw new Error("Failed to Get Notes");
        }
        const allNotes = await response.json();
        setNote(allNotes);
    }


    const addNote = async (title, description, tag) => {
        const url = "https://inoteook-mern-stack-app.onrender.com/api/notes/notes";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag })
        });

        const newNote = await response.json();
        setNote(note.concat(newNote));
    };

    const deleteNote = async (id) => {
        const url = `https://inoteook-mern-stack-app.onrender.com/api/notes/delete/${id}/`;
        await fetch(url, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
        });

        setNote(note.filter((note) => note._id !== id));
    };

    const editNote = async (title, description, tag, id) => {
        try {
            const url = `https://inoteook-mern-stack-app.onrender.com/api/notes/update/${id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error("Failed to update note");
            }
            setNote((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === id ? { ...note, title, description, tag } : note
                )
            );
        } catch (error) {
            console.error("Error updating note:", error);
        }
    }

    return (
        <NoteContext.Provider value={{ note, addNote, editNote, deleteNote, getAllNote }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState;