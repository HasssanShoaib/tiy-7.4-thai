var React = require('react');
var models = require('../models');

var BackendSidebar = require('./backend-sidebar.jsx');
var BackendOrderDetail = require('./backend-order-detail.jsx');

var Backend = React.createClass({
  getInitialState: function(){
    return {
      orders: new models.OrderCollection(),
      curOrder: null
    }
  },
  componentWillMount: function(){
    this.state.orders.fetch().done(function(){
      if(this.state.orders.models.length > 0){
        this.callback = (function(){
          this.forceUpdate();
        }).bind(this);
        this.setState({ curOrder: this.state.orders.at(0) });
        this.state.orders.on('add', this.callback);
        this.state.orders.on('update', this.callback);
        this.state.orders.on('remove', this.callback);
      }
    }.bind(this));

  },
  setCurOrder: function(){
    if(!this.state.curOrder){
      this.setState({curOrder: this.state.orders.at(0 )});
    }
  },
  updateStatus: function(e, order){
    var updated = this.state.orders.add( order, { merge: true } );
    updated.save();
  },
  removeOrder: function(e, order){
    this.state.orders.get( order ).destroy();
  },
  showOrder: function(e, model){
    e.preventDefault();
    this.setState({curOrder: model});
  },
  render: function(){
    if(this.state.orders.models.length > 0){
      return (
        <div className="container-fluid backend">
          <div className="container">
            <div className="row">
              <BackendSidebar orders={this.state.orders} showOrder={this.showOrder} />
              <BackendOrderDetail
                order={this.state.curOrder}
                removeOrder={this.removeOrder}
                updateStatus={this.updateStatus} />
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className="container-fluid order-holder">
          <div className="container">
            <div className="row">
              <div className="no-orders">
                <h1>No Orders At This Time</h1>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = Backend;
