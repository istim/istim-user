/**
 * Token
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    clientId: {
      type: 'string',
      unique: true,
      required: true
    },
  	token: {
      type: 'string',
      unique: true,
      required: true
    }
  }

};
