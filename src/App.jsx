import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const App = React.createClass ({
  getInitialState: function () {
     var data = {
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
      var event_data = JSON.parse(event.data);

      switch(event_data.type ) {
        case 'colorAssigned':
        console.log('You have been assigned color ' + event_data.color);
          this.state.data.currentUser.color = event_data.color;
          break;
        case 'client_info':
          this.state.data.clients = event_data.client_number;
          break;
        case 'incoming_notification':
          this.state.data.messages.push(event_data);
          break;
        case 'incoming_message':
          this.state.data.messages.push(event_data);
      }
      this.setState({data: this.state.data});
    }
  },

  handleKeyUp(e) {
    if(e.key === 'Enter' && e.target.id === 'username'){
      var notification = `${this.state.data.currentUser.name} changed their name to ${e.target.value}.`;
      this.socket.send(JSON.stringify({
        type: 'post_notification',
        content: notification
      }));
      this.state.data.currentUser.name = e.target.value;

    } else if (e.key === 'Enter' && e.target.id === 'new-message'){
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
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
});
export default App;
