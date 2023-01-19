import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import jwt from "jwt-decode";
import { ACTIONS } from "../store/actions";
import { dispatchUpdateUserObject } from "../store/dispatchers/userDispatcher";

export const refreshToken = (newToken) => {
  let token = localStorage.getItem("token");
  let configData = {
    headers: {
      Authorization: `${token}`,
    },
  };
  axios
    .get("/api/refresh_token", configData)
    .then((res) => {
      localStorage.setItem("token", res.data.data);
      let token = res.data.data;
      const user = jwt(token); // decode your token here
      localStorage.setItem("user", JSON.stringify(user));
      dispatchUpdateUserObject(user);
    })
    .catch((error) => console.log(error));
};
