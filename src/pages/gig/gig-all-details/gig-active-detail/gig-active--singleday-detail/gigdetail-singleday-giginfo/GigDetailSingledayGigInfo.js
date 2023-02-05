import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import GoogleApiWrapper from "../../../../../create-gig/cgig-location/LocationMarker";
import {
  Heading4Medium,
  Heading5Medium,
  Body,
  Error,
} from "../../../../../../Styles-Elements/Labels";
import * as Colors from "../../../../../../Styles-Elements/Colors";

import {
  SecondaryButton,
  TransparentButton,
  PrimaryButton,
} from "../../../../../../Styles-Elements/Buttons";
import { TextAreafield } from "../../../../../../Styles-Elements/Inputs";

import "../../../../GIGS.scss";

import MapImg from "../../../../../../image-assets/product/map.png";
import stopRedImg from "../../../../../../image-assets/structure/stopred.svg";
import CroseImg from "../../../../../../image-assets/structure/crose-icon-gray.svg";
import SuccessIcon from "../../../../../../image-assets/structure/success-alert.svg";
import axios from "../../../../../../api/axios";

import { ACTIONS } from "../../../../../../store/actions/index";

// Importing localised strings
const strings = require("../../../../../../localisation_en.json");

const selectedValue2 = {
  position: "absolute",
  width: "350px",
  height: "200px",
};

const selectedValue3 = {
  position: "absolute",
  width: "400px",
  height: "200px",
};

