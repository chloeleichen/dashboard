import React from 'react';
import ReactDOM from 'react-dom';

const HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, document.getElementById('main'));
