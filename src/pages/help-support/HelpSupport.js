import React, { useState } from "react";
import * as Colors from "../../Styles-Elements/Colors";
import { Heading3Bold, Heading6Medium } from "../../Styles-Elements/Labels";
import { Textfield } from "../../Styles-Elements/Inputs";
import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";

// Importing local Components
import TabFaq from "../../pages/help-support/tab-faq/TabFaq";
import TabGettingStarted from "../../pages/help-support/tab-getting-started/TabGettingStarted";

// Importing Material imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import "./HelpSupport.scss";

import Sidebar from "../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../Styles-Elements/Heading/Header";

// Importing localised strings
const strings = require("../../localisation_en.json");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function HelpSupport(props) {
  // (basically for the checkout button to work on the manage seats section)
  const [popupOpen, setPopupOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className="Helpsupport-holder">
          <div className="top-bg"></div>
          <Grid container spacing={2} justifyContent="center">
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <Heading3Bold
                text={strings.helpSupport}
                color={Colors.black}
                margin={"0 0 32px 0"}
              />
            </Grid>
            <Grid
              xs={12}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <div className="grid-item">
                <Textfield
                  placeholder={strings.enterYourEmailAddress}
                  className="input-search textfield"
                  backgroundColor={Colors.white}
                />
              </div>
            </Grid>
            <Grid
              xs={7}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <Heading6Medium
                text={strings.hereAreTheMostFr}
                color={Colors.black}
                textAlign={"center"}
                margin={"32px 0 0px 0"}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <Tabs
                className="hs-tabs-hldr"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  className="hs-tabs"
                  label="FAQ"
                  onClick={() => setPopupOpen(true)}
                  {...a11yProps(0)}
                />
                <Tab
                  className="hs-tabs"
                  label="Getting Started"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Grid>
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <TabPanel value={value} index={0}>
                <TabFaq />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TabGettingStarted />
              </TabPanel>
            </Grid>
          </Grid>

          <Popup
            popupIsOpen={popupOpen}
            style={POPUP_TYPE.RESET_PASSWORD}
            type={"success"}
            closePopup={() => setPopupOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;
