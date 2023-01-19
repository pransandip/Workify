// Importing material ui
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { debounce, throttle } from "lodash";
import Box from "@mui/material/Box";
import {
  Heading3Bold,
  Heading2Bold,
  Body,
  Heading6Medium,
} from "../../../../Styles-Elements/Labels";
import * as Colors from "../../../../Styles-Elements/Colors";

import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../../../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../../../Styles-Elements/Heading/Header";

// Importing images
import HeaderImage from "../../../../image-assets/product/h-product-logo1.png";

import { ACTIONS } from "../../../../store/actions";

import axios, { imageBase } from "../../../../api/axios";

import "../../GIGS.scss";

// Importing localised strings
const strings = require("../../../../localisation_en.json");

function GigCompletedList(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const allCompleteData = useSelector(
    (state) => state.singleDayGigData.allCompleteData
  );

  //console.log(allCompleteData);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const getAllCompletedData = () => {
    axios
      .get(`/api/gig/getall?status=${"complete"}&page=${1}`, config)
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_ALL_COMPLETE_GIG,
          payload: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCompletedData();
  }, []);

  const changeRoute = useCallback(
    debounce((path) => {
      history.push(path);
    }, 600),
    []
  );

  const getSelectedData = (id, type, path) => {
    axios
      .get(`/api/gig/specific/${parseInt(id)}`, config)
      .then((res) => {
        if (res.data.ack === 1) {
          if (type === "details") {
            dispatch({
              type: ACTIONS.GET_GIG_DETAILS,
              payload: {
                ...res.data.data[0],
              },
            });
          }
          dispatch({
            type: ACTIONS.UPDATE_GIG_DATA,
            payload: {
              ...res.data.data[0],
              gig_type: "Edit",
            },
          });

          changeRoute(path);
          //setEditLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const routeChangeGigCompletedDetails = (e, item) => {
    e.preventDefault();
    let path = `/gig-completed-detail`;
    localStorage.setItem("selcted_gig", item.id);
    getSelectedData(item.id, "details", path);
    //history.push(path);
  };
  const routeChangeGigCancelledDetails = (e, item) => {
    e.preventDefault();
    let path = `/gig-cancelled-detail`;
    localStorage.setItem("selcted_gig", item.id);
    getSelectedData(item.id, "details", path);
    history.push(path);
  };

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className="gigcompleted-main-holder">
          <Heading2Bold
            text={strings.gigs}
            color={Colors.black}
            padding={"0 0 20px 0"}
          />
          <Body
            text={`These are the Completed Gigs you have created that are upcoming`}
            color={Colors.midGray}
            padding={"0 0 16px 0"}
          />
          {allCompleteData.length > 0 &&
            allCompleteData.map((items) => {
              return (
                <>
                  <Heading6Medium
                    text={`${new Date(items.startdate).toDateString()}  ${
                      items.enddate
                        ? `-` + new Date(items.enddate).toDateString()
                        : ""
                    }`}
                    color={Colors.nightGray}
                    padding={"0 0 16px 0"}
                  />
                  <div
                    className={"topHeader"}
                    onClick={(e) =>
                      items.status === "cancel"
                        ? routeChangeGigCancelledDetails(e, items)
                        : routeChangeGigCompletedDetails(e, items)
                    }
                  >
                    <img
                      src={
                        `${imageBase}${items.cover_image}`
                          ? `${imageBase}${items.cover_image}`
                          : HeaderImage
                      }
                      alt="name"
                      style={{
                        width: "100px",
                        height: "120px",
                        padding: "8px 8px 8px",
                      }}
                    />
                    <div className={"relative"}>
                      <p
                        style={{ display: "flex", alignItems: "center" }}
                        className={"status-p"}
                      >
                        <span
                          className={"status"}
                          style={{ background: "var(--success)" }}
                        ></span>{" "}
                        2/3{" "}
                        <Body
                          color={Colors.midGray}
                          text={"(0 Applicant)"}
                          padding={"0 0 0 8px"}
                        />
                      </p>
                      <Box
                        className="head-edit-copy-box"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Heading3Bold
                          text={items.position}
                          color={Colors.black}
                          className={"heading3bold"}
                        />
                      </Box>
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
                            text={items.business_name}
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
                            text={`${
                              new Date(items.starttime).toString() ===
                              "Invalid Date"
                                ? `${items.starttime + ` - ` + items.endtime}`
                                : new Date(
                                    `${items.starttime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }) +
                                  ` - ` +
                                  new Date(
                                    `${items.endtime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })
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
                            text={`$${items.total_amount}.00 ($${items.hourly_pay}/hr)`}
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
                            text={items.pay_frequency}
                          />
                        </Box>
                      </div>
                    </div>
                    {items.status === "cancel" && (
                      <Body
                        color={Colors.error}
                        className={"status-text"}
                        text={"Cancelled"}
                      />
                    )}
                    {items.status === "completed" && (
                      <Body
                        color={Colors.success}
                        className={"status-text"}
                        text={"Completed"}
                      />
                    )}
                  </div>
                </>
              );
            })}

          {/* <div className={"topHeader"} onClick={routeChangeGigCancelledDetails}>
            <img src={HeaderImage} alt="name" className={"topHeaderImg"} />
            <div className={"relative"}>
              <p
                style={{ display: "flex", alignItems: "center" }}
                className={"status-p"}
              >
                <span
                  className={"status"}
                  style={{ background: "var(--warning)" }}
                ></span>{" "}
                2/3{" "}
                <Body
                  color={Colors.midGray}
                  text={"(0 Applicant)"}
                  padding={"0 0 0 8px"}
                />
              </p>
              <Box
                className="head-edit-copy-box"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Heading3Bold
                  text={strings.WarehouseMover}
                  color={Colors.black}
                  className={"heading3bold"}
                />
              </Box>
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
                    text={"JJ Bean"}
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
                    text={"11:00 AM - 5:00 PM"}
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
                    text={"$56.00 ($14/hr)"}
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
                    text={"Daily"}
                  />
                </Box>
              </div>
            </div>
            <Body
              color={Colors.error}
              className={"status-text"}
              text={"Cancelled"}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default GigCompletedList;
