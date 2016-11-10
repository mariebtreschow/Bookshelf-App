const express = require('express'),
      Sequelize = require('sequelize'),
      router = express.Router(),
      sequelize = new Sequelize('marietreschow', 'marietreschow', 'asta', { dialect: 'postgres' });

var Book = sequelize.define('book', {
   title: Sequelize.STRING,
   imageURL: Sequelize.STRING,
   author: Sequelize.STRING,
   description: Sequelize.STRING,
});


router.get('/', (req, res) => {
   Book.findAll({ order: 'id ASC'}).then((books) => {
      res.render('books/index', { books: books });
   });
});

router.get('/new', (req, res) => {
   res.render('books/new');
});

router.get('/:id', (req, res) => {
   Book.findById(req.params.id).then((book) => {
      console.log(book)
      res.render('books/show', { book: book });
   }).catch((error) => {
      console.log(error);
   });
});

router.get('/:id/edit', (req, res) => {
   Book.findById(req.params.id).then((book) => {
      res.render('books/edit', { book: book });
   });
});

router.post('/', (req, res) => {
   if (req.body.title) {
      Book.create(req.body).then(() => {
         res.redirect('/books');
      });
   } else {
      res.redirect('/books/new');
   }
});

router.put('/:id', (req, res) => {
   Book.update(req.body, {
      where: {
         id: req.params.id
      }
   }).then(() => {
      res.redirect('/books/' + req.params.id);
   }).catch((error) => {
      console.log('Error is:');
      console.log(error);
   });
});



module.exports = router;
