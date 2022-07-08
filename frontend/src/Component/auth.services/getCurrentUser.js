import React from "react";

const getCurrentUser = () => {
  return localStorage.getItem("username");
};

export default getCurrentUser;
