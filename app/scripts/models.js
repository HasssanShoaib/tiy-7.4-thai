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
})
module.exports = {
  FoodItem: FoodItem,
  FoodCollection: FoodCollection,
  CompleteOrder: CompleteOrder
}
