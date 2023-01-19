import React from "react";
import { Heading4Medium } from "../../Styles-Elements/Labels";
import Box from "@mui/material/Box";
import * as Colors from "../../Styles-Elements/Colors";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LeftProfile from "../../pages/view-profile-recommended/left-profile/LeftProfile";
import ProfileCard from "../../pages/view-profile-recommended/profile-card/ProfileCard";
import RightChips from "../../pages/view-profile-recommended/right-chips/RightChips";

import "./ViewProfileRecommended.scss";

import Sidebar from "../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../Styles-Elements/Heading/Header";
import axios from "../../api/axios";
import { useEffect } from "react";
import { useState } from "react";

// Importing localised strings
// const strings = require('../../localisation_en.json')

function ViewProfileRecommended(props) {
  const location = useLocation();
  const id = location.state?.id

  const userData = useSelector((state) => state.userData.data);

  const [worker, setWorker] = useState('');
  const [experience, setExperience] = useState('')

  let token = localStorage.getItem("token");
  let user_data = userData
    ? userData
    : JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const getWorkerData = (id) => {
    axios.get(`/api/worker-profile-description/${parseInt(id)}`, config)
      .then((res) => {
        if (res.data.ack === 1) {
          setWorker(res.data.user[0])
          setExperience(res.data.experience)
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWorkerData(id);
  }, []);


  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className={"profile-holder"}>
          <Box className={"profile-left-section"}>
            <LeftProfile worker={worker} />
          </Box>
          <Box className={"profile-center-section"}>
            <Heading4Medium
              className={"heading4medium"}
              fontWeight={"700"}
              color={Colors.nightGray}
              text={"Gigs Completed (02)"}
            />
            <ProfileCard />
            <ProfileCard />
          </Box>
          <Box className={"profile-right-section"}>
            <RightChips experience={experience} />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ViewProfileRecommended;
