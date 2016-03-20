var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'order': 'order',
    'pay': 'pay',
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