function GigDetailSingledayGigInfo(props) {
  console.log(props.gig_details);
  const history = useHistory();
  const dispatch = useDispatch();
  // (basically for the checkout button to work on the manage seats section)
  const [cancelGigopen, setOpenRemove] = React.useState(false);
  const [deleteCancelGigopen, deleteOpen] = React.useState(false);
  const [successCancelGigopen, successOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [reasonError, setReasonError] = React.useState(false);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let licenses =
    props.licenseData &&
    props.gig_details.experience &&
    props.licenseData.filter((item) =>
      props.gig_details.experience.find(
        (exp) =>
          exp.certificate_and_licence_id.toString() === item.id.toString()
      )
    );
  licenses =
    licenses &&
    licenses.length > 0 &&
    licenses.map((item) => {
      let obj = props.gig_details.experience.find((items) => {
        return (
          items.certificate_and_licence_id.toString() === item.id.toString()
        );
      });

      return {
        ...item,
        required: obj && obj.required,
      };
    });

  let location =
    props.gigLocationInfo &&
    props.gig_details.location_id &&
    props.gigLocationInfo.find(
      (item) => item.id.toString() === props.gig_details.location_id.toString()
    );

  const cancelGigClickOpen = () => {
    setOpenRemove(true);
  };

  const deleteSelctedGig = () => {
    let gig_id = props.gig_details.id;

    axios
      .get(`/api/gig/cancel_gig/${gig_id}`, config)
      .then((res) => {
        console.log(res);
        if (res.data.ack === 1) {
          successOpen(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteCancelGigClickopen = () => {
    if (reason === "") {
      setReasonError(true);
    } else {
      deleteOpen(true);
      setOpenRemove(false);
    }
  };

  const successCancelGigClickopen = () => {
    deleteSelctedGig();
    deleteOpen(false);
    setOpenRemove(false);
  };

  const handleClose = () => {
    successOpen(false);
    deleteOpen(false);
    setOpenRemove(false);

    dispatch({
      type: ACTIONS.CLEAR_GIG_DATA,
    });
  };

  const handleCloseSucess = () => {
    successOpen(false);
    deleteOpen(false);
    setOpenRemove(false);
    let path = `gig`;
    history.push(path);
  };

  const showMapInClicked = () => {
    window.open(
      `https://maps.google.com?q=${location.latitude} ${location.longitude}`
      // `https://www.google.com/maps/place/${parseInt(
      //   location.latitude
      // )}+${parseInt(location.longitude)}/@${location.latitude},${
      //   location.longitude
      // },10.75z/`
    );
  };

  return (
    <div className="main-app-grid">
      <div className="gigdetail-giginfo-main-holder">
        <Box className={"padding20"}>
          <div className={"left-side"}>
            <Heading4Medium
              className={"heading4medium"}
              text={strings.description}
              color={Colors.nightGray}
              padding={"0 0 5px 0"}
              fontWeight={"700"}
            />

            <div
              className={"body"}
              style={{ padding: "0 0 4px 0", marginLeft: "8px" }}
              dangerouslySetInnerHTML={{
                __html: props.gig_details.description,
              }}
            />
            {/* <Body
              className={"body"}
              text={strings.youWillHaveTheOpportunityToBePartOfAFun}
              color={Colors.midGray}
              padding={"0 0 24px 0"}
            />
            <Body
              className={"body"}
              text={strings.youWillBeResponsibleFor}
              color={Colors.midGray}
              padding={"0 0 24px 0"}
            />
            <Body
              className={"body"}
              text={strings.servingCustomers}
              color={Colors.midGray}
              padding={"0 0 4px 0"}
            />
            <Body
              className={"body"}
              text={strings.operatingTheEspressoMachine}
              color={Colors.midGray}
              padding={"0 0 4px 0"}
            />
            <Body
              className={"body"}
              text={strings.operatingTheCashRegisterWhenRequired}
              color={Colors.midGray}
              padding={"0 0 16px 0"}
            /> */}
            <Heading5Medium
              className={"heading5medium"}
              text={strings.CertificateLicense}
              color={Colors.nightGray}
              padding={"0 0 5px 0"}
              fontWeight={"700"}
            />
            {/* {props.gig_details.experience.map(())} */}
            {/* {console.log(licenses)} */}
            {licenses &&
              licenses.map((item) => {
                return (
                  <>
                    <Body
                      className={"body"}
                      text={`${item.name} ${
                        item.required === 1 ? "(required)" : ""
                      }`}
                      color={Colors.midGray}
                      padding={"0 0 15px 8px"}
                    />
                  </>
                );
              })}

            <Heading4Medium
              className={"heading4medium"}
              text={strings.instructions}
              color={Colors.nightGray}
              padding={"0 0 12px 0"}
              fontWeight={"700"}
            />
            <Body
              className={"body"}
              text={strings.attire}
              color={Colors.nightGray}
              padding={"0 0 4px 0"}
              fontWeight={"700"}
            />
            <div
              className={"body-text"}
              style={{ padding: "0 0 4px 0", marginLeft: "8px" }}
              dangerouslySetInnerHTML={{
                __html: props.gig_details.attire,
              }}
            />
            <Body
              className={"body"}
              text={strings.thingsToBring}
              color={Colors.nightGray}
              padding={"0 0 4px 0"}
              fontWeight={"700"}
            />
            <div
              className={"body-text"}
              style={{ padding: "0 0 4px 0", marginLeft: "8px" }}
              dangerouslySetInnerHTML={{
                __html: props.gig_details.things_to_bring,
              }}
            />
            <Body
              className={"body"}
              text={strings.AdditionalInformation}
              color={Colors.nightGray}
              padding={"0 0 4px 0"}
              fontWeight={"700"}
            />
            <div
              className={"body-text"}
              style={{ padding: "0 0 4px 0", marginLeft: "8px" }}
              dangerouslySetInnerHTML={{
                __html: props.gig_details.additional_info,
              }}
            />

            {/* <Body
              className={"body"}
              text={strings.Pleaseenterviathebackdoor}
              color={Colors.midGray}
              padding={"0 0 4px 0"}
            />
            <Body
              className={"body"}
              text={strings.Youwillbeprovidedameal}
              color={Colors.midGray}
              padding={"0 0 4px 0"}
            />
            <Body
              className={"body"}
              text={strings.Tipsnotincluded}
              color={Colors.midGray}
              padding={"0 0 20px 0"}
            /> */}
          </div>
          <div className={"right-side"}>
            <div style={{ height: "210px", width: "250px" }}>
              <GoogleApiWrapper
                selectedAddress={location}
                selectedMapStyles={selectedValue2}
                selectedContainerStyle={selectedValue3}
              />
            </div>
            <Body
              className={"body centerText"}
              color={Colors.black}
              text={location && location.address1}
            />
            <Body
              className={"body centerText"}
              color={Colors.blue}
              fontWeight={"500"}
              text={strings.Getdirectionstohere}
              onClick={showMapInClicked}
              style={{ cursor: "pointer" }}
            />

            <ul className={"success-ul"}>
              {props.gig_details.transit &&
                props.gig_details.transit !== "" &&
                props.gig_details.transit.split(",").length > 0 &&
                props.gig_details.transit.split(",").map((item) => {
                  return (
                    <li>
                      <img src={SuccessIcon} alt="" className="successIcon" />
                      {item === "Free parking nearby"
                        ? "There is free parking available nearby"
                        : item === "Transit options are nearby"
                        ? "There are transit Options available nearby"
                        : item === "Paid parking nearby"
                        ? "There is paid parking available nearby"
                        : item === "Transit options are only a walk away"
                        ? "There are transit options, a walk away"
                        : item === "No parking available nearby"
                        ? "There is no parking available nearby"
                        : "There are no transit options available nearby"}
                    </li>
                  );
                })}

              {/* <li>
                <img src={SuccessIcon} alt="" className="successIcon" />
                {"There are transit options, a walk away"}
              </li> */}
            </ul>
            {props.gig_details.status !== "cancel" &&
              props.gig_details.status !== "completed" && (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  p={"0 !important"}
                  onClick={cancelGigClickOpen}
                >
                  <img src={stopRedImg} alt="name" />
                  <Body
                    text={`Cancel this Gig`}
                    color={Colors.error}
                    fontWeight={"500"}
                    padding={"0 0 0px 8px"}
                    cursor={"pointer"}
                  />
                </Box>
              )}
          </div>
        </Box>
      </div>

      {/*cancelGigopen Modal*/}
      <Dialog
        open={cancelGigopen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancel this Gig"}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Body
              className={"body"}
              text={"Please let us know why you would like to cancel this gig."}
              color={Colors.midGray}
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
        <DialogActions style={{ marginTop: "-8px" }}>
          <TransparentButton
            className="transparentbutton"
            onClick={handleClose}
            text={strings.Back}
            width={"auto"}
          />
          <SecondaryButton
            className="secondarybutton"
            autoFocus
            text={`Next`}
            onClick={deleteCancelGigClickopen}
            width={"120px"}
          />
        </DialogActions>
      </Dialog>

      {/*Delete Modal*/}
      <Dialog
        open={deleteCancelGigopen}
        onClose={handleClose}
        className={"modalwidth610"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to cancel this gig?`}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Once you cancel this gig, "}
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
            onClick={successCancelGigClickopen}
            autoFocus
            text={`Confirm Cancellation`}
            width={"190px"}
          />
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>

      {/*success modal*/}
      <Dialog
        open={successCancelGigopen}
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
              text={"You have successfully cancelled this gig"}
            />
            <Body
              className={"body"}
              textAlign={"center"}
              color={Colors.midGray}
              text={"Confirm steps have been taken"}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <PrimaryButton
            className="primarybutton"
            onClick={handleCloseSucess}
            autoFocus
            text={`Continue`}
            width={"210px"}
          />
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GigDetailSingledayGigInfo;
