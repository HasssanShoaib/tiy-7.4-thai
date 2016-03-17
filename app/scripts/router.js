var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'order': 'order',
    'item/:id': 'item'
  },
  index: function(){
    this.current = 'index';
  },
  order: function(){
    this.current = 'order';
  },
  item: function(id){
    this.current = 'item';
    this.itemId = id;
  }
});

module.exports = Router;
