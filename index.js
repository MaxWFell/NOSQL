const express = require('express');
const userRouter = require('./controllers/user');
const thoughtRouter = require('./controllers/thought');
const app = express();

const mongoose = require('mongoose');

const uri = "mongodb+srv://root:root@cluster0.dgvqjv1.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB!');
});

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//route('/api/users') = require('./controllers/user');
app.use('/api/users', userRouter);
app.use('/api/thoughts', thoughtRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

