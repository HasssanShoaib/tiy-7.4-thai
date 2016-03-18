var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var _ = require('underscore');
var $ = require('jquery');

var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;

var Options = React.createClass({
  getInitialState: function(){
    return {
      value: 0
    };
  },
  handleOption: function(e, key){
    this.setState({'value': key-1 });
    console.log(key);
    console.log(this.state);
    console.log(this.props.options[this.state.value]);

  },
  render: function(){
    var eventKey = 0;
    var MenuItems = this.props.options.map(function(option){
      eventKey += 1;
      return (
        <MenuItem eventKey={ String(eventKey) } >{option}</MenuItem>
      );
    });
    return (
      <DropdownButton
        bsSize="xsmall"
        title={this.props.options[this.state.value]}
        id={"dropdown-size-extra-small"}
        onSelect={ this.handleOption }
        value={this.props.options[this.state.value]} >
        {MenuItems}
      </DropdownButton>
    );
  }
});

var MenuDetail = React.createClass({
  getInitialState: function(){
    return {
      numOrdered: 1
     };
  },
  handleInput: function(e){
    e.preventDefault();
    this.setState({numOrdered: e.target.value });
  },
  addToOrder: function(e){
    e.preventDefault();
    console.log(e.target);
    this.props.setOrder( this.props.model );
  },
  render: function(){
    var price = this.props.model.get('price');
    var options = this.props.model.get('options');
    if(options){
      options = options.map(function(optionArr){
        return ( <Options options={optionArr} /> );
      });
    }else{
      options = '';
    }
    return (
      <div className="menu-item-detail" >
        <div className="item-detail-top">
          <span className="item-title">{this.props.model.get('title')}</span>
          <span className="item-price">${ Number(price).toFixed(2) }</span>
        </div>
        <div className="item-detail-bottom">
          {this.props.model.get('description')}
        </div>
        <form className="options-form" onSubmit={this.addToOrder}>
          <div className="options-left">
            {options}
          </div>
          <div className="options-right">
            <input className="num-to-order" type="number" value={this.state.numOrdered} onChange={this.handleInput}/>
            <button className="order-submit" type="submit" href="#" >ADD TO ORDER</button>
          </div>
        </form>
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
      return (<Panel bsClass="order-panel" header={propName} eventKey={ String(panelKey) } key={panelKey}>
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
