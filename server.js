const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');

// call the database
require('./db/db');

// enable css files
app.use(express.static('public'))

// app.get("/", (req, res) => {
// 	res.render('auth/login.ejs');
// })



// middle ware
app.use(session({
	secret: 'apples are red', // used to encrypt cookie, make up a phrase
	resave: false, // do not update unless the session object is changed
	saveUninitialized: false, // it is illegal to store cookies in a user's browser until they log in
	cookie: { secure: false }
}));
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: false}));

// controllers
const usersController = require('./controllers/userController');
const photosController = require('./controllers/photoController');
const authController = require('./controllers/authController');
app.use('/users', usersController);
app.use('/photos', photosController);
app.use('/', authController);


// seeding data -- adding some data when you start development
app.get('/seed', (req, res) => {
	res.send('I just added some data for you');
})


app.listen(PORT, () => {
	console.log("server is running on PORT " + PORT);
})