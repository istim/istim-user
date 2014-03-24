module.exports = function(req, res, next) {
  if (!req.headers.token){
    return res.forbidden('Token required');
  }
  Token.findOneByToken(req.headers.token).done(function(err, token){
  	if (err) return res.json({ error: 'An error has occurred' }, 500);
    if (!token) return res.forbidden('Invalid Token');
    else return next();
  });
}