var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var _ = require('underscore');

var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;
var MenuDetail = React.createClass({
  addToOrder: function(e){
    e.preventDefault();
    this.props.setOrder( this.props.model );
  },
  render: function(){
    var price = this.props.model.get('price');
    return (
      <div className="menu-item-detail" onClick={this.addToOrder}>
        <div className="item-detail-top">
          <span className="item-title">{this.props.model.get('title')}</span>
          <span className="item-price">${ Number(price).toFixed(2) }</span>
        </div>
        <div className="item-detail-bottom">
          {this.props.model.get('description')}
        </div>
      </div>
    );
  }
});


var Order = React.createClass({
  render: function(){
    var cats = this.props.menu.groupBy(function(model){
      return model.get('type');
    });
    var panelKey = 0;
    var MenuCats = _.map( cats, function( itemArray, propName ){
      panelKey += 1;
      var MenuItems = _.map( itemArray, function( model, key ){
        return (
          <MenuDetail model={model} key={model.get('id')} setOrder={this.props.setOrder} />
        );
      }.bind(this));
      return (<Panel bsClass="order-panel" header={propName} eventKey={panelKey} key={panelKey}>
        {MenuItems}
      </Panel> );
    }.bind(this));
    return (
        <Accordion bsClass="order-accordion" defaultActiveKey="1" >
          {MenuCats}
        </Accordion>
    );
  }
});

module.exports = Order;
