const express = require('express');

const Users = require('../models/Users');
const validateThat = require('./middleware');

const router = express.Router();


/**
 * Sign in with login credentials
 * 
 * @name POST /api/session
 * @return {User} - Signed in User
 * @throws {400} - User password is incorrect
 * @throws {404} - User is not found
 */
router.post('/', [validateThat.userIsNotLoggedIn], (req, res) => {
    const existingUser = Users.findUser(req.body.username);
    if (existingUser === undefined) {
      res.status(404).json({
        error: `Username ${req.body.username} does not exist.`,
      }).end();
    } else if (existingUser.password !== req.body.password) {
      res.status(400).json({
        error: `Password is incorrect.`,
      }).end();
    } else {
      req.session.username = req.body.username;
      req.session.password = req.body.password; 
      res.status(200).json(existingUser).end();
    }
});

/**
 * Sign out of the user account
 * 
 * @name DELETE /api/session
 * @throws {404} User is not signed in
 */
router.delete('/', [validateThat.userIsLoggedIn],  (req, res) => {
    console.log("deleting user");
    req.session.username = null;
    req.session.password = null;
    res.status(200).end();
});

module.exports = router;
