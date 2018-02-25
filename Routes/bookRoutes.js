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
    });

    return bookRouter;
};

module.exports = routes;