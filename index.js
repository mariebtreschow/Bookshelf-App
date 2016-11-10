const morgan = require('morgan'),
      pug = require('pug'),
      express = require('express'),
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize');


var app = express(),
    sequelize = new Sequelize('marietreschow', 'marietreschow', 'asta', { dialect: 'postgres' });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.redirect('/books');
});

app.get('/books', (req, res) => {
   res.render('books/index');
});

app.post('/books', (req, res) => {
   console.log(req.body);
   res.redirect('/books');
});

app.get('/books/new', (req, res) => {
   res.render('books/new');
});

sequelize.sync().then(() => {
   console.log('Connected to database');
   app.listen(3000, () => {
      console.log('App is listening to port 3000...');
   });
});
