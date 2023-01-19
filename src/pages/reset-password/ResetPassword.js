import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  NeutralLightButton,
  SecondaryButton,
} from "../../Styles-Elements/Buttons";
import { Textfield, InputWrapper } from "../../Styles-Elements/Inputs";
import LoginHeader from "../../Styles-Elements/login-heading/LoginHeader";
import LoginFooter from "../../Styles-Elements/login-footer/LoginFooter";
import {
  Heading2Bold,
  InputLabel,
  Heading6Medium,
  Error,
} from "../../Styles-Elements/Labels";
import * as Colors from "../../Styles-Elements/Colors";

// importing axios from api/axios.js
import axios from "../../api/axios";

import "./ResetPassword.scss";
import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";

// import images
import visibilityIcon from "../../image-assets/structure/visible.svg";
import unVisibilityIcon from "../../image-assets/structure/unvisible.svg";
import SuccessIcon from "../../image-assets/structure/success-alert.svg";

// Material UI for the snackbar
import Grid from "@mui/material/Grid";

// Importing localised strings
const strings = require("../../localisation_en.json");

function Signin() {
  const history = useHistory();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState("Password");
  const [showVisibilityIcon, setShowVisibilityIcon] = useState(true);
  const [loading, setLoading] = useState(false);

  const [resetPassword, setResetPassword] = useState("");
  const [confirmresetPassword, setConfirmResetPassword] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState(false);
  const [confirmresetPasswordError, setConfirmResetPasswordError] =
    useState(false);
  const [id, setId] = useState(5);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [newPasswordValid, setnewPasswordValid] = useState({
    lowerCharacterError: true,
    upperCharacterError: true,
    specialCharacterError: true,
    lengthError: true,
    matchPassword: true,
  });

  const user_id = location.state.user_id;

  var RegexLowerCaseLetters = /[a-z]/g;
  var RegexUpperCaseLetters = /[A-Z]/g;
  var RegexSpecialCaseLetters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const params = new URLSearchParams();
  params.append("password", resetPassword);
  params.append("id", user_id);

  const routeChange = (e) => {
    e.preventDefault();
    if (resetPassword !== "" && confirmresetPassword !== "") {
      if (!Object.values(newPasswordValid).some((item) => item === true)) {
        setLoading(true);
        axios
          .post("/api/set-password", params)
          .then((res) => {
            setLoading(false);
            if (res.data.ack === 1) {
              setConfirmationOpen(true);
              setConfirmationType({
                type: "success",
                message: res.data.msg,
              });
              setTimeout(() => {
                history.push({
                  pathname: "/signin",
                });
              }, 1000);
            } else {
              if (res.data.ack === 0) {
                setConfirmationOpen(true);
                setConfirmationType({
                  type: "error",
                  message: res.data.msg,
                });
              }
            }
          })
          .catch((err) => {
            console.log("error");
            console.log(err);
          });
      }
    } else {
      if (resetPassword === "") {
        setResetPasswordError(true);
      }
      if (confirmresetPassword === "") {
        setConfirmResetPasswordError(true);
      }
    }
    // let path = `/password-recovery-confirmation`;
    // history.push(path);
  };

  const ValidatePassword = (value) => {
    let newObj = {
      lowerCharacterError: false,
      upperCharacterError: false,
      specialCharacterError: false,
      lengthError: false,
    };
    if (!RegexLowerCaseLetters.test(value)) {
      newObj = { ...newObj, lowerCharacterError: true };
    } else {
      newObj = { ...newObj, lowerCharacterError: false };
    }
    if (!RegexUpperCaseLetters.test(value)) {
      newObj = { ...newObj, upperCharacterError: true };
    } else {
      newObj = { ...newObj, upperCharacterError: false };
    }
    if (!RegexSpecialCaseLetters.test(value)) {
      newObj = { ...newObj, specialCharacterError: true };
    } else {
      newObj = { ...newObj, specialCharacterError: false };
    }
    if (value.length < 8) {
      newObj = { ...newObj, lengthError: true };
    } else {
      newObj = { ...newObj, lengthError: false };
    }

    setnewPasswordValid({
      ...newPasswordValid,
      ...newObj,
    });
  };

  const ValidateConfirmPassword = (value) => {
    if (value === resetPassword) {
      setnewPasswordValid({
        ...newPasswordValid,
        matchPassword: false,
      });
    } else {
      setnewPasswordValid({
        ...newPasswordValid,
        matchPassword: true,
      });
    }
  };

  return (
    <div className="page-background">
      <LoginHeader />
      <div className="grayBox">
        <div className="grid-header">
          <Heading2Bold
            text={strings.resetPassword}
            color={Colors.black}
            textAlign={"center"}
          />
        </div>
        <div className="grid-container">
          <Heading6Medium
            text={strings.pleaseEnterYourNewPassword}
            color={Colors.midGray}
            padding={"0 0 24px 0"}
          />
          <div className="grid-item">
            <InputLabel
              text={strings.newPassword}
              color={Colors.nightGray}
              padding={"0 0 8px 0"}
              className={"inputlabel"}
            />
            <InputWrapper>
              <Textfield
                className={
                  resetPasswordError ? "input-error textfield" : "textfield"
                }
                placeholder={strings.enterYourPassword}
                type={showPassword}
                value={resetPassword}
                padding={"12px 52px 12px 16px"}
                onChange={(e) => {
                  setResetPassword(e.target.value);
                  ValidatePassword(e.target.value);
                  if (e.target.value === "") {
                    setResetPasswordError(true);
                  } else {
                    setResetPasswordError(false);
                  }
                }}
                onBlur={(e) => {
                  ValidatePassword(e.target.value);
                }}
              />
              {resetPasswordError && (
                <Error
                  className="inputerror"
                  text={"Enter valid confirm password"}
                  color={Colors.error}
                  margin={"4px 0 8px 0"}
                />
              )}
              {showVisibilityIcon ? (
                <img
                  src={visibilityIcon}
                  className="visibleicon"
                  onClick={() => {
                    setShowVisibilityIcon(!showVisibilityIcon);
                    setShowPassword(
                      showPassword === "Password" ? "text" : "Password"
                    );
                  }}
                  alt="name"
                />
              ) : (
                <img
                  src={unVisibilityIcon}
                  className="unvisibleicon"
                  onClick={() => {
                    setShowVisibilityIcon(!showVisibilityIcon);
                    setShowPassword(
                      showPassword === "Password" ? "text" : "Password"
                    );
                  }}
                  alt="name"
                />
              )}
            </InputWrapper>
          </div>
          <div className="grid-item">
            <InputLabel
              text={strings.confirmNewPassword}
              color={Colors.nightGray}
              padding={"0px 0 8px 0"}
              className={"inputlabel"}
            />

            <InputWrapper>
              <Textfield
                className={
                  confirmresetPasswordError
                    ? "input-error textfield"
                    : "textfield"
                }
                placeholder={strings.enterYourPassword}
                type={showPassword}
                value={confirmresetPassword}
                padding={"12px 52px 12px 16px"}
                onChange={(e) => {
                  setConfirmResetPassword(e.target.value);
                  ValidateConfirmPassword(e.target.value);
                  if (e.target.value === "") {
                    setConfirmResetPasswordError(true);
                  } else {
                    setConfirmResetPasswordError(false);
                  }
                }}
                onBlur={(e) => {
                  ValidateConfirmPassword(e.target.value);
                }}
              />
              {confirmresetPasswordError && (
                <Error
                  className="inputerror"
                  text={"Enter valid confirm password"}
                  color={Colors.error}
                  margin={"4px 0 8px 0"}
                />
              )}
              {showVisibilityIcon ? (
                <img
                  src={visibilityIcon}
                  className="visibleicon"
                  onClick={() => {
                    setShowVisibilityIcon(!showVisibilityIcon);
                    setShowPassword(
                      showPassword === "Password" ? "text" : "Password"
                    );
                  }}
                  alt="name"
                />
              ) : (
                <img
                  src={unVisibilityIcon}
                  className="unvisibleicon"
                  onClick={() => {
                    setShowVisibilityIcon(!showVisibilityIcon);
                    setShowPassword(
                      showPassword === "Password" ? "text" : "Password"
                    );
                  }}
                  alt="name"
                />
              )}
            </InputWrapper>
          </div>
          <div className="grid-item">
            <Grid
              container
              padding={"20px 0px 0px 0px"}
              style={{ marginTop: "30px" }}
            >
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <div
                  className={
                    newPasswordValid.lowerCharacterError
                      ? "pass_set wrong_pass"
                      : "pass_set SuccessIcon"
                  }
                >
                  <img
                    src={SuccessIcon}
                    className={"SuccessIcon"}
                    alt="some value"
                  />
                  One lowercase character
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className={
                    newPasswordValid.specialCharacterError
                      ? "pass_set wrong_pass"
                      : "pass_set SuccessIcon"
                  }
                >
                  <img
                    src={SuccessIcon}
                    className={"SuccessIcon"}
                    alt="some value"
                  />
                  One special case character
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className={
                    newPasswordValid.upperCharacterError
                      ? "pass_set wrong_pass"
                      : "pass_set SuccessIcon"
                  }
                >
                  <img
                    src={SuccessIcon}
                    className={"SuccessIcon"}
                    alt="some value"
                  />
                  One uppercase character
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className={
                    newPasswordValid.lengthError
                      ? "pass_set wrong_pass"
                      : "pass_set SuccessIcon"
                  }
                >
                  <img
                    src={SuccessIcon}
                    className={"SuccessIcon"}
                    alt="some value"
                  />
                  8 characters minimum
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  className={
                    newPasswordValid.matchPassword
                      ? "pass_set wrong_pass"
                      : "pass_set SuccessIcon"
                  }
                >
                  <img
                    src={SuccessIcon}
                    className={"SuccessIcon"}
                    alt="some value"
                  />
                  Passwords match
                </div>
              </Grid>
            </Grid>
          </div>
          {resetPassword !== "" &&
          confirmresetPassword !== "" &&
          !Object.values(newPasswordValid).some((item) => item === true) &&
          !loading ? (
            <SecondaryButton
              className="neutrallightbutton"
              text={strings.resetPassword}
              width={"auto"}
              height={"56px"}
              margin={"16px 0 4px 0"}
              onClick={routeChange}
            />
          ) : (
            <NeutralLightButton
              loading={loading}
              className={loading ? "lightbuttonLoader" : "primarybutton"}
              text={strings.resetPassword}
              width={"auto"}
              height={"56px"}
              margin={"16px 0 4px 0"}
              onClick={routeChange}
            />
          )}
          {/* <PrimaryButton className='primarybutton' text={strings.resetPassword}  width={'auto'} height={'56px'} margin={'16px 0 4px 0'} /> */}
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
      <LoginFooter />
    </div>
  );
}

export default Signin;
