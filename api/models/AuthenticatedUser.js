// Person.js
module.exports = {
  migrate: process.env.MIGRATE || 'alter',
  attributes: {
    userId: 'string',
  },
};