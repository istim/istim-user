/**
 * Session
 * 
 * Sails session integration leans heavily on the great work already done by Express, but also unifies 
 * Socket.io with the Connect session store. It uses Connect's cookie parser to normalize configuration
 * differences between Express and Socket.io and hooks into Sails' middleware interpreter to allow you
 * to access and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.session = {

  // Session secret is automatically generated when your new app is created
  // Replace at your own risk in production-- you will invalidate the cookies of your users,
  // forcing them to log in again. 
  secret: '66d0b17fad68f6803c5233ddeb893c27',


  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers
  // adapter: 'redis',
  //
  // The following values are optional, if no options are set a redis instance running
  // on localhost is expected.
  // Read more about options at: https://github.com/visionmedia/connect-redis
  //
  // host: 'localhost',
  // port: 6379,
  // ttl: <redis session TTL in seconds>,
  // db: 0,
  // pass: <redis auth password>
  // prefix: 'sess:'


  // Uncomment the following lines to use your Mongo adapter as a session store
  adapter: process.env.SESSION_ADAPTER || 'memory',
  
  host: 'ds061518.mongolab.com',
  port: 61518,
  user: 'nodejitsu_istim-user',
  password: 'ro3bb8d2uf3bih3umjl1064v13',
  database: 'nodejitsu_istim-user_nodejitsudb4408612239',
  collection: 'sessions',
  
  url: 'mongodb://nodejitsu_istim-user:ro3bb8d2uf3bih3umjl1064v13@ds061518.mongolab.com:61518/nodejitsu_istim-user_nodejitsudb4408612239',
  // Optional Values:
  //
  // # Note: url will override other connection settings
  //
  // username: '',
  // password: '',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

};
