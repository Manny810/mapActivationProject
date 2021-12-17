const express = require('express');
const {v4: uuidv4, validate} = require('uuid');

const Freets = require('../models/Freets');
const { isEmpty } = require('./middleware');
const validateThat = require('./middleware');

const router = express.Router();

const emptyRegex = /^\s*$/ ; // Regex that checks for empty string or whitespace


/**
 * 200 OK
The request has succeeded. The meaning of the success depends on the HTTP method:

GET: The resource has been fetched and is transmitted in the message body.
HEAD: The representation headers are included in the response without any message body.
PUT or POST: The resource describing the result of the action is transmitted in the message body.
TRACE: The message body contains the request message as received by the server.

201 Created
The request has succeeded and a new resource has been created as a result. This is typically the response sent after POST requests, or some PUT requests.

400 Bad Request
The server could not understand the request due to invalid syntax.

401 Unauthorized
Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.

403 Forbidden
The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401, the client's identity is known to the server.

404 Not Found
The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.
*/


/**
 * List all freets.
 * 
 * @name GET /api/freets
 * 
 * @return {Freet[]} - list of all stored freets
 */
router.get('/', (req, res) => {
    res.status(200).json(Freets.findAll()).end();
});

/**
 * Create a freet.
 * 
 * @name POST /api/freets
 * 
 * @param {UUID} id - id of the freet
 * @param {string} content - content of the freet
 * @param {Date} timestamp - timestamp of when the freet was made 
 * @return {Freet} - the newly created Freet
 * @throws {400} - if body content is empty
 */
router.post('/', [validateThat.userIsLoggedIn], (req, res) => {
    if (req.body.content.match(emptyRegex)) {
        res.status(400).json({
            error: `Content is just an empty string or white space. Please enter a valid content`,
        }).end();
    } else {
        const freet = Freets.createOne(uuidv4(), req.session.username, req.body.content, req.body.timestamp);
        res.status(201).json(freet).end();
    }
});

/**
 * List all freets by author.
 * 
 * @name POST /api/freets/author
 * 
 * @return {Freet[]} - list of all stored freets
 */
 router.post('/author', (req, res) => {
     if (isEmpty(req.body.author)){
        res.status(400).json({
            error: `Authorname cannot be empty. Please enter a proper authorname.`,
        }).end();
     } else {
        res.status(200).json(Freets.findAllByAuthor(req.body.author)).end();
     }
});

/**
 * Edit a freet
 * 
 * @name PUT /api/freets/:id
 * 
 * @param {UUID} id - the id of the freet
 * @param {string} content - content of the updated freet
 * @return {Freet} - updated freet
 * @throws {404} - if the freet doesn't exist 
 */
router.put('/:id?', [validateThat.userIsLoggedIn, validateThat.freetExists, validateThat.userIsCreator], (req,res) => {
    if (isEmpty(req.body.content)) {
        res.status(400).json({
            error: `Content is just an empty string or white space. Please enter a valid content`,
        }).end();
    } else {
        const freet = Freets.updateOne(req.params.id, req.body.content);
        res.status(200).json(freet).end();
    }
});

/**
 * Delete a freet
 * 
 * @name DELETE /api/freets/:id
 * 
 * @return {Freet} - the deleted freet
 * @throws {404} - if freet does not exist
 */
router.delete('/:id?', [validateThat.userIsLoggedIn, validateThat.freetExists, validateThat.userIsCreator], (req, res) => {
    const freet = Freets.deleteOne(req.params.id);
    res.status(200).json(freet).end();
});

module.exports = router;