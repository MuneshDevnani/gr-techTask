const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const shared = require('./config/shared')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

mongoose.connect(shared.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
const courseRouter = require('./routes/course');
const studentRouter = require('./routes/student');

app.use('/course', courseRouter);
app.use('/student', studentRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});