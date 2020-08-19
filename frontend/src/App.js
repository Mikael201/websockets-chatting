import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
let socket;
const App = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('')
  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.on("MSG_TO_CLIENTS", data => {
      console.log("msg to clients" + messages)
      setMessages(messages.concat(data));
    });
  }, []);

  const send = () => {
    socket.emit('MSG_TO_BACKEND', msg)
    setMsg('')
  }

  const change = event => {
    setMsg(event.target.value)
  }

  const displayMessages = () =>
    messages.map(message => 
      <div>
        {message} <br />
      </div>
    )

  return (
    <div>
      <input type="text" value={msg} onChange={change}></input>
      <button onClick = {send}>send</button>
      <h1>The Chat:</h1>
      {displayMessages()}
    </div>
  );
}

export default App;