var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var _ = require('underscore');

var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;
var MenuDetail = React.createClass({
  render: function(){
    return (
      <div>
        <div>{this.props.model.get('title')}</div>
        <div>{this.props.model.get('description')}</div>
        <div>{this.props.model.get('type')}</div>
        <div>{this.props.model.get('price')}</div>
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
          <MenuDetail model={model} key={model.get('id')} />
        );
      });
      console.log(panelKey);
      console.log(MenuItems);
      return (<Panel bsClass="order-panel" header={propName} eventKey={panelKey} key={panelKey}>
        {MenuItems}
      </Panel> );
    });
    return (
      <div className="container-fluid order-holder">
        <Accordion bsClass="order-accordion" defaultActiveKey="1"  >
          {MenuCats}
        </Accordion>
      </div>
    );
  }
});

module.exports = Order;
