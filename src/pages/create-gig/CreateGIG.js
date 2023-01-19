import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Colors from "../../Styles-Elements/Colors";
import { Body, Heading3Bold } from "../../Styles-Elements/Labels";

import Sidebar from "../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../Styles-Elements/Heading/Header";

import StepperHeader6 from "../../pages/stepper-header/StepperHeader6";
import "./CreateGIG.scss";

// import material ui
import Box from "@mui/material/Box";

// Importing localised strings
const strings = require("../../localisation_en.json");

function CreateGIG(props) {
  const history = useHistory();

  let gig_data = useSelector((state) => state.gigData);
  console.log(`gig_data`, gig_data)
  const [type, setType] = useState(gig_data.gig_type);
  useEffect(() => {
    setType(gig_data.gig_type);
  }, [gig_data.gig_type]);

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className="create-gig-main-holder">
          <div className="">
            <Box>
              <Heading3Bold
                className={"heading3bold"}
                text={`${gig_data.gig_type} a Gig`}
                color={Colors.black}
                margin={"0 0 12px 0"}
              />
              <Body
                className={"body"}
                text={strings.inOrderToStartHiringWorks}
                color={Colors.black}
              />
              <StepperHeader6 type={type} prevPath={history.location.state} />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGIG;
