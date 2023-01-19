import React from "react";
import { useState, useEffect } from "react";
import * as Colors from "../../../Styles-Elements/Colors";
import { useHistory } from "react-router-dom";
import {
  Body,
  Heading3Bold,
  Heading4Medium,
  Heading6Medium,
  Heading5Medium,
  Small,
} from "../../../Styles-Elements/Labels";
import {
  PrimaryButton,
  TransparentButton,
} from "../../../Styles-Elements/Buttons";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import GoogleApiWrapper from "../../create-gig/cgig-location/LocationMarker";
import { useDispatch, useSelector } from "react-redux";

import HeaderImage from "../../../image-assets/product/h-product-logo1.png";
import MapImg from "../../../image-assets/product/mapImg.png";
import imageUploadIcon from "../../../image-assets/structure/image-upload.svg";
import SuccessIcon from "../../../image-assets/structure/success-alert.svg";

import CroseImg from "../../../image-assets/structure/crose-icon-gray.svg";
import axios, { imageBase } from "../../../api/axios";

import "./PostPreview.scss";
import { htmlToText } from "html-to-text";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function PostPreview(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  let gig_data = useSelector((state) => state.gigData);
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let user_obj = JSON.parse(localStorage.getItem("user"));

  const getLicenseData = () => {
    axios
      .get("/api/certificate_and_licence", config)
      .then((res) => {
        setLicenseData(res.data.data);
      })
      .catch((error) => console.log(error));
  };
  // State define

  const [logoutOpen, setLogout] = React.useState(false);
  const [previewModal, setPreviewModal] = useState(
    gig_data.previewModal.imageData
  );
  const [licenseData, setLicenseData] = React.useState([]);
  const [position, setPosition] = useState(gig_data.position);
  const [jobDescription, setjobDescription] = useState(gig_data.description);
  const [attire, setAttire] = useState(gig_data.attire);
  const [things_to_bring, setThings_to_bring] = useState(
    gig_data.things_to_bring
  );
  const [additionalInfo, setAdditionalInfo] = useState(
    gig_data.additional_info
  );
  const [certificate_and_licence, setCertificate_and_licence] = useState(
    gig_data.certificate_and_licence_data
  );
  const [selectedValue, setSelectedValue] = React.useState(
    gig_data.location_data
  );
  const [transit, setTransit] = useState(gig_data.transit.split(","));

  useEffect(() => {
    getLicenseData();
  }, []);

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

  const logoutClickOpen = () => {
    setLogout(true);
  };
  const handleClose = () => {
    setLogout(false);
  };
  const goNext = () => {
    props.handleNext();
  };
  const goBack = () => {
    let path = `/create-gig`;
    history.push(path, { from: "Post preview page" });
  };

  const showMapInClicked = () => {
    window.open(
      `https://maps.google.com?q=${selectedValue.latitude} ${selectedValue.longitude}`
    );
  };

  let licenses =
    licenseData.length > 0 && certificate_and_licence.length > 0
      ? licenseData.filter((item) =>
        certificate_and_licence.find((exp) =>
          exp.certificate_and_licence_id
            ? exp.certificate_and_licence_id.toString() === item.id.toString()
            : exp.id.toString() === item.id.toString()
        )
      )
      : [];

  let selectedLicense =
    licenses.length > 0
      ? licenses.map((items) => {
        // certificate_and_licence.map((item) => {
        //   if (
        //     items.id === item.certificate_and_licence_id ||
        //     items.id === item.id
        //   ) {
        //     return {
        //       ...items,
        //       required: item.required ? 1 : 0,
        //     };
        //   }
        // });
        let objArr = [];
        certificate_and_licence.forEach((item) => {
          if (
            items.id === item.certificate_and_licence_id ||
            items.id === item.id
          ) {
            let obj = {
              ...items,
              required: item.required ? 1 : 0,
            };

            objArr = obj;
          }
        });
        return objArr;
      })
      : [];

  console.log(certificate_and_licence, selectedLicense);

  return (
    <>
      <Heading4Medium
        fontWeight={700}
        text={strings.PostPreview}
        className={"heading4medium"}
        color={Colors.black}
        margin={"0 0 20px 0"}
      />
      <Body
        fontWeight={700}
        text={`${new Date(gig_data.startdate).toDateString()} - ${new Date(
          gig_data.enddate
        ).toDateString()} `}
        color={Colors.black}
      />
      <div className={"width1100"}>
        <Box className={"whiteBoxShadow"}>
          <div className={"topHeader"}>
            <img
              src={
                gig_data.previewModal.imageData
                  ? gig_data.previewModal.imageData
                  : gig_data.cover_image
                    ? `${imageBase}${gig_data.cover_image}`
                    : imageUploadIcon
              }
              style={{
                width: "100px",
                height: "120px",
                padding: "8px 8px",
                objectFit: "cover",
              }}
              alt="name"
              className={"topHeaderImg"}
            />
            <div className={"relative"}>
              <p className={"status-p"}>
                <span
                  className={"status"}
                  style={{ background: "var(--error)" }}
                ></span>{" "}
                0/3
              </p>
              <Heading3Bold
                text={htmlToText(position)}
                color={Colors.black}
                className={"heading3bold"}
              />
              <div className={"topHeaderRow"}>
                <Box className={"infoBox"}>
                  <Body
                    color={Colors.lightGray}
                    className={"body"}
                    text={strings.Company}
                  />
                  <Heading6Medium
                    fontWeight={700}
                    className={"heading6medium"}
                    color={Colors.nightGray}
                    text={`${user_obj.business_name}`}
                  />
                </Box>
                <Box className={"infoBox"}>
                  <Body
                    color={Colors.lightGray}
                    className={"body"}
                    text={strings.Time}
                  />

                  <Heading6Medium
                    fontWeight={700}
                    className={"heading6medium"}
                    color={Colors.nightGray}
                    text={`${new Date(`${gig_data.starttime}`) == "Invalid Date"
                      ? gig_data.starttime + " - " + gig_data.endtime
                      : new Date(`${gig_data.starttime}`).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      ) +
                      ` - ` +
                      new Date(`${gig_data.endtime}`).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )
                      }`}
                  />
                </Box>
                <Box className={"infoBox"}>
                  <Body
                    color={Colors.lightGray}
                    className={"body"}
                    text={"Pay"}
                  />
                  <Heading6Medium
                    fontWeight={700}
                    className={"heading6medium"}
                    color={Colors.nightGray}
                    text={`$ ${parseFloat(
                      gig_data.total_amount
                    )} ($ ${parseFloat(gig_data.hourly_pay)}/hr)`}
                  />
                </Box>
                <Box className={"infoBox"}>
                  <Body
                    color={Colors.lightGray}
                    className={"body"}
                    text={"Pay Frequency"}
                  />
                  <Heading6Medium
                    fontWeight={700}
                    className={"heading6medium"}
                    color={Colors.nightGray}
                    text={gig_data.pay_frequency}
                  />
                </Box>
                <Box className={"infoBox"}>
                  <Body
                    color={Colors.lightGray}
                    className={"body"}
                    text={"Unpaid Break"}
                  />
                  <Heading6Medium
                    fontWeight={700}
                    className={"heading6medium"}
                    color={Colors.nightGray}
                    text={`${gig_data.unpaid_break} minutes`}
                  />
                </Box>
                <Box className={"infoBox"}>
                  <Body
                    color={Colors.lightGray}
                    className={"body"}
                    text={"Paid Break"}
                  />
                  <Heading6Medium
                    fontWeight={700}
                    className={"heading6medium"}
                    color={Colors.nightGray}
                    text={`${gig_data.paid_break} minutes`}
                  />
                </Box>
              </div>
            </div>
          </div>
          <Box className={"padding20"}>
            <div className={"left-side"}>
              <Heading5Medium
                fontWeight={700}
                text={"Description"}
                className={"heading5medium"}
                color={Colors.black}
                margin={"0 0 20px 0"}
              />

              {/* <Body
                className={"body mb-20"}
                color={Colors.midGray}
                text={strings.Youwillberesponsiblefor}
              /> */}
              {/* <Body
                className={"body"}
                color={Colors.midGray}
                text={strings.servingcustomers}
              />
              <Body
                className={"body"}
                color={Colors.midGray}
                text={strings.operatingtheespressomachine}
              />
              <Body
                className={"body"}
                color={Colors.midGray}
                text={strings.operatingthecashregisterwhenrequired}
              /> */}
              <div
                className={"body"}
                style={{ padding: "0 0 4px 0", marginLeft: "8px" }}
                text={htmlToText(jobDescription)}
                dangerouslySetInnerHTML={{
                  __html: jobDescription,
                }}
              />

              {attire !== "" && (
                <>
                  <Heading5Medium
                    fontWeight={700}
                    text={strings.Instructions}
                    className={"heading5medium"}
                    color={Colors.black}
                    margin={"20px 0 10px 0"}
                  />
                  <Body
                    className={"body ml-10"}
                    fontWeight={"500"}
                    color={Colors.black}
                    text={strings.Attire}
                  />

                  {/* <Body
                className={"body mb-20"}
                color={Colors.midGray}
                text={htmlToText(attire)}
                style={{ "white-space": "pre-line" }}
              /> */}
                  <div
                    className={"body mb-20 ml-20"}
                    dangerouslySetInnerHTML={{ __html: attire }}
                  />
                </>
              )}
              {/* <Body
                className={"body mb-20"}
                color={Colors.midGray}
                text={strings.Black_darknon_slipshoes}
              /> */}

              {things_to_bring !== "" && (
                <>
                  <Body
                    className={"body ml-10"}
                    fontWeight={"500"}
                    color={Colors.black}
                    text={strings.ThingstoBring}
                  />
                  <div
                    className={"body mb-20 ml-20"}
                    dangerouslySetInnerHTML={{ __html: things_to_bring }}
                  />

                  <Body
                    className={"body ml-10"}
                    fontWeight={"500"}
                    color={Colors.black}
                    text={strings.AdditionalInformation}
                  />
                  <div
                    className={"body mb-20 ml-20"}
                    dangerouslySetInnerHTML={{ __html: additionalInfo }}
                  />
                </>
              )}

              {/* <Body
                className={"body"}
                color={Colors.midGray}
                text={strings.Youwillbeprovidedameal}
              />
              <Body
                className={"body mb-20"}
                color={Colors.midGray}
                text={strings.Tipsnotincluded}
              /> */}

              <Heading5Medium
                fontWeight={700}
                text={strings.Certifications_Licenses}
                className={"heading5medium"}
                color={Colors.black}
                margin={"20px 0 10px 0"}
              />

              {selectedLicense.length > 0 &&
                selectedLicense.map((items) => {
                  if (items.required === 0 || items.required === false) {
                    return (
                      <ul className={"ul"}>
                        <li>
                          {items.name} <span></span>
                        </li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul className={"ul"}>
                        <li>
                          {items.name} <span>(required)</span>
                        </li>
                      </ul>
                    );
                  }
                })}
            </div>
            <div className={"right-side"}>
              {/* <img src={MapImg} alt="name" className={"map-img"} /> */}
              <div style={{ height: "210px", width: "250px" }}>
                <GoogleApiWrapper
                  selectedAddress={selectedValue}
                  selectedMapStyles={selectedValue2}
                  selectedContainerStyle={selectedValue3}
                />
              </div>
              <Body
                className={"body centerText"}
                color={Colors.black}
                text={
                  selectedValue &&
                  selectedValue.address1 &&
                  selectedValue.location_name &&
                  `${selectedValue.location_name
                  } , ${selectedValue.address1.substring(0, 70)}`
                }
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
                {transit.map((item) => {
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
                </li>
                <li>
                  <img src={SuccessIcon} alt="" className="successIcon" />
                  {"There are transit options available nearby"}
                </li> */}
              </ul>

              {/* <Body
                className={"body"}
                color={Colors.black}
                fontWeight={"500"}
                text={`The gig is available on ${
                  gig_data.day_type
                } days. You must apply on ${
                  gig_data.day_type === "single" ? "that" : "multiple"
                } days.`}
              />
              <div className={"divider"}></div>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                marginBottom={"10px"}
              >
                <Body
                  className={"body"}
                  color={Colors.midGray}
                  text={`${new Date(gig_data.startdate).toDateString()} - ${
                    new Date(`${gig_data.starttime}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    ) +
                    ` - ` +
                    new Date(`${gig_data.endtime}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )
                  }`}
                />
                <Body
                  className={"body"}
                  color={Colors.midGray}
                  text={`$  ${parseFloat(gig_data.total_amount)} `}
                />
              </Box> */}

              {/* <Small
                color={Colors.blue}
                fontWeight={"500"}
                textDecoration={"underline"}
                cursor={"pointer"}
                className={"small"}
                onClick={logoutClickOpen}
                text={strings.ViewAll}
              /> */}
            </div>
          </Box>
        </Box>
        <Grid
          justifyContent={"flex-end"}
          style={{ display: "flex", paddingBottom: "40px" }}
        >
          <TransparentButton
            className="transparentbutton"
            text={strings.Back}
            width={"90px"}
            onClick={goBack}
          />
          <PrimaryButton
            className="neutrallightbutton"
            text={strings.Continue}
            width={"113px"}
            onClick={goNext}
          />
        </Grid>
      </div>

      <Dialog
        open={logoutOpen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {strings.MultipleDays}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"9px 0px 9px 0px"}
            style={{ borderBottom: "1px solid var(--gray97)" }}
          >
            <Body
              className={"body"}
              color={Colors.midGray}
              text={"Tue, Mar 20, 2022 - 1:00PM - 5:00 PM"}
            />
            <Body className={"body"} color={Colors.midGray} text={"$56"} />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"9px 0px 9px 0px"}
            style={{ borderBottom: "1px solid var(--gray97)" }}
          >
            <Body
              className={"body"}
              color={Colors.midGray}
              text={"Wed, Mar 21, 2022 - 1:00PM - 5:00 PM"}
            />
            <Body className={"body"} color={Colors.midGray} text={"$56"} />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"9px 0px 9px 0px"}
            style={{ borderBottom: "1px solid var(--gray97)" }}
          >
            <Body
              className={"body"}
              color={Colors.midGray}
              text={"Thu, Mar 22, 2022 - 1:00PM - 5:00 PM"}
            />
            <Body className={"body"} color={Colors.midGray} text={"$56"} />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"9px 0px 9px 0px"}
            style={{ borderBottom: "1px solid var(--gray97)" }}
          >
            <Body
              className={"body"}
              color={Colors.midGray}
              text={"Fri, Mar 23, 2022 - 1:00PM - 5:00 PM"}
            />
            <Body className={"body"} color={Colors.midGray} text={"$56"} />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"9px 0px 9px 0px"}
            style={{ borderBottom: "1px solid var(--gray97)" }}
          >
            <Body
              className={"body"}
              color={Colors.midGray}
              text={"Sat, Mar 24, 2022 - 1:00PM - 5:00 PM"}
            />
            <Body className={"body"} color={Colors.midGray} text={"$56"} />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={"9px 0px 9px 0px"}
            style={{ borderBottom: "1px solid var(--gray97)" }}
          >
            <Body
              className={"body"}
              color={Colors.midGray}
              text={"Tue, Mar 20, 2022 - 1:00PM - 5:00 PM"}
            />
            <Body className={"body"} color={Colors.midGray} text={"$56"} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostPreview;
