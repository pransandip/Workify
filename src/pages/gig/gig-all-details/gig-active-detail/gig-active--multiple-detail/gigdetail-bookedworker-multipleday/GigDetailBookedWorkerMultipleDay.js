// Importing material ui
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import {
  Heading5Medium,
  Heading6Medium,
  Body,
  LabelWrapper,
  Small,
  InputLabel,
  Error,
} from "../../../../../../Styles-Elements/Labels";
import {
  SecondaryButton,
  TransparentButton,
  NeutralLightButton,
  PrimaryButton,
} from "../../../../../../Styles-Elements/Buttons";
import * as Colors from "../../../../../../Styles-Elements/Colors";
import { TextAreafield } from "../../../../../../Styles-Elements/Inputs";

import CheckInCollapse from "./CheckInCollapse";

import Popup from "../../../../../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../../../../../Helpers/Enums";
import { Link } from "react-router-dom";

import "../../../../GIGS.scss";
import GigChat from "../../../../gig-layout-components/gig-chat/GigChat";

import { ACTIONS } from "../../../../../../store/actions";

import axios from "../../../../../../api/axios";
import { imageBase, workerImageBase } from "../../../../../../api/axios";

// images
import Round1 from "../../../../../../image-assets/product/round-img3.png";
import CroseImg from "../../../../../../image-assets/structure/crose-icon-gray.svg";
import SuccessIcon from "../../../../../../image-assets/structure/success-alert.svg";
import editBlueIcon from "../../../../../../image-assets/structure/editblue.svg";

// Importing localised strings
const strings = require("../../../../../../localisation_en.json");

