// Person.js
var User = {
  attributes: {
    firstName: 'STRING',
    lastName: 'STRING',
    birthDate: 'DATE',
    
    email: {
      type: 'email', // Email type will get validated by the ORM
      required: true
    },

    password: {
      type: 'STRING',
      maxLength: 20,
      minLength: 5,
      required: true
    }
  }
};

module.exports = User;