const { userInfo } = require("os");

let usersInfo = [];


/**
 * @typedef user
 * @prop {string} username - username of user
 * @prop {string} password - password with user
 */

/**
 * @class Users
 * 
 * Stores all Users and their respective log-in info. Note that all methods are static.
 * Wherever you import this class, you will be accessing the same userName and uesrNameToPassword literals.
 */

class Users {
    /**
     * Create a new User
     * 
     * @param {string} username - Username of user
     * @param {string} password - Password linked to username
     * @return {User} - Newly created user
     */

    static createNewUser(username, password) {
        const user = {username, password}
        usersInfo.push(user);
        return user;
    }

    /**
     * Find a User given their username
     * 
     * @param {string} username - username of the user
     * @return {User | undefined} - the found user with the above username
     */
    static findUser(currentUserName) {
        return usersInfo.filter(user => user.username === currentUserName)[0];
    }

    /**
     * Change username for current user
     * 
     * @param {string} currentUserName - Current username of user
     * @param {string} newUserName - New username of user
     * @return {User | undefined} - The updated userwith newUserName
     */
    static changeUserName(currentUserName, newUserName) {
        const currentUser = Users.findUser(currentUserName);
        currentUser.username = newUserName;
        return currentUser;        
    }

    /**
     * Change password for current user
     * 
     * @param {string} currentUsername - Current username of user
     * @param {string} newPassword - New username of user
     * @returns {User | undefined} - The updated user with newPassword
     */
    static changeUserPassword(currentUserName, newPassword) {
        const currentUser = Users.findUser(currentUserName);
        currentUser.password = newPassword;
        return currentUser;
    }

    /**
     * Delete a User from the collection
     * 
     * @param {string} username - username of the user
     * @return {User | undefined} - deleted User
     */
    static deleteUser(currentUserName) {
        const currentUser = Users.findUser(currentUserName);
        usersInfo = usersInfo.filter(user => user.username !== currentUserName);
        return currentUser;
    }

}

module.exports = Users;