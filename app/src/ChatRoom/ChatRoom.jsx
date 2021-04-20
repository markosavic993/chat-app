import React from "react";

import "./ChatRoom.scss";
import useChat from "../useChat";

const ChatRoom = (props) => {

  const roomId = '1';
  const {messages, sendMessage} = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log(newMessage);
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <h1>Room: Hardcoded room name</h1>
      <div className="container">
        <div className="messages">
          <ol className="messagesList">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "myMessage" : "receivedMessage"
                }`}
              >
                {message.body}
              </li>
            ))}
          </ol>
        </div>
        <textarea name="messageArea" value={newMessage} onChange={handleNewMessageChange} placeholder="Write message..."/>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
