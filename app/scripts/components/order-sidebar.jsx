var React = require('react');

var OrderSidebar = React.createClass({
  render: function(){
    return (
      <div className="order-sidebar">
        <div className="order-panel">
          <div className="order-panel-title">Your Order</div>
          <div className="order-panel-collapse collapse in" aria-hidden="false" role="tabpanel">
            <div className="order-panel-body">
              Orders Go In Here
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OrderSidebar;
