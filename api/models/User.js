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
    }
  },

  beforeCreate: function (attrs, next) {
      var bcrypt = require('bcrypt');

      bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(attrs.password, salt, function(err, hash) {
          if (err) return next(err);

          attrs.password = hash;
          next();
        });
      });
  }
};