var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $;
window.jQuery = $ = require('jquery');
require('./bootstrap.min.js');

var data = require('./data');
var models = require('./models');
var Router = require('./router');
var router = new Router();
var menu = new models.FoodCollection( data );
console.log(menu);
var InterfaceComponent = require('./components/interface.jsx');



Backbone.history.start();

ReactDOM.render(
  React.createElement(
    InterfaceComponent,
    { router: router }
  ),
  document.getElementById('app')
);
