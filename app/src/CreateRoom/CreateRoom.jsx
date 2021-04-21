import React from "react";
import {useHistory} from 'react-router-dom';
import "./CreateRoom.scss";

const CreateRoom = () => {

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/rooms', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, description})
    });
    const json = await response.json();
    console.log(json);
    history.push(`/rooms/${json.id}`);
  };

  return (
    <div className="container">
      <h1>Create new chat room</h1>
      <form className="roomCreationForm" onSubmit={submitHandler}>
        <label className="formField">
          Title:
          <input type="text"
                 value={title}
                 onChange={e => setTitle(e.target.value)}
                 placeholder="Enter title..."/>
        </label>

        <label className="formField">
          Topic description
          <input type="text"
                 value={description}
                 onChange={e => setDescription(e.target.value)}
                 placeholder="Enter topic description..."/>
        </label>

        <input className="submitButton" type="submit" value="Create and join"/>
      </form>
    </div>
  );
};

export default CreateRoom;
