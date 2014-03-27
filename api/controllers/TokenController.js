/**
* TokenController
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

  request: function(req, res){
    //Request Processing
    if (!req.body.email) res.json({ error: 'Invalid email' }, 400);
    if (!req.body.password) res.json({ error: 'Invalid password' }, 400);
    if (!req.body.clientId) res.json({ error: 'Invalid clientId' }, 400);
    if (!req.body.clientSecret) res.json({ error: 'Invalid clientSecret' }, 400);
    var clientUtils = require('istim-user-utils/clientUtils');
    clientUtils.tryLogin(req.body.email, req.body.password, function(message, code, client){
      if (message == 'success'){
        if(req.body.clientId == client.clientId){
          if(req.body.clientSecret == client.clientSecret){
            var bcryptUtils = require('istim-user-utils/generateHash');
            bcryptUtils.generateHash(client.clientId, function(err, hash){
              if (err) return res.json(err);
              Token.create({
                token: hash,
                clientId: client.clientId,
              }).done(function(err, grant){
                if (err) res.json({ error: 'An error has occurred' }, 500);
                res.json(hash);
              });
            });
          }else {
            res.json({ error: 'Invalid client secret' }, 400);
          }
        }else {
          res.json({ error: 'Invalid client Id' }, 400);
        }
      }else {
        res.json({error: message}, 400)
      }
    });
  },
    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to TokenController)
    */
  _config: {
    blueprints: {
        actions: false
      }
  }
};
