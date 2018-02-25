const express = require('express');

const routes = function(Book) {
    const bookRouter = express.Router();

bookRouter.route('/')
    .post(function(req, res){
        const book = new Book(req.body);
        book.save();
        res.status(201).send({book});
    })
    .get(function(req, res){
        const query = {};
        if(req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, function(err, books){
            if (err) {
                return res.status(500).send(err);
            }

            res.json(books);
        });
    });

bookRouter.route('/:bookId')
    .get(function(req, res){

        Book.findById(req.params.bookId, function(err, book){
            if (err) {
                return res.status(500).send(err);
            }

            res.json(book);
        });
    })
    .put(function(req, res){
        Book.findById(req.params.bookId, function(err, book){
            if (err) {
                return res.status(500).send(err);
            }
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save();
            res.json(book);
        });
    });

    return bookRouter;
};

module.exports = routes;