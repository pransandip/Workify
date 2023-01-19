import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  PrimaryButton,
  TransparentButton,
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

import "./EmailVerification.scss";

// Importing localised strings
const strings = require("../../localisation_en.json");

function EmailVerification(props) {
  const history = useHistory();
  const location = useLocation();

  // data comming from AccountDetail page
  const email = location.state.pswrcvremail;
  const email2 = location.state.email;

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [counter, setCounter] = useState(30);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  const params = new URLSearchParams();
  const handleResend = () => {
    setCounter(59);
    params.append("email", email ? email : email2);
    params.append("type", "business");
    axios
      .post("/api/forgot-password", params)
      .then((res) => {
        console.log("success");
        console.log(res);
        console.log(res.data.otp);
        var num_otp = res.data.otp;

        if (res.data.ack === 1) {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: "OTP sent to register Email",
          });
        } else if (res.data.ack === 0) {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg[0].email,
          });
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  // data comming from PasswordRecovery page
  const passwordRecoveryEmail = location.state.pswrcvremail;
  const passwordRecoveryOtp = location.state.pswrcvrotp;
  // console.log(passwordRecoveryOtp);
  // console.log(passwordRecoveryEmail);
  // console.log(otp);
  // console.log(email);

  // sending data as application/x-www-form-urlencoded format
  const params1 = new URLSearchParams();
  params1.append("email", email2);
  params1.append("otp", otp);

  // sending data as application/x-www-form-urlencoded format
  const params2 = new URLSearchParams();
  params2.append("email", passwordRecoveryEmail);
  params2.append("otp", otp);

  const handleBack = () => {
    history.goBack();
  };

  const routeChange = (e) => {
    e.preventDefault();
    if (otp !== "") {
      if (typeof passwordRecoveryEmail === "undefined") {
        axios
          .post("/api/verify_otp", params1)
          .then((res) => {
            console.log("success");
            console.log(res);

            if (res.status === 201 && res.data.ack === 1) {
              setConfirmationOpen(true);
              setConfirmationType({
                type: "success",
                message: "Email verified sucessfully",
              });

              setTimeout(() => {
                history.push({
                  pathname: "/signin",
                  state: { email: email },
                });
              }, 2000);
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
        axios
          .post("/api/verify_otp", params2)
          .then((res) => {
            console.log("success");
            console.log(res);

            if (res.status === 201 && res.data.ack === 1) {
              setConfirmationOpen(true);
              setConfirmationType({
                type: "success",
                message: "Email verified sucessfully",
              });

              setTimeout(() => {
                history.push({
                  pathname: "/reset-password",
                  state: {
                    email2: passwordRecoveryEmail,
                    user_id: res.data.user_id,
                  },
                });
              }, 2000);
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
      }
    } else if (otp === "") {
      setOtpError(true);
    }

    // let path = `/service-agreement`;
    // history.push(path);
  };

  return (
    <div className="page-background">
      <LoginHeader />
      <div className="grayBox">
        <div className="grid-header">
          <Heading2Bold
            text={strings.EmailVerification}
            color={Colors.black}
            textAlign={"center"}
            className={"heading2bold"}
          />
        </div>
        <div className="grid-container">
          <p className={"email-text"}>
            Enter the verification code that was sent to <br />
            {passwordRecoveryEmail ? passwordRecoveryEmail : email2}
          </p>
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
              <span className={"seconds"}>{`00:${
                counter === 0 ? "00" : counter
              }`}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <TransparentButton
              className="transparentbutton"
              text={strings.Back}
              width={"auto"}
              onClick={handleBack}
            />
            {counter === 0 && (
              <SecondaryButton
                className="transparentbutton"
                text={strings.ResendCode}
                width={"auto"}
                onClick={handleResend}
              />
            )}
            {/* ) : (
              <TransparentButton
                className="transparentbutton"
                text={strings.ResendCode}
                width={"auto"}
                //onClick={handleResend}
              />
            ) */}
            <div style={{ marginLeft: "10px" }}>
              <PrimaryButton
                onClick={routeChange}
                className="neutrallightbutton"
                autoFocus
                text={strings.VerifyCode}
                width={"116px"}
              />
            </div>
          </div>
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

export default EmailVerification;
