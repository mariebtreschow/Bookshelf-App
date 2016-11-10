const morgan = require('morgan'),
      pug = require('pug'),
      express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      Sequelize = require('sequelize');


var app = express(),
    sequelize = new Sequelize('marietreschow', 'marietreschow', 'asta', { dialect: 'postgres' });

var booksRouter = require('./routes/books');

var Book = sequelize.define('book', {
   title: Sequelize.STRING,
   imageURL: Sequelize.STRING,
   author: Sequelize.STRING,
   description: Sequelize.STRING,
});

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));


app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }})
);

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.redirect('/books');
});

app.use('/books', booksRouter);


sequelize.sync().then(() => {
   console.log('Connected to database');
   app.listen(3000, () => {
      console.log('App is listening to port 3000...');
   });
});
