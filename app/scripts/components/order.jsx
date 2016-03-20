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
    this.props.handleOption(e, key, this.props.optName );
    // this.setState({'value': key-1 });
  },
  render: function(){
    var eventKey = 0;
    var MenuItems = this.props.options.map(function(option){
      eventKey += 1;
      return (
        <MenuItem eventKey={ String(  eventKey) } key={ eventKey } >{option}</MenuItem>
      );
    }.bind(this));
    return (
      <DropdownButton
        bsSize="xsmall"
        title={this.props.options[this.props.value]}
        id={"dropdown-size-extra-small"}
        onSelect={ this.handleOption }
        value={this.props.options[this.props.value]}
        key={ this.props.optName }
        ref={ this.props.optName } >
        {MenuItems}
      </DropdownButton>
    );
  }
});

var MenuDetail = React.createClass({
  getInitialState: function(){
    return {
      numOrdered: 1,
     };
  },
  componentWillMount: function(){
    //set up state variables for the options so that we can get them on submit
    var options = this.props.model.get('options');
    if(options){
      var optKey = 0;
      options = options.reduce(function(memo, optionArr){
        optKey += 1;
        var optName = 'option-' + optKey;
        memo[optName] = '0';
        return memo;
      }, {});
      this.setState(options);
    }else{
      options = {};
    }
  },
  handleInput: function(e){
    e.preventDefault();
    this.setState({numOrdered: e.target.value });
  },
  handleOption: function(e, key, optKey){
    var state = {};
    state[optKey] = key-1;
    this.setState(state);
  },
  addToOrder: function(e){
    e.preventDefault();
    var options = this.props.model.get('options');
    if(options){
      var optKey = 0;
      options = options.map(function(optionArr){
        optKey += 1;
        var optName = 'option-' + optKey;
        // console.log(this.state);
        var optVal = optionArr[this.state[optName]];
        return optVal;
      }.bind(this));
    }else{
      options = '';
    }
    this.props.setOrder( this.props.model, this.state.numOrdered, options );
  },
  render: function(){
    var price = this.props.model.get('price');
    var options = this.props.model.get('options');
    var optKey = 0;
    if(options){
      options = options.map(function(optionArr){
        optKey += 1;
        var optName = 'option-' + optKey;
        return ( <Options
          options={optionArr}
          key={ optKey }
          handleOption={this.handleOption}
          optName = {optName}
          value={this.state[optName]} /> );
      }.bind(this));
    }else{
      options = '';
    }
    return (
      <div className="menu-item-detail" >
        <div className="item-detail-top">
          <span className="item-title">{this.props.model.get('title')}</span>
        </div>
        <div className="item-detail-bottom">
          {this.props.model.get('description')}
        </div>
        <form className="options-form" onSubmit={this.addToOrder}>
          <div className="options-left">
            {options}
          </div>
          <div className="options-right">
            <span className="item-price">${ Number(price).toFixed(2) } x </span>
              <input
                className="num-to-order"
                type="number" min="1" max="10"
                value={this.state.numOrdered}
                onChange={this.handleInput}/>
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
          <MenuDetail model={model} key={model.cid} setOrder={this.props.setOrder} />
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
