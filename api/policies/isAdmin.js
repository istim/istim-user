/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
  User.findOne({id: req.session.user, is_admin: true}).done(function(err, user){
  	if (err) return res.json('Unexpected system behavior', 500);
  	if (user) return next();
  	else if (req.body.id == req.session.user) return next();
  	else return res.json('You are not permitted to perform this action', 403)
  })
};