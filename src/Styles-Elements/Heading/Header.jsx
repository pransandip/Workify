import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Colors from "../../Styles-Elements/Colors";
import { Heading6Medium } from "../../Styles-Elements/Labels";
import { ACTIONS } from "../../store/actions/index";
import {
  PrimaryButton,
  TransparentButton,
} from "../../Styles-Elements/Buttons";
// Material UI
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// images
import CroseImg from "../../image-assets/structure/crose-icon-gray.svg";
import ConpanyLogo from "../../image-assets/product/round-img1.png";
import ConpanyLogoJJ from "../../image-assets/product/undefined_user.png";
import collapseIcon from "../../image-assets/structure/collapseicon.svg";
import { imageBase } from "../../api/axios";

import "./Header.scss";

// Importing localised strings
const strings = require("../../localisation_en.json");

function Header(props) {
  const history = useHistory();

  const dispatch = useDispatch();

  let user = useSelector((state) => state.userData.data);

  if (!user) {
    user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  }

  const routeChange = () => {
    let path = `/signin`;
    history.push(path);
    dispatch({
      type: ACTIONS.CLEAR_GIG_DATA,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const routeChangeAccountSetting = () => {
    let path = `/account-setting`;
    history.push(path);
  };
  const routeChangeHelpSupport = () => {
    let path = `/helpsupport`;
    history.push(path);
  };
  const routeChangeGiveFeedback = () => {
    let path = `/give-feedback`;
    history.push(path);
  };
  const [logoutOpen, setLogout] = React.useState(false);
  const logoutClickOpen = () => {
    setLogout(true);
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setLogout(false);
  };

  // Set loading state to true initially
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 500));
      setLoading((loading) => !loading);
    };
    loadData();
  }, []);

  console.log(`${user.business_name.replace(/\b[a-z]/g, (x) => x.toUpperCase())}`)

  return (
    <div className="main-header">
      {/*<img height={24} src={notificationIcon} alt="name"  />*/}

      <div className="profile-box">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <img
            src={user?.company_logo !== null ? `${imageBase}${user.company_logo}` : ConpanyLogoJJ}
            alt="name"
            className={"round-icon34"}
          />
          <span className={"profile-name"}>
            {user && user.business_name.length >= 25
              ? user.business_name.substring(0, 50) + "..."
              : `${user.business_name.replace(/\b[a-z]/g, (x) => x.toUpperCase())}`}
          </span>
          <img src={collapseIcon} width={"16px"} className="" alt="name" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          elevation={0}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          style={{ left: "0", right: "30px" }}
        >
          <MenuItem onClick={routeChangeAccountSetting}>
            <Heading6Medium
              text={strings.AccountSettings}
              padding={"0"}
              color={Colors.Primary}
              cursor={"pointer"}
            />
          </MenuItem>
          <MenuItem onClick={routeChangeHelpSupport}>
            <Heading6Medium
              text={strings.helpSupport}
              padding={"0"}
              color={Colors.Primary}
              cursor={"pointer"}
            />
          </MenuItem>
          <MenuItem onClick={routeChangeGiveFeedback}>
            <Heading6Medium
              text={strings.giveFeedback}
              padding={"0"}
              color={Colors.Primary}
              cursor={"pointer"}
            />
          </MenuItem>
          <MenuItem onClick={logoutClickOpen}>
            <Heading6Medium
              text={strings.logOut}
              padding={"0"}
              color={Colors.Primary}
              cursor={"pointer"}
            />
          </MenuItem>
        </Menu>
      </div>

      <Dialog
        open={logoutOpen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {strings.logOut}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {strings.Areyousureyouwanttologout}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TransparentButton
            className="transparentbutton"
            onClick={handleClose}
            text={strings.No}
            width={"auto"}
          />
          <PrimaryButton
            className="primarybutton"
            autoFocus
            text={strings.Yes}
            width={"210px"}
            onClick={routeChange}
          />
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
