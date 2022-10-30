import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styles from "./chatContainer.module.css";
import Button from "@mui/material/Button";

const socket = io(process.env.REACT_APP_SERVER);

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    const receiveMessage = (message) => {
      setMessages([...messages, message]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.chatContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button variant="contained" type="submit">
              Send
            </Button>
          </div>
        </form>
        <ul>
          {messages.map((message, index) => (
            <li
              key={index}
              className={
                message.from === "Me" ? styles.fromMe : styles.fromOther
              }
            >
              {message.from}: <b>{message.body}</b>
            </li>
          ))}
          <li ref={lastMessageRef} />
        </ul>
      </div>
    </div>
  );
}

export default ChatContainer;
