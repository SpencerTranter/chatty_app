import React, {Component} from 'react';

const Notification = React.createClass ({
  render: function() {
    return (
      <div className="message">
        <span className="content">{this.props.notification}</span>
      </div>
    );
  }
});
export default Notification;