/**
 * canOnlySeeYourself
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
	
	if (req.originalUrl == '/user/find/'+req.session.user){
		return next();
	}
	if (req.originalUrl == '/user/update/'+req.session.user){
		return next();
	}
	if (req.originalUrl == '/user/destroy/'+req.session.user){
		return next();
	}
		//admins can do anything
		var maybe_admin;
		User.findOne({ id: req.session.user }, function(err, user) {
			maybe_admin = user;
		});
		if (maybe_admin.is_admin){
			return next();
		}
  	return res.forbidden('You can not perform this action.');
};
