import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../store/actions/index"

import * as Colors from "../../Styles-Elements/Colors";
import { TertiaryButton, PrimaryButton } from "../../Styles-Elements/Buttons";
import { Heading3Bold } from "../../Styles-Elements/Labels";

import Homeimg1 from "../../image-assets/structure/home-img1.svg";
import Homeimg2 from "../../image-assets/structure/home-img2.svg";
import Homeimg3 from "../../image-assets/structure/home-img3.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

// Importing localised strings
const strings = require("../../localisation_en.json");

function HomeEmpty(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div>
      {/*empty box*/}
      <Grid container xs={12}>
        <Grid item xs={8}>
          <Box className={"bg-lgreen-box"}>
            <Heading3Bold text={strings.AddStaffMember} />
            <p className={"p-80"}>{strings.LoremIpsum}</p>
            <Link to="/staff">
              <TertiaryButton
                className="tertiarybutton"
                width={"160px"}
                text={strings.AddStaff}
              />
            </Link>
            <img src={Homeimg1} alt="name" className={"home-img1"} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={"bg-blue-box"}>
            <Heading3Bold
              color={Colors.white}
              text={strings.WanttocreateaGig}
            />
            <p className={"p-80"}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            {/* <Link to="/create-gig"> */}
            <PrimaryButton
              className="primarybutton"
              text={strings.createAGig}
              width={"160px"}
              style={{ Color: "blue" }}
              onClick={() => {
                dispatch({
                  type: ACTIONS.CLEAR_GIG_DATA,
                });
                let path = `/create-gig`;
                history.push(path);
              }}
            />
            {/* </Link> */}
            <img src={Homeimg2} alt="name" className={"home-img2"} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={"bg-gray-box"}>
            <Heading3Bold text={strings.BookedWorkers_ViewInvoices} />
            <p className={"p-80"}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <img src={Homeimg3} alt="name" className={"home-img3"} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeEmpty;
