import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Colors from "../../Styles-Elements/Colors";
import { Body } from "../../Styles-Elements/Labels";
import { TertiaryButton } from "../../Styles-Elements/Buttons";
import "./LoginHeader.scss";
// import images
import headerLogo from "../../image-assets/logo/header-logo.svg";
// Importing localised strings
const strings = require("../../localisation_en.json");

function LoginHeader() {
  const history = useHistory();
  const routeChange = () => {
    let path = `/signin`;
    history.push(path);
  };
  const routeChangeSignup = () => {
    let path = `/service-agreement`;
    history.push(path);
  };

  // Set loading state to true initially
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 600));
      setLoading((loading) => !loading);
    };
    loadData();
  }, []);

  return (
    <div className="Login-heading">
      <>
        <img height={54} src={headerLogo} alt="name" className="login-logo" />
        <div className="buttons-holder">
          <Body
            width={"auto"}
            color={Colors.Primary}
            margin={"0px 0 0px 0"}
            text={strings.signIn}
            onClick={routeChange}
          />
          <TertiaryButton
            className="tertiarybutton"
            width={"auto"}
            margin={"0px 0px 0px 25px"}
            text={strings.signUpFree}
            onClick={routeChangeSignup}
          />
        </div>
      </>
    </div>
  );
}

export default LoginHeader;
