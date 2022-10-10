import { createContext, useState } from "react";
import { Notification } from "../Shared/Notifications";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState(undefined);

  const handleClose = () => {
    setOpen(false);
  };

  const getError = (msg) => {
    setSeverity("error");
    setOpen(true);
    setMsg(msg);
  };
  const getSuccess = (msg) => {
    setSeverity("success");
    setOpen(true);
    setMsg(msg);
  };

  const value = {
    getError,
    getSuccess,
  };

  return (
    <NotificationContext.Provider value={value}>
      <Notification
        handleClose={handleClose}
        open={open}
        severity={severity}
        msg={msg}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
