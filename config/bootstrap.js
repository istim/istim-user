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
  User.findOne({is_admin: true}).done(function(err, user){
    if (err) cb(); //DB error
    //Admin exists
    if (user) {
        console.log('Admin already exists');
        cb();
    }
    //admin do not exists
    else User.create({ email: 'admin@istimuser.com', password: 'passadmin'}).done(function(err, user){
        if (err) cb(); //DB Error
        //User created
        console.log('Creating admin user');
        if (user) {
            console.log('Giving admin user admin privileges');
            User.create_admin(user); //User now is Admin
            cb();
        } else User.findOneByEmail('admin@istimuser.com').done(function(err, user){
            if (err) cb();
            console.log('Admin user already exists, looking up for him');
            if (user) {
                console.log('Giving admin user admin privileges');
                User.create_admin(user); //User now is Admin
                cb();
            } else {
                console.log('Everything else failed, just go on!');
                cb();
            };
        });
    });
  });
};