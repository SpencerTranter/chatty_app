import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const App = React.createClass ({
  getInitialState: function () {
     let data = {
      currentUser: {
        name: 'Anonymous',
        color: 'black'
      },
      messages: [],
      clients: 0
    };
    return {data: data};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");

    this.socket.onmessage = (event) => {
      let event_data = JSON.parse(event.data);
      let new_data = Object.assign({}, this.state.data);

      switch(event_data.type ) {
        case 'colorAssigned':
          console.log('You have been assigned color ' + event_data.color);
            new_data.currentUser.color = event_data.color;
          break;
        case 'client_info':
          new_data.clients = event_data.client_number;
          break;
        case 'incoming_notification':
          new_data.messages.push(event_data);
          break;
        case 'incoming_message':
          new_data.messages.push(event_data);
      }
      this.setState({data: new_data});
    }
  },

  handle_username_input(e) {
    if (e.key === 'Enter') {
      let new_data = Object.assign({}, this.state.data);
      let notification = `${this.state.data.currentUser.name} changed their name to ${e.target.value}.`;
      this.socket.send(JSON.stringify({
        type: 'post_notification',
        content: notification
      }));
      new_data.currentUser.name = e.target.value;
      this.setState({data: new_data});
    }
  },

  handle_message_input(e) {
    if (e.key === 'Enter') {
      this.socket.send(JSON.stringify({
        type: 'post_message',
        color: this.state.data.currentUser.color,
        username: this.state.data.currentUser.name,
        content: e.target.value
      }));
    }
  },

  render: function() {

    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <p>Clients Online: {this.state.data.clients}</p>
        </nav>
        <MessageList
          messages={this.state.data.messages}
        />
        <ChatBar
          user={this.state.data.currentUser.name}
          message_input = {this.handle_message_input}
          username_input = {this.handle_username_input}
        />
      </div>
    );
  }
});
export default App;
