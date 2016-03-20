var React = require('react');

var PayForm = React.createClass({
  sendOrder: function(){

  },
  render: function(){
    return (
      <div>
        <h1 className="warning">DO NOT ACTUALLY PUT CC INFO IN! THIS FORM IS NOT SECURE! </h1>
        <form className="order-pay" onSubmit={this.sendOrder}>
          <input name="firstname"></input>
          <input name="lastname"></input>
          <input name="phone"></input>
          <input name="addressln1"></input>
          <input name="aptste"></input>
          <input name="city"></input>
          <input name="st"></input>
          <input name="zip"></input>
          <input name="buildingname"></input>
          <input name="additionalinfo"></input>
          <input name="tip"></input>
          <input name="cardnum"></input>
          <input name="exprymonth"></input>
          <input name="expryyr"></input>
          <input name="cvv"></input>
          <input name="cardholdername"></input>
          <button>PLACE ORDER</button>
        </form>
      </div>
    );
  }
})

module.exports = PayForm;
