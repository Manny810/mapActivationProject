let data = [];

/**
 * props are used to pass data from a parent component to a child component in React and they are the main mechanism for component communication.
 * @typedef Freet
 * 
 * @prop {UUID} id - id of the freet
 * @prop {string} creator - username of user that created the freet
 * @prop {string} content - content of the freet
 * @prop {Date} timestamp - timestamp of when the freet was made
 */

/**
 * @class Freets
 * 
 * Stores all Freets. Note that all methods are static
 * Wherever you import this class, you will be accessing the same data.
 */
class Freets{
    /**
     * @param {UUID} id - id of the freet
     * @param {string} creator - username of user that created the freet
     * @param {string} content - content of the freet
     * @param {Date} timestamp - timestamp of when the freet was made
     * @return {Freet} - the newly created Freet
     */
    static createOne(id, creator, content, timestamp) {
        const freet = { id, creator, content, timestamp };
        data.push(freet); 
        return [freet]; 
    }

    /**
     * Find a Freet by ID.
     * 
     * @param {UUID} id - id of the freet
     * @return {Freet | undefined} - the found freet with above id
     */
    static findOne(id) {
        return data.filter(freet => freet.id === id)[0]; 
    }


    /**
     * 
     * @returns {Freet[]} an array of all of the Freets
     */
    static findAll() {
        return data;
    }

    /**
     * Find all freets written by an author.
     * 
     * @param {string} creator - username of user who created the freets
     * @returns {Freet[]} an array of all of the Freets by the author
     */
    static findAllByAuthor(creator) {
        return data.filter(freet => freet.creator === creator); 
    }

    /**
     * Update a Freet's content.
     * 
     * @param {UUID} id - id of the freet to be updated
     * @param {string} content - updated content of the freet
     * @return {Freet | undefined} - The updated freet
     */
    static updateOne(id, content) {
        const freet = Freets.findOne(id); 
        freet.content = content; 
        return [freet]; 
    }

    /**
     * Update all User's freets with the new username
     * 
     * @param {string} old_creator - the old username of user who created the freets
     * @param {string} new_creator - the new username of user who created the freets
     * @return {Freet | undefined} - The list of modified freets
     */
     static updateUsername(old_creator, new_creator) {
        const freets = Freets.findAllByAuthor(old_creator); 
        for (var freet of freets){
            freet.creator = new_creator; 
        }
        return freets; 
    }

    /**
     * Delete a Freet from the collection.
     * 
     * @param {UUID} id - id of the freet to be deleted
     * @return {Freet | undefined} - deleted Freet
     */
    static deleteOne(id) {
        const freet = Freets.findOne(id); 
        data = data.filter(freet => freet.id !== id); 
        return [freet]; 
    }

    /**
     * Checks if a user can edit the freet
     * 
     * @param {UUID} id - id of the freet to be edited
     * @param {string} creator - username of the user trying to edit the freet
     * @return {bool} - a boolean indicating if the user can edit the freet or not
     */
    static canEdit(id, creator){
        const freet = Freets.findOne(id);
        if (freet)
        return creator === freet.creator; 
    }
}

    module.exports = Freets; 