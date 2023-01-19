import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Colors from "../../../Styles-Elements/Colors";
import {
  Body,
  Heading4Medium,
  Heading5Medium,
} from "../../../Styles-Elements/Labels";

import Popup from "../../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../../Helpers/Enums";
import {
  PrimaryButton,
  TransparentButton,
  NeutralLightButton,
} from "../../../Styles-Elements/Buttons";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios, { imageBase } from "../../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../store/actions/index";

import "./CostSummary.scss";
import { isObject } from "lodash";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function CostSummary(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [disable, setDisable] = useState(false);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let gig_data = useSelector((state) => state.gigData);
  console.log(`gig_data-cost-summary->`, gig_data)

  const createNewGig = (requestBody) => {
    axios
      .post("/api/gig/create", requestBody, config)
      .then((res) => {
        setLoading(false);
        if (res.data.ack === 1) {
          let path = `/gig`;
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: res.data.msg,
          });

          setTimeout(() => {
            history.push(path);
            dispatch({
              type: ACTIONS.CLEAR_GIG_DATA,
            });
          }, 1000);
        } else {
          let message = "";
          Array.isArray(res.data.msg)
            ? res.data.msg.length > 0 &&
            res.data.msg.forEach((item) => {
              message = message + " " + Object.values(item)[0];
            })
            : (message = res.data.msg);
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: message,
          });
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const updateGig = (requestBody) => {
    axios
      .put(`/api/gig/edit/${gig_data.id}`, requestBody, config)
      .then((res) => {
        setLoading(false);
        if (res.data.ack === 1) {
          let path = `/gig`;
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: res.data.msg,
          });

          setTimeout(() => {
            history.push(path);
            dispatch({
              type: ACTIONS.CLEAR_GIG_DATA,
            });
          }, 1000);
        } else {
          let message = "";
          Array.isArray(res.data.msg)
            ? res.data.msg.length > 0 &&
            res.data.msg.forEach((item) => {
              message = message + " " + Object.values(item)[0];
            })
            : (message = res.data.msg);
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: message,
          });
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  /*? ---- code added---- ?*/
  async function createFile() {
    let response = await fetch(`http://78.46.210.25:4243${gig_data.cover_image}`, config);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    let file = new File([data], "test.jpg", metadata);
    // ... do something with the file or return it
    // console.log(`file`, file)
    return file
  }

  const getFormData = (object) => {
    let newObj = {
      ...object,
    };
    delete newObj["previewModal"];
    delete newObj["location_data"];
    delete newObj["certificate_and_licence_data"];
    delete newObj["gig_type"];

    if (gig_data.day_type === "single") {
      delete newObj["enddate"];
    }

    const formData = new FormData();
    Object.keys(newObj).forEach((key) => formData.append(key, object[key]));
    return formData;
  };

  /*? ---- code added---- ?*/
  let newImgFile;
  const routeChangeRecommendedWorkersy = async () => {
    if (isObject(gig_data.cover_image) === false) {
      newImgFile = await createFile();
    }
    let requestBody = getFormData({ ...gig_data, cover_image: newImgFile ?? gig_data.cover_image });
    setLoading(true);
    setDisable(true);
    if (gig_data.gig_type === "Create") {
      createNewGig(requestBody);
    } else {
      console.log("here");
      updateGig(requestBody);
    }
  };

  const goBack = () => {
    props.handleBack();
  };
  return (
    <>
      <Box className={"width590"}>
        <Heading4Medium
          fontWeight={700}
          text={strings.CostSummary}
          className={"heading4medium"}
          color={Colors.black}
          margin={"0 0  8px 0"}
        />
        <Body
          text={strings.Authorisationofasecurityhold}
          color={Colors.midGray}
          className={"body"}
        />

        <Box className={"whiteBorderBox"}>
          <Heading5Medium
            fontWeight={700}
            className={"heading5medium"}
            color={Colors.nightGray}
            margin={"0 0  20px 0"}
            text={strings.CostBreakdown}
          />
          <div className={"frequency-flex-right"}>
            <Body
              text={strings.Noofworkers}
              className={"leftValue body"}
              color={Colors.nightGray}
            />
            <div className={"rightValue"}>
              <span className={"borderSpan"}>
                <Body
                  className={"body"}
                  text={gig_data.vacancies}
                  fontWeight={500}
                  color={Colors.nightGray}
                />
              </span>
            </div>
          </div>
          <div className={"frequency-flex-right"}>
            <Body
              text={strings.Hourlypay}
              className={"leftValue body"}
              color={Colors.nightGray}
            />
            <div className={"rightValue"}>
              <span className={"borderSpan"}>
                <Body
                  className={"body"}
                  text={`$ ${parseFloat(gig_data.hourly_pay).toFixed(2)}`}
                  fontWeight={500}
                  color={Colors.nightGray}
                />
              </span>
            </div>
          </div>
          <div className={"frequency-flex-right"}>
            <Body
              text={strings.Totalhoursperworker}
              className={"leftValue body"}
              color={Colors.nightGray}
            />
            <div className={"rightValue"}>
              <span className={"borderSpan"}>
                <Body
                  className={"body"}
                  text={parseFloat(gig_data.total_hours_per_worker).toFixed(2)}
                  fontWeight={500}
                  color={Colors.nightGray}
                />
              </span>
            </div>
          </div>
          <div className={"frequency-flex-right"}>
            <Body
              text={strings.Subtotal}
              className={"leftValue body"}
              color={Colors.nightGray}
            />
            <div className={"rightValue"}>
              <span className={"normalSpan"}>
                <Body
                  className={"body"}
                  text={`$ ${parseFloat(gig_data.subtotal).toFixed(2)}`}
                  fontWeight={500}
                  color={Colors.nightGray}
                />
              </span>
            </div>
          </div>
          <div
            className={"divider"}
            style={{ margin: "7px 0px 7px 0px" }}
          ></div>
          <div className={"frequency-flex-right"}>
            <Body
              text={"Fee (20%)"}
              className={"leftValue body"}
              color={Colors.nightGray}
            />
            <div className={"rightValue"}>
              <span className={"normalSpan"}>
                <Body
                  className={"body"}
                  text={`$ ${parseFloat(gig_data.admin_fee_amount).toFixed(2)}`}
                  fontWeight={500}
                  color={Colors.nightGray}
                />
              </span>
            </div>
          </div>
          <div className={"frequency-flex-right"}>
            <Body
              text={"Tax (5%)"}
              className={"leftValue body"}
              color={Colors.nightGray}
            />
            <div className={"rightValue"}>
              <span className={"borderSpan"}>
                <Body
                  className={"body"}
                  text={`$ ${parseFloat(gig_data.tax_amount).toFixed(2)}`}
                  fontWeight={500}
                  color={Colors.nightGray}
                />
              </span>
            </div>
          </div>
          <div className={"frequency-flex-right"}>
            <Body
              text={"Total Amount"}
              className={"leftValue body"}
              color={Colors.nightGray}
            />
            <div className={"rightValue"}>
              <Heading4Medium
                className={"heading4medium"}
                text={`$ ${parseFloat(gig_data.total_amount).toFixed(2)}`}
                color={Colors.nightGray}
              />
            </div>
          </div>
          <Grid
            justifyContent={"flex-end"}
            style={{
              display: "flex",
              paddingTop: "20px",
              alignItems: "center",
            }}
          >
            <TransparentButton
              className="transparentbutton"
              text={strings.Back}
              width={"90px"}
              onClick={goBack}
              disabled={loading}
            />
            {!loading ? (
              <PrimaryButton
                className="primarybutton"
                onClick={routeChangeRecommendedWorkersy}
                text={strings.Continue}
                disabled={disable}
                width={"140px"}
                height={"56px"}
                margin={"12px 0 16px 0"}
              />
            ) : (
              <NeutralLightButton
                loading={loading}
                className={loading ? "lightbuttonLoader" : "primarybutton"}
                text={strings.Continue}
                width={"140px"}
                height={"56px"}
                margin={"12px 0 16px 0"}
              />
            )}
          </Grid>
        </Box>
        {confirmationOpen && (
          <Popup
            popupIsOpen={confirmationOpen}
            style={POPUP_TYPE.CONFIRMATION}
            type={confirmationType}
            closePopup={() => setConfirmationOpen(false)}
          />
        )}
      </Box>
    </>
  );
}

export default CostSummary;
