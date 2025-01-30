const express = require("express");
const connectToDatabase = require("./connectDb");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connecting To Database 
connectToDatabase();

app.use(cors());
app.use("/api/auth", require("./routes/UserAuth"));
app.use("/api/notes", require("./routes/Notes"));


app.listen(port, () => {
    console.log(`Server is Started at Port ${port}`);
})