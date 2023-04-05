import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import jwt from "jwt-decode";
import { ACTIONS } from "../store/actions";
import { dispatchUpdateUserObject } from "../store/dispatchers/userDispatcher";

export const getFormData = (object) => {
  let newObj = {
    ...object,
  };
  delete newObj["previewModal"];
  delete newObj["location_data"];
  delete newObj["certificate_and_licence_data"];
  delete newObj["gig_type"];

  if (object.day_type === "single") {
    delete newObj["enddate"];
  }

  const formData = new FormData();
  Object.keys(newObj).forEach((key) => formData.append(key, object[key]));
  return formData;
};
