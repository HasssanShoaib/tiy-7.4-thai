var React = require('react');

var InfoPanel = require('./info.jsx');
var Order = require('./order.jsx');
var OrderSidebar = require('./order-sidebar.jsx');

var InterfaceComponent = React.createClass({
  getInitialState: function(){
    return {
      router: this.props.router,
      menu: this.props.menu,
      order: this.props.order
    };
  },
  setOrder: function( model ){
    this.state.order.add(model);
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback );
    this.state.order.on('add', this.callback );
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback );
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
          <OrderSidebar order={this.state.order} />
        </div>
     );
    }
    if(this.state.router.current == 'item'){
      return (
        <div>
          <div>Item Selection Page</div>
          <div>Item #{this.state.router.itemId }</div>
        </div>
      );
    }
    if(this.state.router.current == 'catch'){
      return (
        <div>
          <div>Catchall Page ( not recognized by router )</div>
          <div>Caught URL was baseUrl/#{this.state.router.currentSplat }</div>
        </div>
      );
    }
  }
});

module.exports = InterfaceComponent;
