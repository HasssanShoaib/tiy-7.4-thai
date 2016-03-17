var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $;
window.jQuery = $ = require('jquery');
require('./bootstrap.min.js');

var Router = require('./router');
var router = new Router();

var InterfaceComponent = require('./components/interface.jsx');



Backbone.history.start();

ReactDOM.render(
  React.createElement(
    InterfaceComponent,
    { router: router }
  ),
  document.getElementById('app')
);
