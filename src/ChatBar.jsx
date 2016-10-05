import React, {Component} from 'react';

const ChatBar = React.createClass ({

  render: function() {
    return (
    <footer>
      <input
        id="username"
        type="text"
        placeholder="Anonymous"
        onKeyUp={this.props.onKeyUp}
      />
      <input
        id="new-message"
        type="text"
        onKeyUp={this.props.onKeyUp}
        placeholder="Type a message and hit ENTER"
      />
    </footer>
    );
  }
});

export default ChatBar;