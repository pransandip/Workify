import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  NeutralLightButton,
  PrimaryButton,
  SecondaryButton,
} from "../../Styles-Elements/Buttons";
import { Textfield, InputWrapper } from "../../Styles-Elements/Inputs";
import LoginHeader from "../../Styles-Elements/login-heading/LoginHeader";
import LoginFooter from "../../Styles-Elements/login-footer/LoginFooter";
import {
  Heading2Bold,
  Heading6Medium,
  InputLabel,
  LabelWrapper,
  Error,
} from "../../Styles-Elements/Labels";
import * as Colors from "../../Styles-Elements/Colors";
import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";
import { ACTIONS } from "../../store/actions";
import jwt from "jwt-decode";

// importing axios from api/axios.js
import axios from "../../api/axios";

import "./Signin.scss";

// import images
import visibilityIcon from "../../image-assets/structure/visible.svg";
import unVisibilityIcon from "../../image-assets/structure/unvisible.svg";

// Importing localised strings
const strings = require("../../localisation_en.json");

function Signin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState("Password");
  const [showVisibilityIcon, setShowVisibilityIcon] = useState(true);

  const [signemail, setSignEmail] = useState("");
  const [signpassword, setSignPassword] = useState("");
  const [signmailError, setSignmailError] = useState(null);
  const [signpasswordError, setSignpasswordError] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams();
  params.append("email", signemail);
  params.append("password", signpassword);
  params.append("type", "business");

  let RegexString =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // useEffect(() => {
  //   const keyDownHandler = (event) => {
  //     console.log("User pressed: ", event.key);

  //     if (event.key === "Enter") {
  //       event.preventDefault();

  //       // 👇️ call submit function here

  //       routeChange(event);
  //     }
  //   };

  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //Do stuff in here
      routeChange(event);
    }
  };

  const routeChange = (e) => {
    e.preventDefault();

    if (signpassword !== "" && signemail !== "" && !signmailError) {
      setLoading(true);
      axios
        .post("/api/signin", params)
        .then((res) => {
          setLoading(false);
          if (res.status === 200 && res.data.ack === 1) {
            setConfirmationOpen(true);
            setConfirmationType({
              type: "success",
              message: "Sucessfully signed in",
            });
            let token = res.data.token;
            const user = jwt(token); // decode your token here
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({
              type: ACTIONS.UPDATE_USER_DATA,
              payload: user,
            });
            setTimeout(() => {
              history.push({
                pathname: "/home",
                state: { email: signemail },
              });
            }, 1000);
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
    } else {
      if (signpassword === "") {
        setSignpasswordError(true);
      }
      if (signemail === "") {
        setSignmailError(true);
      }
    }
  };

  const validateEmail = (value) => {
    if (!RegexString.test(value)) {
      setSignmailError(true);
    } else {
      setSignmailError(false);
    }
  };

  return (
    <div className="page-background">
      <LoginHeader />
      <div className="grayBox">
        {/*<ul className="demo-listing">
          <li><Link to="/signup" target="_blank">sign in</Link></li>
          <li><Link to="/signin" target="_blank">sign up</Link></li>
          <li><Link to="/password-recovery" target="_blank">password recovery</Link></li>
          <li><Link to="/reset-password" target="_blank">reset password</Link></li>
          <li><Link to="/password-recovery-confirmation" target="_blank">password recovery confirmation</Link></li>
          <li><Link to="/service-agreement" target="_blank">service agreement</Link></li>
          <li><Link to="/main-app" target="_blank">Account Setting</Link></li>
          <li><Link to="/give-feedback" target="_blank">give feedback</Link></li>
          <li><Link to="/helpsupport" target="_blank">help support</Link></li>
          <li><Link to="/home" target="_blank">home</Link></li>
          <li><Link to="/schedule" target="_blank">schedule</Link></li>
          <li><Link to="/staff" target="_blank">staff</Link></li>
        </ul>*/}
        <div className="grid-header">
          <Heading2Bold
            text={strings.signInToWorkBriefly}
            color={Colors.black}
            textAlign={"center"}
            className={"heading2bold"}
          />
        </div>
        <div>
          {/* <Body text={strings.yourPasswordWasSuccessfullyReset}
                        color={Colors.success}
                        textAlign={'center'}
                        padding={'24px 0 0px 0'} /> */}
        </div>
        <div className="grid-container">
          <div className="grid-item">
            <InputLabel
              text={strings.Email1}
              color={Colors.nightGray}
              padding={"0 0 8px 0"}
              className={"inputlabel"}
            />
            <Textfield
              placeholder={strings.enterYourEmailAddress}
              className={
                signmailError === null
                  ? "textfield"
                  : signmailError === true
                  ? "input-error textfield"
                  : "input-success textfield"
              }
              value={signemail}
              onChange={(e) => {
                if (e.target.value === "") {
                  setSignmailError(true);
                } else {
                  setSignmailError(false);
                }
                setSignEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onKeyPress={enterPressed}
              onBlur={(ev) => {
                validateEmail(ev.target.value);
              }}
            />
            {signmailError && (
              <Error
                className="inputerror"
                text={strings.enterValidEmailAddress}
                color={Colors.error}
                margin={"4px 0 8px 0"}
              />
            )}
          </div>
          <div className="grid-item">
            <InputLabel
              text={strings.password1}
              color={Colors.nightGray}
              padding={"0px 0 8px 0"}
              className={"inputlabel"}
            />

            {/* <Textfield className="textfield" placeholder={strings.enterYourPassword}
                        type={'password'}
                        /> */}
            <InputWrapper>
              <Textfield
                className={
                  signpasswordError === null
                    ? "textfield"
                    : signpasswordError === true
                    ? "input-error textfield"
                    : "input-success textfield"
                }
                placeholder={strings.enterYourPassword}
                type={showPassword}
                padding={"12px 52px 12px 16px"}
                value={signpassword}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSignPassword(e.target.value);
                    setSignpasswordError(null);
                  } else {
                    setSignPassword(e.target.value);
                    setSignpasswordError(false);
                  }
                }}
                onKeyPress={enterPressed}
              />

              {signpasswordError && (
                <Error
                  className="inputerror"
                  text={strings.enterYourPassword}
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
          {signmailError === false &&
          signpasswordError === false &&
          !loading ? (
            <PrimaryButton
              to="/home"
              className="primarybutton"
              text={strings.signIn}
              width={"172px"}
              height={"56px"}
              margin={"12px 0 32px 0"}
              onClick={routeChange}
            />
          ) : (
            <NeutralLightButton
              //to="/home"
              className={loading ? "lightbuttonLoader" : "primarybutton"}
              text={strings.signIn}
              width={"172px"}
              height={"56px"}
              margin={"12px 0 32px 0"}
              loading={loading}
              onClick={routeChange}
            />
          )}
          <Link to="/password-recovery" className={"a_link"}>
            {strings.forgotYourPassword}
          </Link>
          <LabelWrapper justifyContent={"center"}>
            <Heading6Medium
              className={"heading6medium"}
              text={strings.dontHaveAnAccount}
              width={"auto"}
              color={Colors.gray74}
              margin={"0px 0 8px 0"}
            />{" "}
            &nbsp;
            <Link to="/service-agreement" className={"a_link"}>
              sign Up Free
            </Link>
          </LabelWrapper>
        </div>
      </div>
      <LoginFooter />
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

export default Signin;
