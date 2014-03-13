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
	User.findOne({ id: req.session.user }, function(err, user) {
		if (user.is_admin){
			return next();
		}
	});
	switch(req.originalUrl){
		case '/user/find/'+req.session.user: return next(); break;
		case '/user/update/'+req.session.user: if (req.body.is_admin){ delete req.body.is_admin; } return next(); break;
		case '/user/destroy/'+req.session.user: return next(); break;
	}
	return res.forbidden('You can only see yourself')
};
