import React, {Component} from 'react';

const ChatBar = React.createClass ({

  render: function() {
    return (
    <footer>
      <input
        id="username"
        type="text"
        placeholder="Anonymous"
        onKeyUp={this.props.username_input}
      />
      <input
        id="new-message"
        type="text"
        onKeyUp={this.props.message_input}
        placeholder="Type a message and hit ENTER"
      />
    </footer>
    );
  }
});

export default ChatBar;