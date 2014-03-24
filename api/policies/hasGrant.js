module.exports = function(req, res, next) {
  Token.findOneByToken(req.headers.token).done(function(err, token){
  	if (err) return res.json({ error: 'An error has occurred' }, 500);
    if (!token) return res.forbidden('Invalid Token');
    else {
    	Grant.findOne({
        clientId: token.clientId, 
        userId: req.headers.userid
      }).done(function(err, grant){
    		if (err) return res.json({ error: 'An error has occurred' }, 500);
        if (grant) {
          return next();
        }else return res.forbidden('You have no permission to access this information');
    	});
    }
  })
};