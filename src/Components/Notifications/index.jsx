import { Alert, Snackbar, Typography } from "@mui/material";
import React from "react";
import Slide from "@mui/material/Slide";

export const Notification = ({ open, msg, severity, handleClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={4000}
      open={open}
      onClose={handleClose}
      /*TransitionComponent={Slide}*/
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        <Typography>{msg}</Typography>
      </Alert>
    </Snackbar>
  );
};
