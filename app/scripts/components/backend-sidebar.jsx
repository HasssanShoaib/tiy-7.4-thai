var React = require('react');

var SidebarOrder = React.createClass({
  showOrder: function(e){
    e.preventDefault();
    this.props.showOrder(e, this.props.model);
  },
  render: function(){
    return (
      <li className="sidebar-order-item" onClick={this.showOrder}>Order # {this.props.model.get('_id')}</li>
    );
  }
});

var BackendSidebar = React.createClass({
  render: function(){
    var orders = this.props.orders.map(function(model){
      return ( <SidebarOrder model={model} key={model.cid} showOrder={this.props.showOrder}/> );
    }.bind(this));
    return (
      <div id="sidebar">
        <ul>
          {orders}
        </ul>
      </div>
    );
  }
});

module.exports = BackendSidebar;
