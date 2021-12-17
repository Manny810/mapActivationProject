const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const history = require('connect-history-api-fallback');




// Import all the express routes wew will be using
const indexRouter = require('./routes/index');
const freetsRouter = require('./routes/freets');
const usersRouter = require('./routes/users');
const sessionRouter = require('./routes/session');

// Create our app
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));
app.use(history());
// Set up user session
app.use(session({
    secret: 'URL-shortener',
    resave: true,
    saveUninitialized: true
  }));

// Allows us to make requests from POSTMAN
app.use(cors());

// Set up the app to use dev logger
app.use(logger('dev'));

// Accept json
app.use(express.json());

// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
// Allows object nesting in POST
app.use(express.urlencoded({ extended: false }));

// Cookies for sessions
app.use(cookieParser());

// Connect url hierarchies to our routers
app.use('/', indexRouter);
app.use('/api/freets', freetsRouter);
app.use('/api/session', sessionRouter);
app.use('/api/user', usersRouter); 

// app.listen(3000)

// console.log("Listening on port 3000...");

// Catch all other routes into a meaningful error message
app.all('*', (req, res) => {
  const errorMessage = `
    Cannot find the resource <b>${req.url}</b>
    <br>
    Please use only supported routes below
    <br><br>

    <b>Home Page</b>
    <br>
    GET / -- Go to home page

    <br><br>

    <b>Authentication</b>
    <br>
    POST /api/session/createUser -- Create a user login with username and password
    <br>
    POST /api/session/signIn -- Authenticate with username and password into the server
    <br>
    PUT /api/session/changeUserName -- Change the username of the current account
    <br>
    PUT /api/session/changePassword -- Change the password of the current account
    <br>
    DELETE /api/session/signOut -- Logout of the current user account
    <br>
    DELETE /api/session/deleteUser -- Delete the current account from the server
    <br>

    <br><br>

    <b>Freets</b>
    <br>
    GET /api/freets -- Display all freets stored on the server
    <br>
    POST /api/freets -- Create and store a new freet on the server
    <br>
    POST /api/freets/byAuthor -- Display all freets on the server created by the inputted author
    <br>
    PUT /api/freets/:id -- Update the freet on the server with freet id :id
    <br>
    DELETE /api/freets/:id -- Delete the short on the server with freet id :id
    <br>

    <br><br>

    <
  `;

  res.status(404).send(errorMessage);
});

module.exports = app;
