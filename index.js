const morgan = require('morgan'),
      pug = require('pug'),
      express = require('express'),
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize');


var app = express(),
    sequelize = new Sequelize('marietreschow', 'marietreschow', 'asta', { dialect: 'postgres' });

var Book = sequelize.define('book', {
   title: Sequelize.STRING,
   imageURL: Sequelize.STRING,
   author: Sequelize.STRING,
   description: Sequelize.STRING,
});

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.redirect('/books');
});

app.get('/books', (req, res) => {
   Book.findAll().then((books) => {
      res.render('books/index', { books: books });
   });
});

app.post('/books', (req, res) => {
   Book.create(req.body).then(() => {
      res.redirect('/books');
   });
});

app.get('/books/new', (req, res) => {
   res.render('books/new');
});

app.get('books/:id/edit', (req, res) => {
   Book.findById(req.params.id).then((book) => {
      res.render('books/edit', { book: book });
   });
});

sequelize.sync().then(() => {
   console.log('Connected to database');
   app.listen(3000, () => {
      console.log('App is listening to port 3000...');
   });
});
