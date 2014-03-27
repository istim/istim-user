/**
 * Client
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  migrate: 'safe',
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    clientSecret: {
      type: 'string',
      unique: true,
      minLength: 6
    },
    clientId: {
      type: 'string',
      unique: true,
      minLength: 6
    },
    url: {
      type: 'string',
      required: true,
      minLength: 6
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6
    }
  },

  beforeCreate: function (attrs, next) {
    var bcryptUtils = require('istim-user-utils/generateHash');
    bcryptUtils.generateHash(attrs.password, function(err, hash){
      if (err) return next(err);
      attrs.password = hash;
      bcryptUtils.generateHash(attrs.url, function(err, hash){
        if (err) return next(err);
        if (!attrs.client_id)
          attrs.clientId = hash;
        if (!attrs.client_secret)
          attrs.clientSecret = hash;
        next();
      });
    });
  }
};
