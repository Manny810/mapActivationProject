const Freets = require('../models/Freets');
const Users = require('../models/Users');

const emptyRegex = /^\s*$/ ; // Regex that checks for empty string or whitespace

// Checks if an input is empty
const isEmpty = (input) => {
    return input.match(emptyRegex); 
}

// Checks if the id is empty
const idIsNotEmpty = (req, res, next) => {
    if (isEmpty(req.params.id)) {
        res.status(400).json({
            error: `ID is empty`,
        }).end();
        return;
    }
    next(); 
};

// Checks that the username in the request body does not already exist
const userNameDoesNotAlreadyExist = (req, res, next) => {
    if (Users.findUser(req.body.username) !== undefined) {
        res.status(400).json({
            error: `Username ${req.body.username} already exists.`,
        }).end();
        return;
    }
    next();
};

// Checks that the username is set in session, i.e. user logged in
const userIsLoggedIn = (req, res, next) => {
    console.log(req.session.username);
    if (req.session.username == null) {
        res.status(403).json({
            error: 'You must be logged in in order to make changes to the account.'
        }).end();
        return;
    }
    next();
}

// Checks that the user is not in session
const userIsNotLoggedIn = (req, res, next) => {
    if (req.session.username != null) {
        res.status(400).json({
            error: 'You are already logged in.'
        }).end();
        return;
    }
    next();
}

// Checks if the user is creator of a specific freet
const userIsCreator = (req, res, next) => {
    if (req.params.id === undefined) {
        res.status(404).json({
            error: `Freet with ID ${req.params.id} does not exist.`
        }).end();
        return;
    } else if (!Freets.canEdit(req.params.id, req.session.username)) {
        res.status(400).json({
            error: 'This is not your Freet!' + req.session.username
        }).end();
        return;
    }
    next();
}

// Checks that the freet id in the paramerters exists
const freetExists = (req, res, next) => {
    if (req.params.id === undefined) {
        res.status(404).json({
            error: `Please enter an ID.`
        }).end();
        return;
    } else if (Freets.findOne(req.params.id) === undefined) {
        res.status(404).json({
            error: `Freet with ID ${req.params.id} does not exist.`
        }).end();
        return;
    }
    next();
  };

module.exports = Object.freeze({
    isEmpty, 
    idIsNotEmpty, 
    userNameDoesNotAlreadyExist,
    userIsLoggedIn,
    userIsNotLoggedIn,
    userIsCreator, 
    freetExists,
});