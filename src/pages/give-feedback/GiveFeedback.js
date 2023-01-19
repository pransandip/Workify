import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Colors from "../../Styles-Elements/Colors";
import TextField from "@mui/material/TextField";
import {
  Heading2Bold,
  Heading6Medium,
  InputLabel,
  Error,
} from "../../Styles-Elements/Labels";
import { PrimaryButton } from "../../Styles-Elements/Buttons";
import { Textfield, TextAreafield } from "../../Styles-Elements/Inputs";
import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";
import axios, { imageBase, workerImageBase } from "../../api/axios";

// Material UI for the snackbar
import Grid from "@mui/material/Grid";

import Sidebar from "../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../Styles-Elements/Heading/Header";

import "./GiveFeedback.scss";

// Importing localised strings
const strings = require("../../localisation_en.json");

function GiveFeedback(props) {
  const userData = useSelector((state) => state.userData.data);
  let RegexString =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let user_data = userData
    ? userData
    : JSON.parse(localStorage.getItem("user"));

  let token = localStorage.getItem("token");

  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  // (basically for the checkout button to work on the manage seats section)
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const validateEmail = (mail) => {
    if (!RegexString.test(mail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = () => {
    if (name !== "" && email !== "" && message !== "" && !emailError) {
      const params = new URLSearchParams();
      params.append("business_id", user_data.id);
      params.append("name", name);
      params.append("email", email);
      params.append("msg", user_data);

      axios.post(`api/feedback/business/add`, params, config).then((res) => {
        if (res.data.ack === 1) {
          console.log(res);
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: res.data.msg,
          });
        } else {
          let message = "";
          Array.isArray(res.data.msg)
            ? res.data.msg.length > 0 &&
              res.data.msg.forEach((item) => {
                message = message + " " + Object.values(item)[0];
              })
            : (message = res.data.msg);
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: message,
          });
        }
      });
    } else {
      if (name === "") {
        setNameError(true);
      }
      if (email === "") {
        setEmailError(true);
      }
      if (message === "") {
        setMessageError(true);
      }
    }
  };

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className="givefeedback-holder">
          <div className="top-bg"></div>
          <Grid container spacing={2} justifyContent="center">
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <Heading2Bold
                text={strings.giveFeedback}
                color={Colors.black}
                margin={"0 0 30px 0"}
              />
            </Grid>
            <Grid
              xs={7}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <Heading6Medium
                text={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s."
                }
                color={Colors.black}
                textAlign={"center"}
                margin={"0px 0 56px 0"}
              />
            </Grid>
          </Grid>
          <Grid
            container
            xs={8}
            margin={"auto"}
            spacing={2}
            justifyContent="center"
            className={"max-width620"}
          >
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <Heading6Medium
                text={strings.anyQuestionOrRemarksJustWriteUsAMessage}
                color={Colors.black}
                textAlign={"center"}
                margin={"16px 0 16px 0"}
              />
            </Grid>
            <Grid item xs={6} style={{ paddingTop: "0px" }}>
              <div className="grid-item">
                <InputLabel
                  text={strings.name}
                  color={Colors.nightGray}
                  padding={"0 0 8px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  placeholder={strings.enterYourName}
                  className={
                    nameError === null
                      ? "textfield"
                      : nameError === true
                      ? "input-error textfield"
                      : "input-success textfield"
                  }
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value !== "") {
                      setNameError(false);
                    } else {
                      setNameError(true);
                    }
                  }}
                />
                {nameError && (
                  <Error
                    className="inputerror"
                    text={`Enter a valid Name`}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: "0px" }}>
              <div className="grid-item">
                <InputLabel
                  text={strings.email}
                  color={Colors.nightGray}
                  padding={"0 0 8px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  placeholder={strings.enterYourEmailAddress}
                  className={
                    emailError === null
                      ? "textfield"
                      : emailError === true
                      ? "input-error textfield"
                      : "input-success textfield"
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value !== "") {
                      setEmailError(false);
                    } else {
                      setEmailError(true);
                    }
                    validateEmail(e.target.value);
                  }}
                />
                {emailError && (
                  <Error
                    className="inputerror"
                    text={strings.enterValidEmailAddress}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: "0px" }}>
              <div className="grid-item">
                <InputLabel
                  text={strings.message}
                  color={Colors.nightGray}
                  padding={"0 0 8px 0"}
                  className={"inputlabel"}
                />
                <TextAreafield
                  placeholder={strings.writeHere}
                  className="textareafield textarea"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (e.target.value !== "") {
                      setMessageError(false);
                    } else {
                      setMessageError(true);
                    }
                  }}
                />
                {messageError && (
                  <Error
                    className="inputerror"
                    text={`Enter a Message`}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
                {/* <TextField placeholder={strings.writeHere}  multiline  rows={3} defaultValue="" className="textfield" /> */}
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "0px" }}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <PrimaryButton
                className="primarybutton"
                text={strings.submit}
                width={"172px"}
                height={"56px"}
                margin={"8px 0 16px 0"}
                onClick={handleSubmit}
              />
            </Grid>
          </Grid>

          <Popup
            popupIsOpen={popupOpen}
            style={POPUP_TYPE.RESET_PASSWORD}
            closePopup={() => setPopupOpen(false)}
          />
        </div>
      </div>
      {confirmationOpen && (
        <Popup
          popupIsOpen={confirmationOpen}
          style={POPUP_TYPE.CONFIRMATION}
          type={confirmationType}
          closePopup={() => setConfirmationOpen(false)}
        />
      )}
    </div>
  );
}

export default GiveFeedback;
