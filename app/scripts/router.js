var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'order': 'order',
    'pay': 'pay',
    'track': 'track',
    'back-login': 'backendLogin',
    'backend': 'backend',
    'item/:id': 'item',
    '*notFound': 'catch'
  },
  index: function(){
    this.current = 'index';
  },
  order: function(){
    this.current = 'order';
  },
  pay: function(){
    this.current = 'pay';
  },
  track: function(){
    this.current = 'track';
  },
  backendLogin: function(){
    this.current = 'backend-login';
  },
  backend: function(){
    this.current = 'backend';
  },
  item: function(id){
    // console.log('item w/ id called');
    this.current = 'item';
    this.itemId = id;
  },
  catch: function( splat ){
    // console.log('catchall called');
    this.current = 'catch';
    this.currentSplat = splat;
    Backbone.history.navigate('', { trigger: true });
  }
});

module.exports = Router;
