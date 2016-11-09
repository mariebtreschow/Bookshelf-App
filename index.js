const morgan = require('morgan'),
      pug = require('pug'),
      express = require('express');


var app = express();

app.use(morgan('dev'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.redirect('/books');
});

app.get('/books', (req, res) => {
   res.render('books/index');
});

app.get('/books/new', (req, res) => {
   res.render('books/new');
});

app.listen(3000, () => {
   console.log('App is listening to port 3000...');
});