function GigDetailBookedWorkerSingleDay(props) {
  const dispatch = useDispatch();
  let bookedworkers = props.gig_details.bookedworkers;
  console.log('bookedworkers', bookedworkers)
  console.log('props.gig_details.invoice', props.gig_details.invoice)
  const userData = useSelector((state) => state.userData.data);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [completeFrom, setCompleteFrom] = useState(false);

  let token = localStorage.getItem("token");
  let user_data = userData
    ? userData
    : JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let user_id =
    user_data &&
    user_data.email.substring(0, user_data.email.indexOf("@")).replace(".", "");

  const [open, setOpen] = React.useState(false);
  const [openOne, setOpenOne] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [openThree, setOpenThree] = React.useState(false);
  const [checkin, setCheckin] = React.useState(null);
  const [checkout, setCheckout] = React.useState(null);
  const [selectedWorker, setSelectedWorker] = React.useState(null);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickOne = () => {
    setOpenOne(!openOne);
  };
  const handleClickTwo = () => {
    setOpenTwo(!openTwo);
  };
  const handleClickThree = () => {
    setOpenThree(!openThree);
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [isChatActive, setChatActive] = useState(false);

  const toggleChatClass = (e, item) => {
    e.stopPropagation();
    if (item) {
      setSelectedWorker(item);
    }
    setChatActive(!isChatActive);
  };

  const [removeWorkeropen, setOpenRemove] = React.useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteRemoveWorkeropen, deleteOpen] = React.useState(false);
  const [successRemoveWorkeropen, successOpen] = React.useState(false);
  const [reportAnIssueopen, reportOpen] = React.useState(false);
  const [reportAnIssueEditopen, reportEditOpen] = React.useState(false);
  const [reportAnIssueSelectopen, reportSelectOpen] = React.useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [reportAnIssueSelectConfirmopen, reportSelectConfirmOpen] =
    React.useState(false);
  const [reportAnIssueSuccessopen, successReportopen] = React.useState(false);

  const removeWorkerClickOpen = (e, item) => {
    e.stopPropagation();
    setOpenRemove(true);
    setSelected(item);
  };

  const formatDate = (date1, date2) => {
    console.log(new Date(date1));
    return (
      new Date(`${date1}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) +
      ` - ` +
      new Date(`${date2}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  };

  const checkinTimeFormat = (date) => {
    return new Date(`${date}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const completeGigClickOpen = (e, item) => {
    //e.stopPropagation();
    setCompleteFrom(true);
    //handleChange(`panel4`);
  };

  const deleteRemoveWorkerClickopen = () => {
    if (reason === "") {
      setReasonError(true);
    } else {
      deleteOpen(true);
      setOpenRemove(false);
      reportEditOpen(false);
    }
  };

  const successRemoveWorkerClickopen = () => {
    //console.log(selected);
    if (selected) {
      let selectedId = parseInt(localStorage.getItem("selcted_gig"));
      const params = new URLSearchParams();
      params.append("reason", reason);

      params.append("invite_id", selected.id);

      axios.post(`api/gig/remove_worker`, params, config).then((res) => {
        if (res.data.ack === 1) {
          console.log(res);
          successOpen(true);
          deleteOpen(false);
          setOpenRemove(false);

          props.getSelectedGigData(selectedId);
          //
          dispatch({
            type: ACTIONS.UPATE_GIG_DETAILS_REMOVEWORKER,
            payload: {
              invite_id: selected.id,
            },
          });
        } else {
          deleteOpen(false);
          setOpenRemove(false);
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg[0].reason,
          });
        }
      });
    }
  };

  const reportAnIssueClickOpen = (e) => {
    e.stopPropagation();
    reportOpen(true);
    reportEditOpen(false);
    setOpenRemove(false);
    reportSelectOpen(false);
  };

  const reportAnIssueEditClickOpen = () => {
    reportEditOpen(true);
    setOpenRemove(false);
    reportOpen(false);
    reportSelectOpen(false);
    reportSelectConfirmOpen(false);
  };

  const reportAnIssueSelectopenClickOpen = () => {
    reportOpen(false);
    reportSelectOpen(true);
    reportEditOpen(false);
    setOpenRemove(false);
    reportSelectConfirmOpen(false);
  };

  const reportAnIssueSelectConfirmopenClickOpen = () => {
    reportSelectConfirmOpen(true);
    reportOpen(false);
    reportSelectOpen(false);
  };

  const reportAnIssueSuccessClickOpen = () => {
    successReportopen(true);
    reportSelectConfirmOpen(false);
  };

  const handleClose = () => {
    setOpenRemove(false);
    setOpen(false);
    deleteOpen(false);
    successOpen(false);
    reportOpen(false);
    reportEditOpen(false);
    reportSelectOpen(false);
    reportSelectConfirmOpen(false);
    successReportopen(false);
  };

  const handleClickSubmit = (
    gig_id,
    user_id,
    date,
    bookedworkers_id,
    checkin_checkout_id
  ) => {
    if (checkin && checkout) {
      const params = new URLSearchParams();

      params.append("gig_id", gig_id);
      params.append("date", date);
      params.append("business_checkin", checkinTimeFormat(checkin));
      params.append("business_checkout", checkinTimeFormat(checkout));
      params.append("user_id", user_id);

      axios.post(`api/gig/checkin`, params, config).then((res) => {
        if (res.data.ack === 1) {
          console.log(res);
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: res.data.msg,
          });
          props.getSelectedGigData(gig_id);
          dispatch({
            type: ACTIONS.UPDATE_GIG_DETAILS_WORKERS,
            payload: {
              bookedworkers_id: bookedworkers_id,
              checkin_checkout_id: checkin_checkout_id,
              check_in: checkin,
              check_out: checkout,
            },
          });
          setOpenOne(!openOne);
        } else {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg,
          });
        }
      });
    }
  };

  const handleComplete = (e, item) => {
    const params = new URLSearchParams();
    params.append("gig_id", item.gig_id);

    params.append("invite_id", item.id);

    axios.post(`api/gig/complete_gig`, params, config).then((res) => {
      if (res.data.ack === 1) {
        console.log('res', res);
        setConfirmationOpen(true);
        setConfirmationType({
          type: "success",
          message: res.data.msg,
        });
        setCompleteFrom(false);
        setExpanded(false);
        window.location.reload();
      } else {
        setConfirmationOpen(true);
        setConfirmationType({
          type: "error",
          message: res.data.msg,
        });
      }
    });
  };

  return (
    <>
      <Body
        className={"body"}
        color={Colors.midGray}
        fontWeight={"700"}
        text={
          "Upon arrival, please click/tap “Confirm Check-In” to confirm that the worker has arrived."
        }
      />

      {bookedworkers &&
        bookedworkers.length > 0 &&
        bookedworkers.length > 0 &&
        bookedworkers.map((item, index) => {
          return (
            <Accordion
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Link
                  to={{
                    pathname: "/view-profile-recommended",
                    state: { id: item.worker_id }
                  }}
                >
                  <Box className={"left-collapse"}>
                    <img
                      src={
                        item.profile_picture !== ""
                          ? `${workerImageBase}${item.profile_picture}`
                          : Round1
                      }
                      className={"round-img"}
                      alt=""
                    />
                    <Heading6Medium
                      color={Colors.nightGray}
                      className={"heading6medium"}
                      text={`${item.first_name} ${item.last_name}`}
                    />
                  </Box>
                </Link>
                <Box className={"right-collapse"}>
                  {item.status !== "remove" ? (
                    <LabelWrapper>
                      <Small
                        className={"small"}
                        fontWeight={"700"}
                        textDecoration={"underline"}
                        onClick={(e) => toggleChatClass(e, item)}
                        text={"Chat"}
                        color={Colors.blue}
                      />
                      {props.gig_details.status === "completed" ? (
                        <Small
                          className={"small"}
                          fontWeight={"700"}
                          text={"Report Issue"}
                          color={Colors.gray97}
                          onClick={(e) => e.stopPropagation()}
                          style={{ display: "none" }}
                        />
                      ) : (
                        <Small
                          className={"small"}
                          fontWeight={"700"}
                          textDecoration={"underline"}
                          onClick={reportAnIssueClickOpen}
                          text={"Report Issue"}
                          color={Colors.error}
                        />
                      )}
                      {props.gig_details.status === "completed" ? (
                        <Small
                          className={"small"}
                          fontWeight={"700"}
                          text={"Remove Worker"}
                          color={Colors.gray97}
                          onClick={(e) => e.stopPropagation()}
                          style={{ display: "none" }}
                        />
                      ) : (
                        <Small
                          className={"small"}
                          fontWeight={"700"}
                          textDecoration={"underline"}
                          onClick={(e) => removeWorkerClickOpen(e, item)}
                          text={"Remove Worker"}
                          color={Colors.blue}
                        />
                      )}
                      {props.gig_details.status === "completed" ? (
                        <Button
                          style={{
                            marginLeft: "7px",
                            padding: "5px",
                            textTransform: "none",
                            backgroundColor: "#eaf4dc",
                          }}
                          
                        >
                          <span
                            style={{ color: "#74B711", fontSize: "13px" }}
                          >
                            Gig Completed
                          </span>
                        </Button>
                      ) : item.status === "confirm" ? (
                        item.checkin_checkout.length > 0 && (
                          <Small
                            className={"small"}
                            fontWeight={"700"}
                            textDecoration={"underline"}
                            text={"Complete Gig"}
                            color={Colors.blue}
                            onClick={(e) => completeGigClickOpen(e, item)}
                          />
                        )
                      ) : (
                        <Small
                          className={"small"}
                          fontWeight={"700"}
                          text={"Complete Gig"}
                          color={Colors.gray97}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </LabelWrapper>
                  ) : (
                    <LabelWrapper>
                      <span className={"chips red"}>Removed</span>
                    </LabelWrapper>
                  )}
                  {item.checkin_checkout.length > 0 && (
                    <AddIcon className={"plusIcon"} />
                  )}
                  {item.checkin_checkout.length > 0 && (
                    <RemoveIcon className={"minusIcon"} />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Box className={"collapseContentTop"}>  // for successfull checkin
                  <Body
                    className={"body"}
                    fontWeight={"700"}
                    color={Colors.midGray}
                    text={"Monday, April 4th, 2022"}
                  />
                  <Box display={"flex"}>
                    <AccessTimeIcon className={"icon20"} />
                    <Body
                      className={"body"}
                      color={Colors.midGray}
                      text={"10:00 AM - 8:00 PM"}
                    />
                  </Box>
                  <Button
                    className="lightgreenbutton"
                    style={{ marginLeft: "unset" }}
                  >
                    <img src={SuccessIcon} alt="" className="icon24" />
                    {strings.CheckedIn}
                  </Button>
                </Box> */}
                {item.checkin_checkout.length > 0 &&
                  item.checkin_checkout.map((items) => {
                    return (
                      <>
                        <Box className={"collapseContentTop"}>
                          <Body
                            className={"body"}
                            fontWeight={"700"}
                            color={Colors.midGray}
                            text={
                              new Date(items.date)
                                .toDateString()
                                .substring(0, 11) +
                              ", " +
                              new Date(items.date).getFullYear()
                            }
                          />
                          <Box display={"flex"}>
                            <AccessTimeIcon className={"icon20"} />
                            <Body
                              className={"body"}
                              color={Colors.midGray}
                              text={`${items.checkin === null &&
                                items.checkout === null
                                ? `${items.worker_checkin} - ${items.worker_checkout}`
                                : new Date(items.checkin) == "Invalid Date"
                                  ? `${items.checkin} - ${items.checkout}`
                                  : formatDate(items.checkin, items.checkout)
                                }`}
                            />
                          </Box>
                          {items.checkin !== null && items.checkout !== null ? (
                            <Box>
                              <Button
                                className="lightgreenbutton"
                                style={{ marginLeft: "unset", padding: "10px" }}
                              >
                                <img
                                  src={SuccessIcon}
                                  alt=""
                                  className="icon24"
                                />
                                <span style={{ color: "#74B711" }}>Checked In</span>
                              </Button>
                              {props.gig_details.invoice || props.gig_details.status === "completed" ? (false && <Button className="editbutton" onClick={handleClickOne}>
                                <img src={editBlueIcon} alt="name" />
                                <Body
                                  color={Colors.Primary}
                                  fontWeight={"500"}
                                  padding={"0 0 0 10px"}
                                  text={""}
                                />
                              </Button>) : (<Button className="editbutton" onClick={handleClickOne}>
                                <img src={editBlueIcon} alt="name" />
                                <Body
                                  color={Colors.Primary}
                                  fontWeight={"500"}
                                  padding={"0 0 0 10px"}
                                  text={""}
                                />
                              </Button>)}
                            </Box>
                          ) : (
                            <SecondaryButton
                              className={
                                openOne
                                  ? "secondarybutton hide"
                                  : "secondarybutton"
                              }
                              onClick={handleClickOne}
                              text={"Confirm Check In"}
                            />
                          )}
                        </Box>
                        <Collapse in={openOne} timeout="auto" unmountOnExit>
                          <CheckInCollapse
                            businessCheckin={items.business_checkin}
                            businessCheckout={items.business_checkout}
                            workerCheckin={items.worker_checkin}
                            workerCheckout={items.worker_checkout}
                            checkinTime={items.checkin}
                            checkoutTime={items.checkout}
                            status={item.status}
                            setCheckin={(value) => setCheckin(value)}
                            setCheckout={(value) => setCheckout(value)}
                          />
                          {checkin && checkout ? (
                            <PrimaryButton
                              className="primarybutton"
                              onClick={() =>
                                handleClickSubmit(
                                  items.gig_id,
                                  items.user_id,
                                  items.date,
                                  item.id,
                                  items.id
                                )
                              }
                              text={strings.submit}
                              width={"113px"}
                            />
                          ) : (
                            <NeutralLightButton
                              className="neutrallightbutton"
                              text={strings.submit}
                              width={"113px"}
                            />
                          )}

                          <TransparentButton
                            className="transparentbutton"
                            onClick={handleClickOne}
                            text={strings.cancel}
                            width={"113px"}
                          />
                        </Collapse>
                        {completeFrom && item.status !== "remove" && (
                          <Box className={"question-answer"}>
                            <Heading6Medium
                              className={"heading6medium"}
                              fontWeight={"700"}
                              color={Colors.nightGray}
                              text={`Please answer the following questions in order to mark the gig as complete by ${item.first_name} ${item.last_name}:`}
                            />
                            <FormControl
                              style={{ marginTop: "20px", height: "auto" }}
                            >
                              <InputLabel
                                id="arriveontime"
                                fontWeight={"500"}
                                color={Colors.nightGray}
                                text={`Did ${item.first_name} ${item.last_name} arrive on time?`}
                              />
                              <RadioGroup
                                aria-labelledby="arriveontime"
                                defaultValue="Yes"
                                name="radio-buttons-group"
                                style={{ flexDirection: "row" }}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            <FormControl
                              style={{ marginTop: "12px", height: "auto" }}
                            >
                              <InputLabel
                                id="idOne"
                                fontWeight={"500"}
                                color={Colors.nightGray}
                                text={`Was ${item.first_name} ${item.last_name} dressed appropriately according to the instructions?`}
                              />
                              <RadioGroup
                                aria-labelledby="idOne"
                                defaultValue="Yes"
                                name="radio-buttons-group"
                                style={{ flexDirection: "row" }}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            <FormControl
                              style={{ marginTop: "12px", height: "auto" }}
                            >
                              <InputLabel
                                id="idTwo"
                                fontWeight={"500"}
                                color={Colors.nightGray}
                                text={`Would you hire ${item.first_name} ${item.last_name} again?`}
                              />
                              <RadioGroup
                                aria-labelledby="idTwo"
                                defaultValue="Yes"
                                name="radio-buttons-group"
                                style={{ flexDirection: "row" }}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            <FormControl
                              style={{
                                marginTop: "12px",
                                marginBottom: "20px",
                                height: "auto",
                              }}
                            >
                              <InputLabel
                                id="idThree"
                                fontWeight={"500"}
                                color={Colors.nightGray}
                                text={`Would you like to add ${item.first_name} ${item.last_name} to your Favorited Worker’s list?`}
                              />
                              <RadioGroup
                                aria-labelledby="idThree"
                                defaultValue="Yes"
                                name="radio-buttons-group"
                                style={{ flexDirection: "row" }}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            <Body
                              className={"body"}
                              fontWeight={"500"}
                              text={`Note: ${item.first_name} ${item.last_name} will be added to your Favorited Worker list after completing payment.`}
                            />
                            <Box style={{ marginTop: "20px" }}>
                              <SecondaryButton
                                className={"secondarybutton"}
                                width={"110px"}
                                text="Complete"
                                onClick={(e) => handleComplete(e, item)}
                              />
                            </Box>
                          </Box>
                        )}
                      </>
                    );
                  })}

                {/* <Box className={"collapseContentTop"}>
                  <Body
                    className={"body"}
                    fontWeight={"700"}
                    color={Colors.midGray}
                    text={"Monday, April 4th, 2022"}
                  />
                  <Box display={"flex"}>
                    <AccessTimeIcon className={"icon20"} />
                    <Body
                      className={"body"}
                      color={Colors.midGray}
                      text={"10:00 AM - 8:00 PM"}
                    />
                  </Box>
                  <SecondaryButton
                    className={
                      openTwo ? "secondarybutton hide" : "secondarybutton"
                    }
                    onClick={handleClickTwo}
                    text={"Confirm Check In"}
                  />
                </Box>
                <Collapse in={openTwo} timeout="auto" unmountOnExit>
                  <CheckInCollapse />
                  <NeutralLightButton
                    className="neutrallightbutton"
                    text={strings.submit}
                    width={"113px"}
                  />
                  <TransparentButton
                    className="transparentbutton"
                    onClick={handleClickTwo}
                    text={strings.cancel}
                    width={"113px"}
                  />
                </Collapse>

                <Box className={"collapseContentTop"}>
                  <Body
                    className={"body"}
                    fontWeight={"700"}
                    color={Colors.midGray}
                    text={"Monday, April 4th, 2022"}
                  />

                  <PrimaryButton
                    className={
                      openThree ? "primarybutton hide" : "primarybutton"
                    }
                    onClick={handleClickThree}
                    text={strings.AddCheckIn}
                  />
                </Box>
                <Collapse in={openThree} timeout="auto" unmountOnExit>
                  <CheckInCollapse />
                  <NeutralLightButton
                    className="neutrallightbutton"
                    text={strings.submit}
                    width={"113px"}
                  />
                  <TransparentButton
                    className="transparentbutton"
                    onClick={handleClickThree}
                    text={strings.cancel}
                    width={"113px"}
                  />
                </Collapse> */}
              </AccordionDetails>
            </Accordion>
          );
        })}
      {/* <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Box className={"left-collapse"}>
            <img src={Round1} className={"round-img"} alt="" />
            <Heading6Medium
              color={Colors.nightGray}
              className={"heading6medium"}
              text={"Richard Michicaels"}
            />
          </Box>
          <Box className={"right-collapse"}>
            <LabelWrapper>
              <Small
                className={"small"}
                fontWeight={"700"}
                textDecoration={"underline"}
                onClick={toggleChatClass}
                text={"Chat"}
                color={Colors.blue}
              />
              <Small
                className={"small disabled"}
                fontWeight={"700"}
                textDecoration={"underline"}
                text={"Report Issue"}
                color={Colors.error}
              />
              <Small
                className={"small disabled"}
                fontWeight={"700"}
                textDecoration={"underline"}
                text={"Remove Worker"}
                color={Colors.blue}
              />
              <span className={"chips green"}>Gig Completed</span>
            </LabelWrapper>
            <AddIcon className={"plusIcon"} />
            <RemoveIcon className={"minusIcon"} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={"collapseContentTop"}>
            <Button className="lightgreenbutton">
              <img src={SuccessIcon} alt="" className="icon24" />
              {strings.RequestSent}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
          <Box className={"left-collapse"}>
            <img src={Round1} className={"round-img"} alt="" />
            <Heading6Medium
              color={Colors.nightGray}
              className={"heading6medium"}
              text={"Richard Michicaels"}
            />
          </Box>
          <Box className={"right-collapse"}>
            <LabelWrapper>
              <span className={"chips red"}>Removed</span>
            </LabelWrapper>
            <AddIcon className={"plusIcon"} />
            <RemoveIcon className={"minusIcon"} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={"collapseContentTop"}>
            <Body
              className={"body"}
              fontWeight={"700"}
              color={Colors.midGray}
              text={"Monday, April 4th, 2022"}
            />
            <Box display={"flex"}>
              <AccessTimeIcon className={"icon20"} />
              <Body
                className={"body"}
                color={Colors.midGray}
                text={"10:00 AM - 8:00 PM"}
              />
            </Box>
            <SecondaryButton
              className={open ? "secondarybutton hide" : "secondarybutton"}
              onClick={handleClick}
              text={"Confirm Check In"}
            />
          </Box>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CheckInCollapse />
            <NeutralLightButton
              className="neutrallightbutton"
              text={strings.submit}
              width={"113px"}
            />
            <TransparentButton
              className="transparentbutton"
              onClick={handleClick}
              text={strings.cancel}
              width={"113px"}
            />
          </Collapse>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4 "}
        onChange={handleChange("panel4 ")}
      >
        <AccordionSummary
          aria-controls="panel4 bh-content"
          id="panel4  bh-header"
        >
          <Box className={"left-collapse"}>
            <img src={Round1} className={"round-img"} alt="" />
            <Heading6Medium
              color={Colors.nightGray}
              className={"heading6medium"}
              text={"Richard Michicaels"}
            />
          </Box>
          <Box className={"right-collapse"}>
            <LabelWrapper>
              <Small
                className={"small"}
                fontWeight={"700"}
                textDecoration={"underline"}
                onClick={toggleChatClass}
                text={"Chat"}
                color={Colors.blue}
              />
              <Small
                className={"small"}
                fontWeight={"700"}
                textDecoration={"underline"}
                text={"Report Issue"}
                color={Colors.error}
              />
              <Small
                className={"small"}
                fontWeight={"700"}
                textDecoration={"underline"}
                text={"Remove Worker"}
                color={Colors.blue}
              />
              <Small
                className={"small"}
                fontWeight={"700"}
                textDecoration={"underline"}
                text={"Complete Gig"}
                color={Colors.blue}
              />
            </LabelWrapper>
            <AddIcon className={"plusIcon"} />
            <RemoveIcon className={"minusIcon"} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={"collapseContentTop"}>
            <Body
              className={"body"}
              fontWeight={"700"}
              color={Colors.midGray}
              text={"Monday, April 4th, 2022"}
            />
            <Box display={"flex"}>
              <AccessTimeIcon className={"icon20"} />
              <Body
                className={"body"}
                color={Colors.midGray}
                text={"10:00 AM - 8:00 PM"}
              />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Button className="lightgreenbutton">
                <img src={SuccessIcon} alt="" className="icon24" />
                {"Checked In"}
              </Button>
            </Box>
          </Box>
          <Box className={"collapseContentTop"}>
            <Body
              className={"body"}
              fontWeight={"700"}
              color={Colors.midGray}
              text={"Monday, April 4th, 2022"}
            />
            <Box display={"flex"}>
              <AccessTimeIcon className={"icon20"} />
              <Body
                className={"body"}
                color={Colors.midGray}
                text={"10:00 AM - 8:00 PM"}
              />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Button className="lightgreenbutton">
                <img src={SuccessIcon} alt="" className="icon24" />
                {"Checked In"}
              </Button>
            </Box>
          </Box>
          <Box className={"collapseContentTop"}>
            <Body
              className={"body"}
              fontWeight={"700"}
              color={Colors.midGray}
              text={"Monday, April 4th, 2022"}
            />
            <Box display={"flex"}>
              <AccessTimeIcon className={"icon20"} />
              <Body
                className={"body"}
                color={Colors.midGray}
                text={"10:00 AM - 8:00 PM"}
              />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Button className="lightgreenbutton">
                <img src={SuccessIcon} alt="" className="icon24" />
                {"Checked In"}
              </Button>
            </Box>
          </Box>
          <Box className={"collapseContentTop"}>
            <Body
              className={"body"}
              fontWeight={"700"}
              color={Colors.midGray}
              text={"Monday, April 4th, 2022"}
            />
            <Box display={"flex"}>
              <AccessTimeIcon className={"icon20"} />
              <Body
                className={"body"}
                color={Colors.midGray}
                text={"10:00 AM - 8:00 PM"}
              />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Button className="lightgreenbutton">
                <img src={SuccessIcon} alt="" className="icon24" />
                {"Checked In"}
              </Button>
            </Box>
          </Box>
          <Box className={"question-answer"}>
            <Heading6Medium
              className={"heading6medium"}
              fontWeight={"700"}
              color={Colors.nightGray}
              text={
                "Please answer the following questions in order to mark the gig as complete by Richard:"
              }
            />
            <FormControl style={{ marginTop: "20px", height: "auto" }}>
              <InputLabel
                id="arriveontime"
                fontWeight={"500"}
                color={Colors.nightGray}
                text={"Did Richard arrive on time?"}
              />
              <RadioGroup
                aria-labelledby="arriveontime"
                defaultValue="Yes"
                name="radio-buttons-group"
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ marginTop: "12px", height: "auto" }}>
              <InputLabel
                id="idOne"
                fontWeight={"500"}
                color={Colors.nightGray}
                text={
                  "Was Richard dressed appropriately according to the instructions?"
                }
              />
              <RadioGroup
                aria-labelledby="idOne"
                defaultValue="Yes"
                name="radio-buttons-group"
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ marginTop: "12px", height: "auto" }}>
              <InputLabel
                id="idTwo"
                fontWeight={"500"}
                color={Colors.nightGray}
                text={"Would you hire Richard again?"}
              />
              <RadioGroup
                aria-labelledby="idTwo"
                defaultValue="Yes"
                name="radio-buttons-group"
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl
              style={{
                marginTop: "12px",
                marginBottom: "20px",
                height: "auto",
              }}
            >
              <InputLabel
                id="idThree"
                fontWeight={"500"}
                color={Colors.nightGray}
                text={
                  "Would you like to add Richard to your Favorited Worker’s list?"
                }
              />
              <RadioGroup
                aria-labelledby="idThree"
                defaultValue="Yes"
                name="radio-buttons-group"
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <Body
              className={"body"}
              fontWeight={"500"}
              text={
                "Note: Richard will be added to your Favorited Worker list after completing payment."
              }
            />
            <Box style={{ marginTop: "20px" }}>
              <SecondaryButton
                className={"secondarybutton"}
                width={"110px"}
                text={strings.Complete}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion> */}
      <Box className={isChatActive ? "chatBox show" : "chatBox"}>
        <img
          src={CroseImg}
          alt="name"
          onClick={toggleChatClass}
          className="chat-close-icon"
        />
        {isChatActive && (
          <GigChat selectedWorker={selectedWorker} user_id={user_id} />
        )}
      </Box>

      {/*removeWorkeropen Modal*/}
      <Dialog
        open={removeWorkeropen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove Worker"}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LabelWrapper>
              <Body
                className={"body"}
                text={"Please provide a reason you are removing"}
                color={Colors.midGray}
              />
              &nbsp;
              <Body
                className={"body"}
                fontWeight={"500"}
                text={selected && selected.first_name}
                color={Colors.midGray}
              />
            </LabelWrapper>
            <Body
              className={"body"}
              text={" from this gig. "}
              color={Colors.midGray}
              style={{ marginLeft: "2px" }}
            />
          </DialogContentText>
          <div className="grid-item">
            <TextAreafield
              placeholder={"Your Reason"}
              className="textareafield textarea"
              width={"100%"}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value === "") {
                  setReasonError(true);
                } else {
                  setReasonError(false);
                }
              }}
            />
            {reasonError && (
              <Error
                className="inputerror"
                text={"Reason is required"}
                color={Colors.error}
                margin={"4px 0 8px 0"}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <SecondaryButton
            className="secondarybutton"
            autoFocus
            text={"Next"}
            onClick={deleteRemoveWorkerClickopen}
            width={"120px"}
          />
        </DialogActions>
      </Dialog>

      {/*Delete Modal*/}
      <Dialog
        open={deleteRemoveWorkeropen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove Worker"}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to remove this worker?"}
            <LabelWrapper>
              <Body
                className={"body"}
                style={{ marginTop: '10px', color: '#9b9999' }}
                text={"We would generate the invoice according to the updated checkIn checkOut time by the worker or the system generated if it is blank."}
                color={Colors.midGray}
              />
            </LabelWrapper>
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
            onClick={successRemoveWorkerClickopen}
            autoFocus
            text={"Confirm Removal"}
            width={"190px"}
          />
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>

      {/*success modal*/}
      <Dialog
        open={successRemoveWorkeropen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ textAlign: "center" }}
      >
        <DialogTitle id="alert-dialog-title">
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "10px" }}>
          <img src={SuccessIcon} alt="" className="icon60" />
          <DialogContentText id="alert-dialog-description">
            <Heading5Medium
              className={"heading5medium"}
              textAlign={"center"}
              color={Colors.midGray}
              fontWeight={"700"}
              margin={"20px 0px 15px 0px"}
              text={"You have successfully removed this worker"}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <PrimaryButton
            className="primarybutton"
            onClick={handleClose}
            autoFocus
            text={strings.Continue}
            width={"210px"}
          />
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>

      {/*report an Issue*/}
      <Dialog
        open={reportAnIssueopen}
        onClose={handleClose}
        className={"modalwidth610"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={Colors.black}>
          {strings.ReportanIssue}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LabelWrapper style={{ margin: "0px 0px 20px 0px" }}>
              <Body
                className={"body"}
                text={"You are reporting "}
                color={Colors.midGray}
              />
              &nbsp;
              <Body
                className={"body"}
                fontWeight={"500"}
                text={"Richard Michicaels "}
                color={Colors.midGray}
              />
            </LabelWrapper>
          </DialogContentText>
          <Body
            className={"body"}
            text={"Please select from the following options:"}
          />
          <ul className={"report-ul"}>
            <li>
              The worker is not here for the job and I have attempted to contact
              the worker via the number provided
            </li>
            <li onClick={reportAnIssueSelectopenClickOpen}>
              The worker does not possess the relevant certificate/license
              stated on their profile that I have set as a requirement to
              perform this job
            </li>
            <li>
              The worker arrived without the mentioned equipment or attire
              specified in the gig description.
            </li>
            <li>
              The worker is not following instructions provided and is causing a
              disruption that is detrimental to my business.
            </li>
            <li onClick={reportAnIssueEditClickOpen}>
              I am experiencing another type of issue
            </li>
          </ul>
        </DialogContent>
      </Dialog>

      {/*report an Issue YOU SELECTED*/}
      <Dialog
        open={reportAnIssueSelectopen}
        onClose={handleClose}
        className={"modalwidth610"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={Colors.black}>
          {strings.ReportanIssue}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "0px" }}>
          <DialogContentText id="alert-dialog-description">
            <LabelWrapper style={{ margin: "0px 0px 20px 0px" }}>
              <Body
                className={"body"}
                text={"You are reporting "}
                color={Colors.midGray}
              />
              &nbsp;
              <Body
                className={"body"}
                fontWeight={"500"}
                text={"Richard Michicaels "}
                color={Colors.midGray}
              />
            </LabelWrapper>
          </DialogContentText>
          <Small
            className={"small"}
            fontSize={"10px"}
            style={{ margin: "0px 0px 6px 0px" }}
            color={Colors.midGray}
            text={"YOU SELECTED"}
          />
          <Body
            className={"body"}
            fontWeight={"500"}
            color={Colors.nightGray}
            text={
              "The worker does not possess the relevant certificate/licence stated on their profile that I have set as a requirement to perform this job. "
            }
          />
          <Divider
            className={"divider-line"}
            style={{ margin: "10px 0px 10px 0px" }}
          />
          <Body
            className={"body"}
            color={Colors.nightGray}
            style={{ margin: "0px 0px 16px 0px" }}
            text={"Please select from the following options:"}
          />
          <Body
            className={"body"}
            fontWeight={"500"}
            color={Colors.blue}
            margin={"10px 0px 10px 0px"}
            text={
              "Find me a replacement ASAP. (Note: This does not guarantee that we will be able to find a replacement. It may take up to an hour for a replacement worker to be found.)  "
            }
          />
          <Body
            className={"body"}
            fontWeight={"500"}
            color={Colors.blue}
            margin={"10px 0px 10px 0px"}
            text={
              "I will accept the worker and assign him/her another task that doesn t require said certificate/licence. (Note: This has to be a mutual agreement with the worker.)"
            }
          />
          <Body
            className={"body"}
            fontWeight={"500"}
            color={Colors.blue}
            margin={"10px 0px 10px 0px"}
            onClick={reportAnIssueSelectConfirmopenClickOpen}
            text={
              "I don’t need a replacement, I’d like the worker to leave and for this worker to be cancelled from the gig. (Note: You will not be charged for this worker.)"
            }
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "start" }}>
          <TransparentButton
            className="transparentbutton"
            onClick={reportAnIssueClickOpen}
            text={strings.Back}
            width={"auto"}
          />
        </DialogActions>
      </Dialog>

      {/*report an Issue YOU SELECTED*/}
      <Dialog
        open={reportAnIssueSelectConfirmopen}
        onClose={handleClose}
        className={"modalwidth610"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={Colors.black}>
          {strings.ReportanIssue}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "0px" }}>
          <DialogContentText id="alert-dialog-description">
            <LabelWrapper style={{ margin: "0px 0px 20px 0px" }}>
              <Body
                className={"body"}
                text={"You are reporting "}
                color={Colors.midGray}
              />
              &nbsp;
              <Body
                className={"body"}
                fontWeight={"500"}
                text={"Richard Michicaels "}
                color={Colors.midGray}
              />
            </LabelWrapper>
          </DialogContentText>
          <Small
            className={"small"}
            fontSize={"10px"}
            style={{ margin: "0px 0px 6px 0px" }}
            color={Colors.midGray}
            text={"YOU SELECTED"}
          />
          <Body
            className={"body"}
            fontWeight={"500"}
            color={Colors.nightGray}
            lineHeight={"20px"}
            text={
              "I don’t need a replacement, I’d like the worker to leave and for this worker to be cancelled from the gig. (Note: You will not be charged for this worker.)"
            }
          />
          <Divider
            className={"divider-line"}
            style={{ margin: "10px 0px 10px 0px" }}
          />
          <LabelWrapper style={{ margin: "0px 0px 20px 0px" }}>
            <Body
              className={"body"}
              text={"What will happen if you"}
              color={Colors.nightGray}
            />
            &nbsp;
            <Body
              className={"body"}
              fontWeight={"700"}
              text={"Confirm,"}
              color={Colors.nightGray}
            />
          </LabelWrapper>
          <Body
            className={"body"}
            color={Colors.nightGray}
            text={
              "— {Worker name} will be cancelled from the gig and asked to leave your work site."
            }
          />
        </DialogContent>
        <DialogActions>
          <TransparentButton
            className="transparentbutton"
            onClick={reportAnIssueSelectopenClickOpen}
            text={strings.Back}
            width={"auto"}
          />
          <PrimaryButton
            className="primarybutton"
            onClick={reportAnIssueSuccessClickOpen}
            autoFocus
            text={strings.confirm}
            width={"140px"}
          />
        </DialogActions>
      </Dialog>

      {/*report success modal*/}
      <Dialog
        open={reportAnIssueSuccessopen}
        onClose={handleClose}
        className={"modalwidth610"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ textAlign: "center" }}
      >
        <DialogTitle id="alert-dialog-title">
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "10px" }}>
          <h2 className={"heading30"}>
            <img src={SuccessIcon} alt="" className="icon60" />
            Richard successfully cancelled
          </h2>
          <DialogContentText id="alert-dialog-description">
            <Body
              className={"body"}
              textAlign={"center"}
              color={Colors.midGray}
              margin={"20px 0px 15px 0px"}
              text={
                "{Worker name} has been cancelled for the gig. Sorry for the inconvenience and thank you for your understanding."
              }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <PrimaryButton
            className="primarybutton"
            onClick={handleClose}
            autoFocus
            text={strings.Continue}
            width={"210px"}
          />
        </DialogActions>
      </Dialog>

      {/*reportAnIssueopen Modal*/}
      <Dialog
        open={reportAnIssueEditopen}
        onClose={handleClose}
        className={"modalwidth610"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {strings.ReportanIssue}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LabelWrapper>
              <Body
                className={"body"}
                text={"You are reporting "}
                color={Colors.midGray}
              />
              &nbsp;
              <Body
                className={"body"}
                fontWeight={"500"}
                text={" Richard Michicaels "}
                color={Colors.midGray}
              />
            </LabelWrapper>
          </DialogContentText>
          <Small
            className={"small"}
            fontSize={"10px"}
            style={{ margin: "0px 0px 6px 0px" }}
            color={Colors.midGray}
            text={"YOU SELECTED"}
          />

          <div className="grid-item">
            <InputLabel
              text={"I am experiencing another type of issue"}
              color={Colors.nightGray}
              padding={"0px 0 8px 0"}
              className={"inputlabel"}
            />
            <TextAreafield
              placeholder={
                "Please provide as much detail as possible about the issue you are experiencing"
              }
              className="textareafield textarea"
              width={"100%"}
            />
          </div>
          <div className="grid-item" style={{ margin: "10px 0px 6px 0px" }}>
            <InputLabel
              text={"Would you like to cancel the worker?"}
              color={Colors.nightGray}
              padding={"0px 0 8px 0"}
              className={"inputlabel"}
            />

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="SingleDay"
              name="radio-buttons-group"
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          <Divider
            className={"divider-line"}
            style={{ margin: "10px 0px 10px 0px" }}
          />
          <LabelWrapper style={{ margin: "0px 0px 10px 0px" }}>
            <Body
              className={"body"}
              text={"What will happen if you"}
              color={Colors.nightGray}
            />
            &nbsp;
            <Body
              className={"body"}
              fontWeight={"700"}
              text={"Confirm,"}
              color={Colors.nightGray}
            />
          </LabelWrapper>
          <Body
            className={"body"}
            lineHeight={"20px"}
            text={
              "— Your message will be sent to a member of our team who will review it."
            }
          />
          <Body
            className={"body"}
            lineHeight={"20px"}
            text={"— The worker will be removed from this gig."}
          />
        </DialogContent>
        <DialogActions>
          <TransparentButton
            className="transparentbutton"
            onClick={reportAnIssueSelectopenClickOpen}
            text={strings.Back}
            width={"auto"}
          />
          <PrimaryButton
            className="primarybutton"
            autoFocus
            text={strings.Continue}
            onClick={deleteRemoveWorkerClickopen}
            width={"120px"}
          />
        </DialogActions>
      </Dialog>
      {confirmationOpen && (
        <Popup
          popupIsOpen={confirmationOpen}
          style={POPUP_TYPE.CONFIRMATION}
          type={confirmationType}
          closePopup={() => setConfirmationOpen(false)}
        />
      )}
    </>
  );
}

export default GigDetailBookedWorkerSingleDay;
