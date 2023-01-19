import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import {
  Heading4Medium,
  Heading5Medium,
  Body,
} from "../../../../../../../Styles-Elements/Labels";
import * as Colors from "../../../../../../../Styles-Elements/Colors";
import {
  SecondaryButton,
  TransparentButton,
  PrimaryButton,
} from "../../../../../../../Styles-Elements/Buttons";
import { TextAreafield } from "../../../../../../../Styles-Elements/Inputs";

import "../../../../GIGS.scss";

import MapImg from "../../../../../../../image-assets/product/map.png";
import stopRedImg from "../../../../../../../image-assets/structure/stopred.svg";
import CroseImg from "../../../../../../../image-assets/structure/crose-icon-gray.svg";
import SuccessIcon from "../../../../../../../image-assets/structure/success-alert.svg";

// Importing localised strings
const strings = require("../../../../../../../localisation_en.json");

function GigDetailSingledayGigInfo(props) {
  // (basically for the checkout button to work on the manage seats section)
  const [cancelGigopen, setOpenRemove] = React.useState(false);
  const [deleteCancelGigopen, deleteOpen] = React.useState(false);
  const [successCancelGigopen, successOpen] = React.useState(false);

  const cancelGigClickOpen = () => {
    setOpenRemove(true);
  };

  const deleteCancelGigClickopen = () => {
    deleteOpen(true);
    setOpenRemove(false);
  };

  const successCancelGigClickopen = () => {
    successOpen(true);
    deleteOpen(false);
    setOpenRemove(false);
  };

  const handleClose = () => {
    successOpen(false);
    deleteOpen(false);
    setOpenRemove(false);
  };

  return (
    <div className="main-app-grid admin-main-content-dv">
      <div className="gigdetail-giginfo-main-holder">
        <Box className={"padding20"}>
          <div className={"left-side"}>
            <Heading4Medium
              className={"heading4medium"}
              text={strings.description}
              color={Colors.nightGray}
              padding={"0 0 12px 0"}
              fontWeight={"700"}
            />
            <Body
              className={"body"}
              text={
                strings.weAreSearchingForAnExperiencedAndEnergeticBaristaToFillInAShift
              }
              color={Colors.midGray}
              padding={"0 0 4px 0"}
            />
            <Body
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
            />
            <Heading5Medium
              className={"heading5medium"}
              text={strings.CertificateLicense}
              color={Colors.nightGray}
              padding={"0 0 12px 0"}
              fontWeight={"700"}
            />
            <Body
              className={"body"}
              text={strings._servingItRight}
              color={Colors.midGray}
              padding={"0 0 4px 0"}
            />
            <Body
              className={"body"}
              text={strings.workingLicense}
              color={Colors.midGray}
              padding={"0 0 32px 0"}
            />
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
            <Body
              className={"body"}
              text={strings.blackTshirtAndLongPants}
              color={Colors.midGray}
              padding={"0 0 4px 0"}
            />
            <Body
              className={"body"}
              text={strings.blackDarkNonSlipShoes}
              color={Colors.midGray}
              padding={"0 0 16px 0"}
            />
            <Body
              className={"body"}
              text={strings.thingsToBring}
              color={Colors.nightGray}
              padding={"0 0 4px 0"}
              fontWeight={"700"}
            />
            <Body
              className={"body"}
              text={strings.Bringyourownapron}
              color={Colors.midGray}
              padding={"0 0 16px 0"}
            />
            <Body
              className={"body"}
              text={strings.AdditionalInformation}
              color={Colors.nightGray}
              padding={"0 0 4px 0"}
              fontWeight={"700"}
            />
            <Body
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
            />
          </div>
          <div className={"right-side"}>
            <img src={MapImg} alt="name" className={"map-img"} />
            <Body
              className={"body centerText"}
              color={Colors.black}
              text={"740 Hamamiltion St. Vancouver, BC, V6B 2H9"}
            />
            <Body
              className={"body centerText"}
              color={Colors.blue}
              fontWeight={"500"}
              text={strings.Getdirectionstohere}
            />

            <ul className={"success-ul"}>
              <li>
                <img src={SuccessIcon} alt="" className="successIcon" />
                {"There is free parking available nearby"}
              </li>
              <li>
                <img src={SuccessIcon} alt="" className="successIcon" />
                {"There are transit options, a walk away"}
              </li>
            </ul>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              p={"0 !important"}
              onClick={cancelGigClickOpen}
            >
              <img src={stopRedImg} alt="name" />
              <Body
                text={strings.cancelThisGig}
                color={Colors.error}
                fontWeight={"500"}
                padding={"0 0 0px 8px"}
                cursor={"pointer"}
              />
            </Box>
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
          {strings.cancelThisGig}
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
            />
          </div>
        </DialogContent>
        <DialogActions>
          <TransparentButton
            className="transparentbutton"
            onClick={handleClose}
            text={strings.Back}
            width={"auto"}
          />
          <SecondaryButton
            className="secondarybutton"
            autoFocus
            text={strings.Next}
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
          {strings.Areyousureyouwanttocancelthisgig}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Once you cancel this gig, <explain what happens>"}
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
            text={strings.ConfirmCancellation}
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
              text={"<Confirm steps have been taken>"}
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
    </div>
  );
}

export default GigDetailSingledayGigInfo;
