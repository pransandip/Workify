// Importing material ui
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import {
  Heading5Medium,
  Heading6Medium,
  Small,
} from "../../../../../../Styles-Elements/Labels";
import { PrimaryButton } from "../../../../../../Styles-Elements/Buttons";
import * as Colors from "../../../../../../Styles-Elements/Colors";
// images
import ArrowIcon from "../../../../../../image-assets/structure/arrow-right.svg";
import CroseImg from "../../../../../../image-assets/structure/crose-icon-gray.svg";

import "../../../../GIGS.scss";
// Importing localised strings
const strings = require("../../../../../../localisation_en.json");

function CheckInCollapse(props) {
  console.log('new Date(props.workerCheckin)', new Date(props.workerCheckin))
  const [checkInopen, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState(null);
  const [checkinTime, setCheckinTime] = React.useState(null);
  const [checkoutTime, setCheckoutTime] = React.useState(null);
  const [timeError, setTimeError] = React.useState(null);
  const checkInClickOpen = (type) => {
    setOpen(true);
    setSelectedType(type);
  };

  const checkTime = (startDate, endDate) => {
    console.log('startDate', startDate)
    console.log('endDate', endDate)
    let flag = true;
    if (startDate && endDate) {
      var start = moment(startDate);
      var end = moment(endDate);
      let workingTime = parseFloat(end.diff(start, "hours", "minutes", true));
      console.log('workingTime', workingTime)
      if (workingTime < 0) {
        flag = false;
        setTimeError(true);
      } else {
        flag = true;
        setTimeError(false);
      }
    }
    return flag;
  };

  const handleSave = () => {
    let timeDiff = true;
    if (selectedType === "checkin") {
      setCheckinTime(value);

      timeDiff = checkTime(value, checkoutTime);
      if (timeDiff) {
        props.setCheckin(value);
      }

      // if (props.checkoutTime !== null) {
      //   props.setCheckout(props.checkoutTime);
      // }
    } else {
      setCheckoutTime(value);
      timeDiff = checkTime(checkinTime, value);
      if (timeDiff) {
        props.setCheckout(value);
      }
      // if (props.checkinTime !== null) {
      //   props.setCheckin(props.checkinTime);
      // }
    }
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (date1) => {
    return new Date(`${date1}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const [value, setValue] = useState(new Date());

  return (
    <>
      <Box className={"selectTime"}>
        <Box className={"d-flex"}>
          <Heading5Medium
            className={"heading5medium"}
            fontWeight={"700"}
            color={Colors.nightGray}
            text={"Check-In Time"}
          />
          <Small
            className={"small"}
            fontWeight={"500"}
            color={Colors.blue}
            textDecoration={"underline"}
            cursor={"pointer"}
            onClick={() => checkInClickOpen("checkin")}
            text={"Update Check-In Time"}
          />
        </Box>
        <Box className={"inputBoxParent"}>
          <Box className={"inputBox"}>
            <Small
              className={"small"}
              fontWeight={"500"}
              color={Colors.graye5}
              text={strings.ORIGINAL}
            />
            <input
              className={"customeInput"}
              value={new Date(props.workerCheckin) == "Invalid Date"
              ? props.workerCheckin
              : formatDate(props.workerCheckin)
              }
            />
          </Box>
          <img src={ArrowIcon} alt="name" className={"arrowIcon"} />
          <Box className={"inputBox"}>
            <Small
              className={"small"}
              fontWeight={"500"}
              color={Colors.graye5}
              text="ADJUSTED"
            />
            <input
              className={"customeInput"}
              value={
                // props.checkoutTime !== null
                //   ? `${new Date(`${props.checkoutTime}`).toLocaleTimeString(
                //     "en-US",
                //     {
                //       hour: "numeric",
                //       minute: "numeric",
                //       hour12: true,
                //     }
                //   )}`
                //   : 
                checkinTime
                  ? `${new Date(`${checkinTime}`).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}`
                  : props.businessCheckin ? props.businessCheckin : null
              }
            />
          </Box>
        </Box>
      </Box>
      <Box className={"selectTime"}>
        <Box className={"d-flex"}>
          <Heading5Medium
            className={"heading5medium"}
            fontWeight={"700"}
            color={Colors.nightGray}
            text={"Check-Out Time"}
          />
          <Small
            className={"small"}
            fontWeight={"500"}
            color={Colors.blue}
            textDecoration={"underline"}
            cursor={"pointer"}
            onClick={() => checkInClickOpen("checkout")}
            text={"Update Check-Out Time"}
          />
        </Box>
        <Box className={"inputBoxParent"}>
          <Box className={"inputBox"}>
            <Small
              className={"small"}
              fontWeight={"500"}
              color={Colors.graye5}
              text={strings.ORIGINAL}
            />
            <input
              className={"customeInput"}
              value={
                new Date(props.workerCheckout) == "Invalid Date"
              ? props.workerCheckout
              : formatDate(props.workerCheckout)
              }
            />
          </Box>
          <img src={ArrowIcon} alt="name" className={"arrowIcon"} />
          <Box className={"inputBox"}>
            <Small
              className={"small"}
              fontWeight={"500"}
              color={Colors.graye5}
              text="ADJUSTED"
            />
            <input
              className={"customeInput"}
              value={
                // props.checkoutTime !== null
                //   ? `${new Date(`${props.checkoutTime}`).toLocaleTimeString(
                //     "en-US",
                //     {
                //       hour: "numeric",
                //       minute: "numeric",
                //       hour12: true,
                //     }
                //   )}`
                //   : 
                checkoutTime
                  ? `${new Date(`${checkoutTime}`).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}`
                  : props.businessCheckout ? props.businessCheckout : null
              }
            />
          </Box>
        </Box>
        {timeError && (
          <Box className={"d-flex"}>
            <Heading6Medium
              className={"heading6medium"}
              fontWeight={"700"}
              color={Colors.error}
              text={"Check-Out Time can't be less then Check-In Time"}
            />
          </Box>
        )}
      </Box>

      <Dialog
        open={checkInopen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "0px" }}>
          <h2 className={"heading30"} style={{ margin: "0px 0px" }}>
            {selectedType === "checkin" ? "Check-in Time" : "Check-out Time"}
          </h2>
          <DialogContentText
            id="alert-dialog-description"
            style={{ margin: "10px 0px" }}
          >
            You can update worker{" "}
            {selectedType === "checkin" ? "check-in" : "check-out"} time.
          </DialogContentText>
          <div className="grid-item" style={{ margin: "10px 0px 20px 0px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                //views={["hours", "minutes"]}
                // ampmInClock={true}
                // ampm={true}
                //mask="__:__"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <PrimaryButton
            className="primarybutton"
            onClick={handleSave}
            text={"Save"}
            width={"150px"}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CheckInCollapse;
