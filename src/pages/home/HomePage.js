import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/chat";
import * as Colors from "../../Styles-Elements/Colors";
import { Heading2Bold } from "../../Styles-Elements/Labels";
import { useSelector } from "react-redux";
import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";
import Grid from "@mui/material/Grid";

import HomeList from "../../pages/home/HomeList";
// import HomeEmpty from "../../pages/home/HomeEmpty";

import Sidebar from "../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../Styles-Elements/Heading/Header";
import {
  chatInitilization,
  createChatUser,
  loginUser,
} from "../../Helpers/CometChat";
import { imageBase } from "../../api/axios";

// import images
import ConpanyLogo from "../../image-assets/product/round-img1.png";
import ConpanyLogoJJ from "../../image-assets/product/undefined_user.png";
import Round1 from "../../image-assets/product/round-img3.png";

import "./HomePage.scss";

// Importing localised strings
const strings = require("../../localisation_en.json");

function HomePage(props) {
  let user = useSelector((state) => state.userData.data);
  console.log("user", user);
  chatInitilization();
  if (!user) {
    user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  }

  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    let user_id =
      user && user.email.substring(0, user.email.indexOf("@")).replace(".", "");
    let user_name =
      !user.first_name || user.first_name === "null"
        ? user.owner_name
        : user.first_name;
    if (user) {
      //createChatUser(user_id, user_name);
    }
    loginUser(user_id);
  });
  console.log("user.company_logo", user.company_logo);
  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className="Homepage-holder">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems="center"
              justifyContent="flex-start"
              marginBottom={"24px"}
            >
              <img
                src={
                  user?.company_logo !== null
                    ? `${imageBase}${user.company_logo}`
                    : ConpanyLogoJJ
                }
                alt="imageBase"
                className={"company-logo"}
              />
              <Heading2Bold
                text={`Welcome, ${user && user.business_name}`}
                color={Colors.gray2c}
                data-attr="123"
              />
            </Grid>

            <Grid item xs={12}>
              {/*Listing box*/}
              <HomeList />

              {/*empty box
              <HomeEmpty />*/}
            </Grid>
          </Grid>
          <Popup
            popupIsOpen={popupOpen}
            style={POPUP_TYPE.RESET_PASSWORD}
            closePopup={() => setPopupOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
