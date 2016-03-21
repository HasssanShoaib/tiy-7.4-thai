var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var CompleteOrder = require('../models').CompleteOrder;

var PayForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      addressln1: '',
      aptste: '',
      city: '',
      st: '',
      zip: '',
      additionalinfo: '',
      tip: '',
      cardnum: '',
      exprymonth: '',
      expryyr: '',
      cvv: '',
      cardholdername: ''
    };
  },
  sendOrder: function(e){
    e.preventDefault();
    var order = $.extend( {}, {order: this.props.order.toJSON() }, { customer: this.state } );
    console.log('order: ');
    console.log(order);
    var completeOrder = new CompleteOrder( order );
    completeOrder.save();
  },
  render: function(){
    if(this.props.order){
      var date = new Date();
      date = date.getFullYear();
      var totalPrice = this.props.order.reduce(function(memo, model){
        var pricePer = Number(model.get('price'));
        var numOrdered = Number(model.get('numOrdered'));
        var totalPer = numOrdered * pricePer;
        return memo + totalPer;
      }, 0 );
      return (
        <div className="container pay-form">
          <div className="row">
            <h1 className="warning"><div>DO NOT ACTUALLY PUT CC INFO IN!</div>
              <div>THIS FORM IS NOT SECURE!</div>
              <div>ALSO IT DOES NOT DO ANYTHING!</div>
            </h1>
            <form className="order-pay" onSubmit={this.sendOrder}>
              <input className="half" name="firstname"
                type="text"
                valueLink={this.linkState('firstname')}
                placeholder="First Name" />
              <input className="half" name="lastname"
                type="text"
                valueLink={this.linkState('lastname')}
                placeholder="Last Name" />
              <input className="half" name="email"
                type="email"
                valueLink={this.linkState('email')}
                placeholder="Email" />
              <input className="half" name="phone"
                type="tel"
                valueLink={this.linkState('phone')}
                placeholder="Telephone Number" />
              <input name="addressln1"
                type="text"
                valueLink={this.linkState('addressln1')}
                placeholder="Address" />
              <input name="aptste"
                type="text"
                valueLink={this.linkState('aptste')}
                placeholder="Apt. / Suite" />
              <input className="half" name="city"
                type="text"
                valueLink={this.linkState('city')}
                placeholder="City" />
              <input className="fourth" name="st"
                type="text"
                valueLink={this.linkState('st')}
                placeholder="ST" />
              <input className="fourth" name="zip"
                type="number"
                valueLink={this.linkState('zip')}
                placeholder="ZIP" />
              <textarea name="additionalinfo"
                valueLink={this.linkState('additionalinfo')}
                placeholder="Additional requests or information for the delivery driver."></textarea>
              <input className="half" name="tip"
                type="number"
                valueLink={this.linkState('tip')}
                placeholder="Tip" />
              <span className="sixth pct">10%: ${ Number(totalPrice * .1).toFixed(2) }</span>
              <span className="sixth pct">15%: ${ Number(totalPrice * .15).toFixed(2) }</span>
              <span className="sixth pct">20%: ${ Number(totalPrice * .2).toFixed(2) }</span>
              <input name="cardnum"
                type="number"
                valueLink={this.linkState('cardnum')}
                placeholder="Credit Card Number" />
              <input className="third" name="exprymonth"
                type="number"
                min="01"
                max="12"
                valueLink={this.linkState('exprymonth')}
                placeholder="MM" />
              <input className="third" name="expryyr"
                type="number"
                valueLink={this.linkState('expryyr')}
                min={ date }
                max={ date + 20 }
                placeholder="YYYY" />
              <input className="third" name="cvv"
                type="number"
                valueLink={this.linkState('cvv')}
                placeholder="CVV" />
              <input name="cardholdername"
                type="text"
                valueLink={this.linkState('cardholdername')}
                placeholder="Cardholder Name" />
              <button>PLACE ORDER</button>
            </form>
          </div>
        </div>
      );
    }else{
      Backbone.history.navigate('order', {trigger: true});
    }
  }
})

module.exports = PayForm;
