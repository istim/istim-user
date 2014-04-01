/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  getAllAuthenticated: function(req, res){
    AuthenticatedUser.find().done(function(err, users){
      users.forEach(function(user){
        delete user.id;
        delete user.createdAt;
        delete user.updatedAt;
      });
      res.json(users);
    });
  },
  getAuthenticated: function(req, res){
    if (!req.body.userId) res.json({ error: 'Invalid user id' }, 400);
    AuthenticatedUser.findOneByUserId(req.body.userId).done(function(err, object){
      if (err) res.json({ error: 'DB error' }, 500);
      if (object) res.json({'Authenticated': 'yes'});
      res.json({'Authenticated': 'no'});  
    })
  },

  getUserInfo: function(req, res){
    if (!req.body.userId) res.json({ error: 'Invalid user id' }, 400);
    User.findOneById(req.headers.userId).done(function (err, user){
      if (err) res.json({ error: 'DB error' }, 500);
      if (user) {
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        res.json(user);
      }else {
        res.json({ error: 'User not found' }, 404);
      }
    });
  },
  login: function(req, res){
    if (!req.body.email) res.json({ error: 'Invalid email' }, 400);
    if (!req.body.password) res.json({ error: 'Invalid password' }, 400);
  	var bcrypt = require('bcrypt');
    User.findOneByEmail(req.body.email).done(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            // password match
            AuthenticatedUser.create({userId: user.id}).done(function(err, object){
              if (err) res.json(err)
              if (object){
                req.session.authenticated = true;
                req.session.user = user.id;
                res.json(user);
              }else{
                res.json({error: 'Unexpected system behavior'}, 500)
              }
            });
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    });
  },
  logout: function(req, res){
    AuthenticatedUser.destroy({id: req.session.user}).done(function(err){
      if (err) res.json({error: 'Unexpected system behavior'}, 500);
      else {
        req.session.authenticated = null;
        req.session.user = null;
        res.json('Logout success!');
      }
    });
  },
  _config: {
    blueprints: {
      actions: false
    }
  }
};
