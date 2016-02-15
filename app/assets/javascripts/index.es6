import React from 'react';
import ReactDOM from 'react-dom';

const Test = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<Test name="John" />, document.getElementById('main'));
