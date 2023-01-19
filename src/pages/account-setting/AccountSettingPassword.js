import React from "react";
import { useState } from "react";
import * as Colors from "../../Styles-Elements/Colors";
import { Textfield, InputWrapper } from "../../Styles-Elements/Inputs";
import {
  TransparentButton,
  NeutralLightButton,
  SecondaryButton,
} from "../../Styles-Elements/Buttons";
import {
  Heading6Medium,
  InputLabel,
  Error,
} from "../../Styles-Elements/Labels";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@mui/material/Grid";

import SuccessIcon from "../../image-assets/structure/success-alert.svg";
import visibilityIcon from "../../image-assets/structure/visible.svg";
import unVisibilityIcon from "../../image-assets/structure/unvisible.svg";

// Importing localised strings
const strings = require("../../localisation_en.json");

function AccountSettingPhoneNumber(props) {
  const [isCheckedFive, setIsCheckedFive] = React.useState(false);

  const [showPassword, setShowPassword] = useState("Password");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [showVisibilityIcon, setShowVisibilityIcon] = useState(false);
  const [newPasswordValid, setnewPasswordValid] = useState({
    lowerCharacterError: true,
    upperCharacterError: true,
    specialCharacterError: true,
    lengthError: true,
    matchPassword: true,
  });

  // console.log(props.fileds);

  var RegexLowerCaseLetters = /[a-z]/g;
  var RegexUpperCaseLetters = /[A-Z]/g;
  var RegexSpecialCaseLetters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

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

    let error = Object.values(newObj).some((item) => item === true);
    if (error) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }

    setnewPasswordValid({
      ...newPasswordValid,
      ...newObj,
    });
  };

  const ValidateConfirmPassword = (value) => {
    if (value === newPassword) {
      setnewPasswordValid({
        ...newPasswordValid,
        matchPassword: false,
      });
      setConfirmNewPasswordError(false);
    } else {
      setnewPasswordValid({
        ...newPasswordValid,
        matchPassword: true,
      });
      setConfirmNewPasswordError(true);
    }
  };

  const handlePasswordsCheck = () => {
    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmNewPassword !== ""
    ) {
      const params = new URLSearchParams();
      params.append("old_password", currentPassword);
      params.append("password", newPassword);
      params.append("id", props.fileds.id);
      props.changePassword(params);
      setTimeout(() => {
        setIsCheckedFive(false);
      }, 1000);
    } else {
      if (currentPassword === "") {
        setCurrentPasswordError(true);
      }
      if (confirmNewPassword === "") {
        setConfirmNewPasswordError(true);
      }
      if (newPassword === "") {
        setNewPasswordError(true);
      }
    }
  };

  return (
    <>
      <Grid className={"account-flex-row"} marginBottom={"40px"}>
        <div className={"left-heading"}>
          <Heading6Medium
            text={strings.password}
            fontWeight={"700"}
            color={Colors.nightGray}
            className={"heading6medium"}
          />
        </div>
        <div className={"value-text"}>
          <div style={{ display: "block" }}>
            <Collapse in={isCheckedFive} className={"width340"}>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* Current Password"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <InputWrapper>
                      <Textfield
                        className={
                          currentPasswordError
                            ? "input-error textfield"
                            : "input textfield"
                        }
                        placeholder={strings.enterYourPassword}
                        type={showPassword}
                        padding={"12px 52px 12px 16px"}
                        value={currentPassword}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setCurrentPasswordError(true);
                          } else {
                            setCurrentPasswordError(false);
                          }
                          setCurrentPassword(e.target.value);
                        }}
                      />
                      {currentPasswordError && (
                        <Error
                          className="inputerror"
                          text={"Enter valid current password"}
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
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ marginTop: "10px" }}
                >
                  <div className="grid-item">
                    <InputLabel
                      text={"* New Password"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <InputWrapper>
                      <Textfield
                        className={
                          newPasswordError
                            ? "input-error textfield"
                            : "input textfield"
                        }
                        placeholder={"Enter New Password"}
                        type={showPassword}
                        padding={"12px 52px 12px 16px"}
                        value={newPassword}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setNewPasswordError(true);
                          } else {
                            setNewPasswordError(false);
                          }
                          setNewPassword(e.target.value);
                          ValidatePassword(e.target.value);
                        }}
                      />
                      {newPasswordError && (
                        <Error
                          className="inputerror"
                          text={"Enter valid new password"}
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
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{ marginTop: "10px" }}
                >
                  <div className="grid-item">
                    <InputLabel
                      text={"* Confirm New Password"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <InputWrapper>
                      <Textfield
                        className={
                          confirmNewPasswordError
                            ? "input-error textfield"
                            : "input textfield"
                        }
                        placeholder={"Confirm Password"}
                        type={showPassword}
                        padding={"12px 52px 12px 16px"}
                        value={confirmNewPassword}
                        onChange={(e) => {
                          setConfirmNewPassword(e.target.value);

                          if (e.target.value === "") {
                            setConfirmNewPasswordError(true);
                          } else {
                            setConfirmNewPasswordError(false);
                          }
                          ValidateConfirmPassword(e.target.value);
                        }}
                      />
                      {confirmNewPasswordError && (
                        <Error
                          className="inputerror"
                          text={"Enter valid confirm new password"}
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
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: "30px" }}>
                <Grid item xs={6}>
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
                    <span>One lowercase character</span>
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
                    setIsCheckedFive((prev) => !prev);
                  }}
                />

                {!currentPasswordError &&
                currentPassword !== "" &&
                !newPasswordError &&
                newPassword !== "" &&
                !confirmNewPasswordError &&
                confirmNewPassword !== "" ? (
                  <SecondaryButton
                    className="primarybutton"
                    text={strings.Update}
                    width={"113px"}
                    onClick={handlePasswordsCheck}
                  />
                ) : (
                  <NeutralLightButton
                    className="neutrallightbutton"
                    text={strings.Update}
                    width={"113px"}
                    onClick={handlePasswordsCheck}
                  />
                )}
              </Grid>
            </Collapse>
            <span className="change-value-text">************</span>
          </div>
          {/* <span className="alert-type-green">
            Your password successfully updated.
          </span> */}
        </div>
        <div className={"editTextBox"}>
          <FormControlLabel
            control={
              <input
                type="checkbox"
                checked={isCheckedFive}
                onChange={() => {
                  setIsCheckedFive((prev) => !prev);
                }}
              />
            }
            label="Edit"
          />
        </div>
      </Grid>
    </>
  );
}

export default AccountSettingPhoneNumber;
