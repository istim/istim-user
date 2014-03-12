/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  var admin = User.create({
  	name: 'admin',
  	password: 'passadmin',
  	email: 'admin@istimuser.com',
  	is_admin : true
  }).done(function(err, admin){
		console.log("Created admin: "+admin.email);
		User.create_admin(admin)
	});
  cb();
};