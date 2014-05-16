/**
 * Global adapter config
 * 
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.adapters = {

  // If you leave the adapter config unspecified 
  // in a model definition, 'default' will be used.
  'default': process.env.ADAPTER || 'disk',
  
  memory: {
    module: 'sails-memory'
  },
  // Persistent adapter for DEVELOPMENT ONLY
  // (data is preserved when the server shuts down)
  disk: {
    module: 'sails-disk'
  },

  mongo: {
    module: 'sails-mongo',
    url: 'mongodb://nodejitsu_istim-user:ro3bb8d2uf3bih3umjl1064v13@ds061518.mongolab.com:61518/nodejitsu_istim-user_nodejitsudb4408612239'
    // host: 'ds061518.mongolab.com',
    // port: 61518,
    // user: 'nodejitsu_istim-user',
    // password: 'ro3bb8d2uf3bih3umjl1064v13',
    // database: 'nodejitsu_istim-user_nodejitsudb4408612239'
  }
};