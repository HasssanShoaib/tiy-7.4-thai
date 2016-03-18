var Backbone = require('backbone');

var FoodItem = Backbone.Model.extend({
  idAttribute: 'cid'
});

var FoodCollection = Backbone.Collection.extend({
  model: FoodItem

});

module.exports = {
  FoodItem: FoodItem,
  FoodCollection: FoodCollection
}
