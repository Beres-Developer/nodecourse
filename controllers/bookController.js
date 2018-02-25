const bookController = function(Book) {

    const post = function(req, res){
        const book = new Book(req.body);

        if(!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            book.save();
            res.status(201);
            res.send({book});
        }
    }

    const get = function(req, res){
        const query = {};
        if(req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, function(err, books){
            if (err) {
                return res.status(500).send(err);
            }

            const returnBooks = [];
            books.forEach(function(element, index, array){
                const newBook = element.toJSON();
                newBook.links = {};
                newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                returnBooks.push(newBook);
            });
            res.json(returnBooks);
        });
    }

    return {
        post,
        get
    }
}

module.exports = bookController;