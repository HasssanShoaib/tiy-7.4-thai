var Backbone = require('backbone');

var FoodItem = Backbone.Model.extend({
  idAttribute: 'id'
});

var FoodCollection = Backbone.Collection.extend({
  model: FoodItem

});

module.exports = {
  FoodItem: FoodItem,
  FoodCollection: FoodCollection
}
