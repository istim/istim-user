// Person.js
module.exports = {
  attributes: {
    firstName: 'string',
    lastName: 'string',
    birthDate: 'date',
    
    email: {
      type: 'email', // Email type will get validated by the ORM
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true
    },

    is_admin: {
      type : 'boolean',
    }
  },

  beforeCreate: function (attrs, next) {
    var bcryptUtils = require('istim-user-utils/generateHash');
    bcryptUtils.generateHash(attrs.password, function(err, hash){
      if (err) return next(err);
      attrs.password = hash
      attrs.is_admin = false;
      next();
    });
  },

  create_admin: function(user) {
      user.is_admin = true;
      user.save(function(err){});
  }
};