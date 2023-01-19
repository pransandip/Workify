import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../store/actions/index";
import { SIDEBAR_STATE } from "../../Helpers/Enums";
import { Link } from "react-router-dom";
import { PrimaryButton, TransparentButton } from "../Buttons";
import * as FontStyles from "../FontStyles";
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// import images
import sidebarLogo from "../../image-assets/logo/sidebar-logo.svg";
import homeWhiteIcon from "../../image-assets/structure/home-white-icon.svg";
import gigsWhiteIcon from "../../image-assets/structure/gigs-white-icon.svg";
import scheduleWhiteIcon from "../../image-assets/structure/schedule-white-icon.svg";
import staffWhiteIcon from "../../image-assets/structure/staff-white-icon.svg";

import "./Sidebar.scss";

// Importing localised strings
const strings = require("../../localisation_en.json");

function Sidebar(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const activeSideBar = useSelector((state) => state.sideBar.activeState);

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const history = useHistory();
  const routeChangeHome = () => {
    dispatch({
      type: ACTIONS.SIDE_BAR_STATE,
      payload: SIDEBAR_STATE.HOME,
    });
    let path = `/home`;
    history.push(path);
  };
  const routeChangeSchedule = () => {
    console.log(SIDEBAR_STATE.SCHEDULE);
    dispatch({
      type: ACTIONS.SIDE_BAR_STATE,
      payload: SIDEBAR_STATE.SCHEDULE,
    });
    let path = `/schedule`;
    history.push(path);
  };
  const routeChangeStaff = () => {
    dispatch({
      type: ACTIONS.SIDE_BAR_STATE,
      payload: SIDEBAR_STATE.STAFF,
    });
    let path = `/staff`;
    history.push(path);
  };
  const routeChangeCreateGig = () => {
    let path = `/create-gig`;
    history.push(path);
  };
  return (
    <div className={isActive ? "sidebar toggleSidebar" : "sidebar"}>
      <div onClick={toggleClass} className={"sideArrow"}>
        <MenuIcon className="menuIcon" />
        <CloseIcon className="closeIcon" />
      </div>
      <div className="sidebar-header">
        <img src={sidebarLogo} width={100} height={51} alt="name" />
      </div>

      <div className="sidebar-manage-strings-section">
        <div
          className={
            activeSideBar === SIDEBAR_STATE.HOME
              ? "sidebar-button-holder selected"
              : "sidebar-button-holder"
          }
          onClick={routeChangeHome}
        >
          <img src={homeWhiteIcon} alt="name" />
          <TransparentButton
            className="transparentbutton"
            theme={FontStyles.body}
            text={strings.home}
            //onClick={() => setActiveState(SIDEBAR_STATE.HOME)}
          />
        </div>

        <div
          className={
            activeSideBar === SIDEBAR_STATE.GIGS
              ? "sidebar-button-holder selected"
              : "sidebar-button-holder"
          }
          onClick={handleClick}
        >
          <img src={gigsWhiteIcon} alt="name" />
          <TransparentButton
            className="transparentbutton"
            theme={FontStyles.body}
            text={strings.gigs}
            onClick={() => {
              dispatch({
                type: ACTIONS.SIDE_BAR_STATE,
                payload: SIDEBAR_STATE.GIGS,
              });
              dispatch({
                type: ACTIONS.CLEAR_GIG_DATA,
              });
            }}
          />
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Link to="/gig">Active</Link>
          <Link to="/gig-completed-list">Completed</Link>
        </Collapse>

        <div
          className={
            activeSideBar === SIDEBAR_STATE.SCHEDULE
              ? "sidebar-button-holder selected"
              : "sidebar-button-holder"
          }
          onClick={routeChangeSchedule}
        >
          <img src={scheduleWhiteIcon} alt="name" />
          <TransparentButton
            className="transparentbutton"
            theme={FontStyles.body}
            text={strings.schedule}
            //onClick={() => setActiveState(SIDEBAR_STATE.SCHEDULE)}
          />
        </div>

        <div
          className={
            activeSideBar === SIDEBAR_STATE.STAFF
              ? "sidebar-button-holder selected"
              : "sidebar-button-holder"
          }
          onClick={routeChangeStaff}
        >
          <img src={staffWhiteIcon} alt="name" />
          <TransparentButton
            className="transparentbutton"
            theme={FontStyles.body}
            text={strings.staff}
          />
        </div>

        <div className={"sidebar-button-holder"} onClick={routeChangeCreateGig}>
          <PrimaryButton
            style={{ Color: "black", textAlign: "center" }}
            className="primarybutton"
            theme={FontStyles.body}
            text={strings.createAGig}
            onClick={() => {
              dispatch({
                type: ACTIONS.CLEAR_GIG_DATA,
              });
              let path = `/create-gig`;
              history.push(path);
              //window.location.reload(); //once refresh issue get resolved then uncomment this
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
