var React = require('react');
var $ = require('jquery');

var OrderOption = React.createClass({
  render: function(){
    return (
      <div className="item-option item-info">
         - {this.props.option}
      </div>
    );
  }
});

var OrderItem = React.createClass({
  render: function(){
    var model = this.props.model;
    var options = '';
    var optKey = 0;
    if(model.options){
      options = model.options.map(function(option){
        optKey += 1;
        return ( <OrderOption option={option} key={optKey} />);
      });
    }
    var suffix = '';
    if(model.numOrdered != 1){
      suffix = 's'
    }
    return (
      <li className="order-info">
        <div className="item-numOrdered item-info">{model.numOrdered} order{suffix} </div>
        <div className="item-title item-info">{model.title}</div>
        <div className="item-options item-info">
          {options}
        </div>
      </li>
    );
  }
});

var BackendOrderDetail = React.createClass({
  handleCheck: function(e){
    var status = this.props.order.get('status');
    var opt = {};
    opt[e.target.name] = e.target.checked;
    status = $.extend( {}, status, opt );
    this.props.order.set( { status: status } );
    this.props.updateStatus(e, this.props.order);
  },
  removeOrder: function(e){
    this.props.removeOrder(e, this.props.order);
  },
  render: function(){
    console.log(this.props.order);
    var customer = this.props.order.get('customer');
    var status = this.props.order.get('status');
    var orderObj = this.props.order.get('order');
    var orderKey = 0;
    var orderItems = orderObj.map(function(model){
      orderKey += 1;
      return ( <OrderItem model={model} key={ orderKey }/> );
    })
    return (
      <div id="order-detail">
        <div id="order-customer-info">
          <div className="customer-name customer">Name: {customer.firstname} {customer.lastname}</div>
          <div className="customer-phone customer">Contact Number: {customer.phone}</div>
          <div className="customer-address customer">Address: {customer.addressln1} {customer.city} {customer.st} {customer.zip}</div>
          <div className="customer-email customer">Email: {customer.email}</div>
        </div>
        <div id="order-order-info">
          <ul>
            {orderItems}
          </ul>
        </div>
        <div id="order-status">
          <form>
            <div className="preparing status">
              <div className="status-holder">
                <label htmlFor="status-1">Preparing</label>
                <input id="status-1"
                  type="checkbox"
                  name="preparing"
                  onChange={this.handleCheck}
                  checked={status.preparing} />
              </div>
            </div>
            <div className="prepared status">
              <div className="status-holder">
                <label htmlFor="status-2">Prepared</label>
                <input
                  id="status-2"
                  type="checkbox"
                  name="prepared"
                  onChange={this.handleCheck}
                  checked={status.prepared} />
              </div>
            </div>
            <div className="delivering status">
              <div className="status-holder">
                <label htmlFor="status-3">Delivering</label>
                <input
                  id="status-3"
                  type="checkbox"
                  name="delivering"
                  onChange={this.handleCheck}
                  checked={status.delivering} />
              </div>
            </div>
            <div className="delivered status">
              <div className="status-holder">
                <label htmlFor="status-4">Delivered</label>
                <input
                  id="status-4"
                  type="checkbox"
                  name="delivered"
                  onChange={this.handleCheck}
                  checked={status.delivered} />
              </div>
            </div>
          </form>
          <div className="completed-holder">
            <div className="completed-spacer">
            <button
              className="completed"
              onClick={this.removeOrder}
              >Order Completed!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BackendOrderDetail;
