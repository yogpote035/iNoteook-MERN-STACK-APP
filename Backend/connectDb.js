const mongoose = require("mongoose");

if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
const connectToDatabase = async () => {
    const DatabaseUrl = process.env.Mongo_DB_URL;
    await mongoose.connect(DatabaseUrl).then(() => {
        console.log('Connected to Database');
    }).catch((err) => {
        console.log('error while connecting to Database ERROR:', err);
    })
}


module.exports = connectToDatabase;