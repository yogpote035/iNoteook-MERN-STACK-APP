const Note = require("../models/Notes");
const { validationResult } = require("express-validator");
const { findByIdAndUpdate, findById } = require("../models/User");



module.exports.AllNote = async (request, response) => {
    try {
        const notes = await Note.find({ user: request.user.id });
        if (!notes) {
            return response.send("no notes found");
        }
        response.json(notes);
    } catch (error) {
        console.log(error);
    }
}

module.exports.AddNote = async (request, response) => {

    const results = validationResult(request);
    if (!results.isEmpty()) {
        return response.status(400).json({ results: results.array() });
    }
    try {
        const { title, description, tag } = request.body;


        const CreateNote = new Note({
            title,
            description,
            tag,
            user: request.user.id,
        })


        const savedNote = await CreateNote.save();
        response.send(savedNote);
    } catch (error) {
        console.log(error);
        response.send('Internal Server Error');
    }

}


// update note


module.exports.UpdateNote = async (request, response) => {

    const results = validationResult(request);
    if (!results.isEmpty()) {
        return response.status(400).json({ results: results.array() });
    }
    try {
        //   from request  
        const { id } = request.params;
        // find note exist or not
        const note = await Note.findById(id);
        // if note exist
        if (note) {

            const { title, description, tag } = request.body;

            if (note.user.toString() !== request.user.id) {
                return response.status(401).send("Unauthorized Access");

            }
            const UpdatedNote = await Note.findByIdAndUpdate(id, {
                title, description, tag
            }, { new: true });
            return response.status(200).send(UpdatedNote);
        }
        // note not exist
        else {
            response.status(404).send("Note Note Found");
        }


    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }

}


module.exports.DeleteNote = async (request, response) => {
    const { id } = request.params;
    // find note exist or not
    try {
        const note = await Note.findById(id);

        if (!note) {
            return response.status(404).json({ error: "Note Not Found" });
        }
        if (note.user.toString() !== request.user.id) {
            return response.status(401).json({ error: "Unauthorized Access" });
        }
        // write delete code when log in 
        const deleteNote = await Note.findByIdAndDelete(id);
        response.status(200).json({ message: `SUCCESS: Note with id: ${id} has been deleted.` });

    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
}