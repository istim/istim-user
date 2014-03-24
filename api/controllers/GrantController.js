/**
 * GrantController
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
    
  grantAccess: function (req, res){
    if (req.body.clientId){
    	Client.findOneByClientId(req.body.clientId).done(function(err, client){
    		if (err) res.json({ error: 'An error has occurred' }, 500);
        if (client){
      		Grant.create({
      			userId: req.session.user,
      			clientId: client.clientId,
      		}).done(function(err, grant){
      			if (err) res.json({ error: 'An error has occurred' }, 500);
      			res.json('Permission to '+client.name+' has been granted');
      		});
        }else res.json({ error: 'Invalid client Id' }, 400);
    	})
    }else res.json({ error: 'Client Id required' }, 400);
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GrantController)
   */
   _config: {
   	blueprints: {
   		actions: false
   	}
   }
};
