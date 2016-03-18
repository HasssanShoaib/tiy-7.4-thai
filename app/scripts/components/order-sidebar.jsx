var React = require('react');
var _ = require('underscore');


var SidebarDetail = React.createClass({
  remove: function(e){
    e.preventDefault();
    this.props.removeOrder( this.props.model );
  },
  render: function(){
    var price = this.props.model.get('price');
    return (
      <div className="menu-item-detail" onClick={this.remove}>
        <div className="item-detail-top">
          <span className="item-title">{this.props.model.get('title')}</span>
          <span className="item-price">${ Number(price).toFixed(2) }</span>
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  }
});


var OrderSidebar = React.createClass({
  getInitialState: function(){
    return {
      order: this.props.order,
    };
  },
  remove: function( model ){
    console.log('inside remove of OrderSidebar');
    this.state.order.remove( model );
  },
  componentWillMount: function(){
    this.state.order.on('change', this.render );
  },
  render: function(){
    console.log(this.state.order);
    var orderItems = this.state.order.map(function(model){
      console.log(model);
      return ( <SidebarDetail model={model} key={model.get('cid')} removeOrder={this.props.removeOrder} /> );
    }.bind(this));
    var totalPrice = this.state.order.reduce(function(memo, model){
      return memo + Number(model.get('price'));
    }, 0 );
    console.log(totalPrice);
    if(totalPrice){
      totalPrice = '$' + Number(totalPrice).toFixed(2);
    }else{
      totalPrice = '';
    }
    return (
      <div className="order-sidebar">
        <div className="order-panel">
          <div className="order-panel-title">Your Order</div>
          <div className="order-panel-collapse collapse in" aria-hidden="false" role="tabpanel">
            <div className="order-panel-body">
              {orderItems}
              <div className="menu-item-detail">
                <div className="item-detail-top">
                  <span className="item-price">{ totalPrice }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OrderSidebar;
