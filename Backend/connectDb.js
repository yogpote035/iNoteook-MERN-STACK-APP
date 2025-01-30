const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/iNotebook").then(() => {
        console.log('Connected to Database');
    }).catch((err) => {
        console.log('error while connecting to Database ERROR:', err);
    })
}


module.exports = connectToDatabase;