import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  NeutralLightButton,
  SecondaryButton,
} from "../../Styles-Elements/Buttons";
import { Textfield } from "../../Styles-Elements/Inputs";
import LoginHeader from "../../Styles-Elements/login-heading/LoginHeader";
import LoginFooter from "../../Styles-Elements/login-footer/LoginFooter";
import {
  Heading2Bold,
  InputLabel,
  Heading6Medium,
  Error,
} from "../../Styles-Elements/Labels";
import * as Colors from "../../Styles-Elements/Colors";
import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";

// importing axios from api/axios.js
import axios from "../../api/axios";

import "./PasswordRecovery.scss";

// Importing localised strings
const strings = require("../../localisation_en.json");

function PasswordRecovery() {
  const history = useHistory();

  const [passwordRecoveryEmail, setPasswordRecoveryEmail] = useState("");
  const [passwordRecoveryError, setPasswordRecoveryError] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [loading, setLoading] = useState(false);

  let RegexString =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const params = new URLSearchParams();
  params.append("email", passwordRecoveryEmail);
  params.append("type", "business");

  const routeChange = (e) => {
    e.preventDefault();
    if (!passwordRecoveryError && passwordRecoveryEmail !== "") {
      setLoading(true);
      axios
        .post("/api/forgot-password", params)
        .then((res) => {
          var num_otp = res.data.otp;
          setLoading(false);

          if (res.data.ack === 1) {
            setConfirmationOpen(true);
            setConfirmationType({
              type: "success",
              message: "OTP sent to register Email",
            });

            setTimeout(() => {
              history.push("/email-verification", {
                pswrcvrotp: num_otp,
                pswrcvremail: passwordRecoveryEmail,
              });
            }, 1000);
          } else if (res.data.ack === 0) {
            setConfirmationOpen(true);
            setConfirmationType({
              type: "error",
              message: res.data.msg[0].type,
            });
          }
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    } else {
      if (passwordRecoveryEmail === "") {
        setPasswordRecoveryError(true);
      }
    }
  };

  const validateEmail = (value) => {
    if (!RegexString.test(value)) {
      setPasswordRecoveryError(true);
    } else {
      setPasswordRecoveryError(false);
    }
  };

  return (
    <div className="page-background">
      <LoginHeader />
      <div className="grayBox">
        <div className="grid-header">
          <Heading2Bold
            text={strings.passwordRecovery}
            color={Colors.black}
            textAlign={"center"}
          />
        </div>
        <div className="grid-container">
          <Heading6Medium
            text={strings.dontWorryItHappensToTheBestOfUs}
            color={Colors.midGray}
            padding={"0 0 24px 0"}
            className={"heading6medium"}
          />
          <div className="grid-item">
            <InputLabel
              text={strings.email1}
              color={Colors.nightGray}
              padding={"0 0 8px 0"}
              className={"inputlabel"}
            />
            <Textfield
              className={
                passwordRecoveryError
                  ? "input-error textfield"
                  : "input textfield"
              }
              placeholder={strings.enterYourEmailAddress}
              value={passwordRecoveryEmail}
              onChange={(e) => {
                if (e.target.value === "") {
                  setPasswordRecoveryError(true);
                } else {
                  setPasswordRecoveryError(false);
                }
                setPasswordRecoveryEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              onBlur={(ev) => {
                validateEmail(ev.target.value);
              }}
            />
            {passwordRecoveryError && (
              <Error
                className="inputerror"
                text={strings.enterValidEmailAddress}
                color={Colors.error}
                margin={"4px 0 8px 0"}
              />
            )}
          </div>

          {!passwordRecoveryError &&
          passwordRecoveryEmail !== "" &&
          !loading ? (
            <SecondaryButton
              className="neutrallightbutton"
              text={strings.resetPassword}
              width={"auto"}
              height={"56px"}
              margin={"24px 0 4px 0"}
              onClick={routeChange}
            />
          ) : (
            <NeutralLightButton
              loading={loading}
              className={loading ? "lightbuttonLoader" : "primarybutton"}
              text={strings.resetPassword}
              width={"auto"}
              height={"56px"}
              margin={"24px 0 4px 0"}
              onClick={routeChange}
            />
          )}
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

export default PasswordRecovery;
