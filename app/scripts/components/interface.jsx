// 3rd party libs
var React = require('react');
var _ = require('underscore');
var $ = require('jquery');

// Backbone Data Models & Collections
var models = require('../models');
var FoodItem = models.FoodItem;

// React Components
var InfoPanel = require('./info.jsx');
var Order = require('./order.jsx');
var OrderSidebar = require('./order-sidebar.jsx');
var PayForm = require('./pay.jsx');
var ThaiTracker = require('./thaitracker.jsx');
var Login = require('./login.jsx');
var Backend = require('./backend.jsx');



var InterfaceComponent = React.createClass({
  getInitialState: function(){
    return {
      router: this.props.router,
      menu: this.props.menu,
      order: this.props.order
    };
  },
  setOrder: function( model, numOrdered, options ){
    // console.log('setOrder called');
    this.state.order.add( new FoodItem(
      $.extend( {},
                _.omit(model.attributes, 'id'),
                {numOrdered: numOrdered, options: options }
      ))
    );
  },
  removeOrder: function ( model ){
    // console.log('removeOrder called');
    this.state.order.remove( model );
  },
  resetOrder: function(){
    this.setState({order: new models.FoodCollection() });
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback );
    this.state.order.on('add', this.callback );
    this.state.order.on('remove', this.callback );
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback );
    this.state.order.off('add', this.callback );
    this.state.order.off('remove', this.callback );
  },
  render: function(){
    // console.log(this.state.router.current);
    if(this.state.router.current == 'index'){
      return ( <InfoPanel /> );
    }
    if(this.state.router.current == 'order'){
      return (
        <div className="container-fluid order-holder">
          <Order menu={this.state.menu} setOrder={this.setOrder} />
          <OrderSidebar order={this.state.order} removeOrder={this.removeOrder} />
        </div>
     );
    }
    if(this.state.router.current == 'pay'){
      return (
        <div className="container-fluid order-holder">
          <PayForm order={ this.state.order } resetOrder={this.resetOrder}/>
        </div>
      )
    }
    if(this.state.router.current == 'item'){
      return (
        <div>
          <div>Item Selection Page</div>
          <div>Item #{this.state.router.itemId }</div>
        </div>
      );
    }
    if(this.state.router.current == 'track'){
      console.log('track setup');
      return (
        <ThaiTracker />
      );
    }
    if(this.state.router.current == 'backend-login'){
      return (
        <Login />
      );
    }
    if(this.state.router.current == 'backend'){
      return (
        <Backend />
      );
    }
    if(this.state.router.current == 'catch'){
      // return (
      //   <div>
      //     <div>Catchall Page ( not recognized by router )</div>
      //     <div>Caught URL was baseUrl/#{this.state.router.currentSplat }</div>
      //   </div>
      // );
    }
  }
});

module.exports = InterfaceComponent;
