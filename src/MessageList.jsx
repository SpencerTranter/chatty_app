import React, {Component} from 'react';
import Message from './Message.jsx';
import Notificaiton from './Notification.jsx';

const MessageList = React.createClass ({

  renderMessage(result) {

    if (result.type === 'incoming_notification') {
      return (
        <Notificaiton
          key={result.id}
          notification={result.content}
        />
      );
    } else {
      return (
        <Message
          key={result.id}
          username={result.username}
          message={result.content}
          color={result.color}
        />
      );
    }
  },

  render: function() {
    return (
      <div id="message-list">
      {this.props.messages.map((result) => (
        this.renderMessage(result)
      ))}
      </div>
    );
  }
});

export default MessageList;