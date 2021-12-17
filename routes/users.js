const express = require('express');

const Freets = require('../models/Freets');
const Users = require('../models/Users');
const validateThat = require('./middleware');

const router = express.Router();

/**
 * Create a user
 * @name POST /api/user
 * 
 * @return {User} - newly created User
 * @throws {400} - if username or password is empty or user is already signed in
 */
router.post('/', [validateThat.userNameDoesNotAlreadyExist, validateThat.userIsNotLoggedIn], (req, res) => {
  console.log("in the user router");
  if (req.body.username.length === 0) {
    res.status(400).json({ error: 'The user name must be at least 1 character.' }).end();
  } else if (req.body.password.length === 0){
      res.status(400).json({ error: 'The password must be at least 1 character.' }).end();
  } else {
      const newUser = Users.createNewUser(req.body.username, req.body.password);
      res.status(201).json(newUser).end()
  }
});

/**
 * Change username for user
 * 
 * @name PUT /api/user/username
 * 
 * @return {User} - newly updated User
 * @throws {400} - if username is empty or user is not signed in
 */
 router.put('/username', [validateThat.userIsLoggedIn], (req, res) => {
    if (req.body.username.length === 0) {
      res.status(400).json({ error: 'The user name must be at least 1 character.' }).end();
    } else {
        const freets = Freets.updateUsername(req.session.username, req.body.username); 
        const updatedUser = Users.changeUserName(req.session.username, req.body.username);
        req.session.username = updatedUser.username;
        res.status(201).json(updatedUser).end();
    }
});

/**
 * Change password for user
 * 
 * @name PUT /api/user/password
 * 
 * @return {User} - newly updated User
 * @throws {400} - if password is empty or user is not signed in
 */
 router.put('/password', [validateThat.userIsLoggedIn], (req, res) => {
    if (req.body.password.length === 0) {
      res.status(400).json({ error: 'The password must be at least 1 character.' }).end();
    } else {
        const updatedUser = Users.changeUserPassword(req.session.username, req.body.password);
        req.session.password = updatedUser.password;
        res.status(201).json(updatedUser).end();
    }
});


/**
 * Delete the user
 * 
 * @name DELETE /api/user
 * 
 * @return {User} - the deleted User
 */
router.delete('/', [validateThat.userIsLoggedIn], (req, res) => {
    const deletedUser = Users.deleteUser(req.session.username);
    req.session.username = null;
    req.session.password = null;
    res.status(200).json(deletedUser).end();
})


module.exports = router;