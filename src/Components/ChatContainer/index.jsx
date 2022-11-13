import { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import styles from "./chatContainer.module.css";
import Button from "@mui/material/Button";
import { USERContext } from "../../Context/UserContext";

const socket = io("https://ecommerce-server-production.up.railway.app/");

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef(null);
  const user = useContext(USERContext);

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
      from: user.user._id,
    };
    setMessages([...messages, newMessage]);
    setMessage("");
    socket.emit("message", newMessage);
  };
  return (
    <div className={styles.mainContainer}>
      <h1>Chat</h1>
      <div className={styles.chatContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className={styles.inputChat}
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
                message.from === user.user._id
                  ? styles.fromMe
                  : styles.fromOther
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
