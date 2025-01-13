import React from "react";
import { useAlert } from "./AlertContent";
import "./alert.css";

const Alert = () => {
  const { alert } = useAlert();

  if (!alert.message) return null;

  return <div className={`alert alert-${alert.type}`}>{alert.message}</div>;
};

export default Alert;
