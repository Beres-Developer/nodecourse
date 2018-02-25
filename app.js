const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let db;
if(process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}
const Book = require('./models/bookModel');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const bookRouter = require('./Routes/bookRoutes')(Book);





app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function(req, res){
    res.send('Welcome to my API');
});

app.listen(port, function() {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;