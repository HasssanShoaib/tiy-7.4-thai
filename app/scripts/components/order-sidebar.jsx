var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');

var SideBarOption = React.createClass({
  render: function(){
    return (
      <span className="item-option"> - {this.props.title}</span>
    );
  }
});

var SidebarDetail = React.createClass({
  remove: function(e){
    e.preventDefault();
    this.props.removeOrder( this.props.model );
  },
  render: function(){
    var model = this.props.model;
    var price = model.get('price');
    var total = model.get('numOrdered') * price;
    var options = '';
    if(model.get('options')){
      options = model.get('options').map(function(option){
        return <SideBarOption key={option} title={option} />
      });
      console.log(options);
    }
    return (
      <div className="menu-item-detail" >
        <div className="item-detail-top">
          <i className="fa fa-times order-remove" onClick={this.remove} ></i>
          <span className="item-title">{model.get('title')}</span>
          {options}
        </div>
        <div className="item-detail-bottom">
          <span className="item-price">${ Number(price).toFixed(2) } x {model.get('numOrdered') } = ${ Number(total).toFixed(2) }</span>
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
    // console.log('inside remove of OrderSidebar');
    this.state.order.remove( model );
  },
  componentWillMount: function(){
    this.state.order.on('change', this.render );
  },
  goPay: function(){
    Backbone.history.navigate('pay', { trigger: true });
  },
  render: function(){
    // console.log(this.state.order);
    var orderItems = this.state.order.map(function(model){
      return ( <SidebarDetail model={model} key={model.cid} removeOrder={this.props.removeOrder} /> );
    }.bind(this));
    var totalPrice = this.state.order.reduce(function(memo, model){
      var pricePer = Number(model.get('price'));
      var numOrdered = Number(model.get('numOrdered'));
      var totalPer = numOrdered * pricePer;
      return memo + totalPer;
    }, 0 );
    var buttonClass;
    if(totalPrice){
      totalPrice = '$' + Number(totalPrice).toFixed(2);
      buttonClass = "submit-order";
    }else{
      totalPrice = '';
      buttonClass = "submit-order hidden";
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
                  <span className="total-price">{ totalPrice }</span>
                </div>
                <div className="item-detail-bottom">
                  <button
                    className={buttonClass}
                    onClick={this.goPay}
                  >PLACE YOUR ORDER</button>
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
