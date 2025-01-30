const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const NotesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: 'general',
    },
    date: {
        type: Date,
        default: Date.now,
    }

})


const Note = mongoose.model("Note", NotesSchema);
module.exports = Note;
