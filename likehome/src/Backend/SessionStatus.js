import { useState, useEffect } from "react";
import { getSession } from "./auth.js";

const Status = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      console.log("Session: ", session);
      setStatus(true);
    });
  }, []);
  return status;
};
export default Status;
