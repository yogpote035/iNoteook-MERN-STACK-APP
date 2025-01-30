const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect("mongodb+srv://sushilapote3:sushilapote3@cluster0.4aylp.mongodb.net/?retryWrites=true&w=majority&appName=INotebook-React-App").then(() => {
        console.log('Connected to Database');
    }).catch((err) => {
        console.log('error while connecting to Database ERROR:', err);
    })
}


module.exports = connectToDatabase;