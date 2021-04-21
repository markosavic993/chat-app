import React, {useEffect} from "react";

import "./ChatRoom.scss";
import useChat from "../useChat";

const ChatRoom = (props) => {
  const {roomId} = props.match.params;
  const {messages, sendMessage} = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [title, setTitle] = React.useState("");

  useEffect(async () => {
    const result = await fetch(`http://localhost:4000/rooms/${roomId}`);
    const room = await result.json();
    setTitle(room.title);
  });

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="cr-container">
      <h1>{title}</h1>
      <div>
        <ol className="messages">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`messageItem ${
                message.ownedByCurrentUser ? "myMessage" : "receivedMessage"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <div className="actionArea">
        <textarea name="messageArea" value={newMessage} onChange={handleNewMessageChange} rows="4" placeholder="Write message..."/>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
