/* This policie was created to prevent a user try to access the login even if he is already authenticated.*/

module.exports = function(req, res, next) {

  // Check is the user is authenticated. If he isn't, he can pass,
  // if not, he receives the forbidden message
  if (!req.session.user) {
    return next();
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  if (req.originalUrl == '/login'){
  	return res.forbidden('You are already althenticated.');
  }

  User.findOne({ id: req.session.user }, function(err, user) {
		if (user.is_admin){
			return next();
		}
  });
  if (req.originalUrl == '/user/create'){
  	return res.forbidden('You cant create users');
  }
  return next();
};
