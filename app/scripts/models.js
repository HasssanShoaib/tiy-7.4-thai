var Backbone = require('backbone');

var FoodItem = Backbone.Model.extend({
  idAttribute: 'cid'
});

var FoodCollection = Backbone.Collection.extend({
  model: FoodItem

});

var CompleteOrder = Backbone.Model.extend({
  urlRoot: 'http://tiny-lasagna-server.herokuapp.com/collections/mtorders',
  idAttribute: '_id',
});

var Order = Backbone.Model.extend({
  idAttribute: '_id'
});

var OrderCollection = Backbone.Collection.extend({
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/mtorders',
  model: Order
});

module.exports = {
  FoodItem: FoodItem,
  FoodCollection: FoodCollection,
  CompleteOrder: CompleteOrder,
  Order: Order,
  OrderCollection: OrderCollection
}
