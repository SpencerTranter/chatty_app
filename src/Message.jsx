import React, {Component} from 'react';

const Message = React.createClass ({
  render: function() {
    return (
      <div className="message">
        <span style={{color: this.props.color}} className="username">
          {this.props.username}
        </span>
        <span className="content">
        {this.props.message}
        </span>
      </div>
    );
  }
});
export default Message;