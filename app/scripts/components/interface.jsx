var React = require('react');

var InfoPanel = require('./info.jsx');

var InterfaceComponent = React.createClass({
  getInitialState: function(){
    return {
      router: this.props.router
    };
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback );
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback );
  },
  render: function(){
    console.log(this.state.router.current);
    if(this.state.router.current == 'index'){
      return ( <InfoPanel /> );
    }
    if(this.state.router.current == 'order'){
      return ( <div>Menu Page</div> );
    }
    if(this.state.router.current == 'item'){
      return (
        <div>
          <div>Item Selection Page</div>
          <div>Item #{this.state.router.itemId }</div>
        </div>
      );
    }
    if(this.state.router.current == 'catch'){
      return (
        <div>
          <div>Catchall Page ( not recognized by router )</div>
          <div>Caught URL was baseUrl/#{this.state.router.currentSplat }</div>
        </div>
      );
    }
  }
});

module.exports = InterfaceComponent;
