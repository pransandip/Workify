import React, { useState, useEffect } from "react";
import * as Colors from "../../Styles-Elements/Colors";
import { Textfield } from "../../Styles-Elements/Inputs";
import {
  NeutralLightButton,
  TransparentButton,
  SecondaryButton,
  PrimaryButton,
} from "../../Styles-Elements/Buttons";
import {
  Heading6Medium,
  InputLabel,
  Error,
} from "../../Styles-Elements/Labels";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";
import axios from "../../api/axios";
import CroseImg from "../../image-assets/structure/crose-icon-gray.svg";

// Importing localised strings
const strings = require("../../localisation_en.json");

function AccountSettingEmail(props) {
  const [isCheckedTwo, setIsCheckedTwo] = React.useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailVarification, setOpen] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [counter, setCounter] = useState(0);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  let RegexString =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const params = new URLSearchParams();
  const handleResend = () => {
    //setCounter(59);
    params.append("email", email);
    params.append("type", "change_email");
    axios
      .post("/api/sent-otp-for-change-email", params, config)
      .then((res) => {
        if (res.data.ack === 1) {
          setConfirmationOpen(true);
          props.setEmailConfirmation(true);
          setConfirmationType({
            type: "success",
            message: "OTP sent to Entered Email",
          });
        } else if (res.data.ack === 0) {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg,
          });
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const handleVerifyCode = () => {
    const params2 = new URLSearchParams();
    params2.append("email", email);
    params2.append("otp", otp);
    if (otp !== "") {
      props.changeEmail(params2);
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const emailVarificationClickOpen = () => {
    if (email !== "" || !emailError) {
      // handleResend();
      // setCounter(30);

      /*? code added ?*/
      const params2 = new URLSearchParams();
      params2.append("email", email);
      props.changeEmail(params2);
      /*? code added ?*/

      setEmailError(false);

      /*? code added ?*/
      setIsCheckedTwo((prev) => !prev);
      /*? code added ?*/
      
    } else {
      setEmailError(true);
    }
  };
  const handleClose = () => {
    props.setEmailConfirmation(false);
    setCounter(0);
  };
  const handleExpand = () => {
    setEmail(props.fileds ? props.fileds.email : "");
  };

  const validateEmail = (value) => {
    if (!RegexString.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <>
      <Grid className={"account-flex-row"} marginBottom={"40px"}>
        <div className={"left-heading"}>
          <Heading6Medium
            text={strings.Email}
            fontWeight={"700"}
            color={Colors.nightGray}
            className={"heading6medium"}
          />
        </div>
        <div className={"value-text"}>
          <div style={{ display: "block" }}>
            <Collapse in={isCheckedTwo}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                className={"width340"}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="grid-item">
                    <InputLabel
                      text={strings.Email}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <Textfield
                      className={
                        emailError ? "input-error textfield" : "input textfield"
                      }
                      placeholder={""}
                      value={email}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setEmailError(true);
                        } else {
                          setEmailError(false);
                        }
                        setEmail(e.target.value);
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
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                margin={"30px 0px 0px 0px"}
              >
                <TransparentButton
                  className="transparentbutton"
                  width={"100px"}
                  text={strings.cancel}
                  onClick={() => {
                    setIsCheckedTwo((prev) => !prev);
                  }}
                />
                {emailError === false ? (
                  <SecondaryButton
                    className="primarybutton"
                    text={strings.Update}
                    width={"113px"}
                    onClick={emailVarificationClickOpen}
                  />
                ) : (
                  <NeutralLightButton
                    className="neutrallightbutton"
                    text={strings.Update}
                    onClick={emailVarificationClickOpen}
                    width={"113px"}
                  />
                )}
              </Grid>
            </Collapse>
            <span className="change-value-text">
              {props.fileds && props.fileds.email}
            </span>
          </div>
        </div>
        <div className={"editTextBox"}>
          <FormControlLabel
            control={
              <input
                type="checkbox"
                checked={isCheckedTwo}
                onChange={() => {
                  setIsCheckedTwo((prev) => !prev);
                  handleExpand();
                }}
              />
            }
            label="Edit"
          />
        </div>
      </Grid>

      <Dialog
        open={props.emailConfirmation}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "0px" }}>
          <h2 className={"heading30"} style={{ margin: "10px 0px" }}>
            {strings.VerifyEmail}
          </h2>
          <DialogContentText id="alert-dialog-description">
            Enter the verification code that was sent to <br />
            {email}
          </DialogContentText>
          <div className="grid-item">
            <div className={"email-resend"}>
              <Textfield
                className={
                  otpError ? "input-error textfield" : "input textfield"
                }
                placeholder={strings.Enterverificationcode}
                value={otp}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setOtpError(true);
                  } else {
                    setOtpError(false);
                  }
                  setOtp(e.target.value);
                }}
              />
              {otpError && (
                <Error
                  className="inputerror"
                  text={"OTP is required"}
                  color={Colors.error}
                  margin={"4px 0 8px 0"}
                />
              )}
              <span className={"seconds"}>{`00:${counter === 0 ? "00" : counter
                }`}</span>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {counter === 0 ? (
            <SecondaryButton
              className="transparentbutton"
              text={strings.ResendCode}
              width={"auto"}
              onClick={handleResend}
            />
          ) : (
            <TransparentButton
              className="transparentbutton"
              onClick={handleClose}
              text={strings.ResendCode}
              width={"auto"}
            />
          )}

          <div style={{ marginLeft: "10px" }}>
            <PrimaryButton
              onClick={handleVerifyCode}
              className="neutrallightbutton"
              autoFocus
              text={strings.VerifyCode}
              width={"116px"}
            />
          </div>

          {/* <NeutralLightButton
            className="neutrallightbutton"
            autoFocus
            text={strings.VerifyCode}
            width={"116px"}
          /> */}
        </DialogActions>
      </Dialog>

      {confirmationOpen && (
        <Popup
          popupIsOpen={confirmationOpen}
          style={POPUP_TYPE.CONFIRMATION}
          type={confirmationType}
          closePopup={() => setConfirmationOpen(false)}
        />
      )}
    </>
  );
}

export default AccountSettingEmail;
