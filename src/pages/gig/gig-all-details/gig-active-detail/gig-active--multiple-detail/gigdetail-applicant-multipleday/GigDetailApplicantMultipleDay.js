// Importing material ui
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import {
  Heading6Medium,
  Body,
  LabelWrapper,
  Small,
} from "../../../../../../Styles-Elements/Labels";
import * as Colors from "../../../../../../Styles-Elements/Colors";
import "../../../../GIGS.scss";
import Popup from "../../../../../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../../../../../Helpers/Enums";

// images
import Round1 from "../../../../../../image-assets/product/round-img3.png";
import Refress from "../../../../../../image-assets/structure/refress-icon.svg";
import CroseImg from "../../../../../../image-assets/structure/crose-icon-gray.svg";

import { ACTIONS } from "../../../../../../store/actions";

import axios, { imageBase, workerImageBase } from "../../../../../../api/axios";
import { Link } from "react-router-dom";
import { yallow } from "../../../../../../Styles-Elements/Colors";
import GigChat from "../../../../gig-layout-components/gig-chat/GigChat";

function GigDetailApplicantSingleDay(props) {
  const dispatch = useDispatch();
  let applicant = props.gig_details.applicant;
  // console.log('applicant', applicant);
  const userData = useSelector((state) => state.userData.data);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [isChatActive, setChatActive] = useState(false);
  const [selectedWorker, setSelectedWorker] = React.useState(null);
  const [revoke, setRevoke] = useState(false);

  let token = localStorage.getItem("token");
  let user_data = userData
    ? userData
    : JSON.parse(localStorage.getItem("user"));
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const toggleChatClass = (e, item) => {
    e.stopPropagation();
    if (item) {
      setSelectedWorker(item);
    }
    setChatActive(!isChatActive);
  };

  let user_id =
    user_data &&
    user_data.email.substring(0, user_data.email.indexOf("@")).replace(".", "");

  ///api/gig/invite_status

  const handleApplied = (item, type) => {
    const params = new URLSearchParams();
    params.append("gig_id", item.gig_id);
    params.append("worker_id", item.worker_id);
    params.append("business_id", item.business_id);
    params.append("invite_id", item.id);
    params.append("status", type);

    axios.post(`api/gig/invite_status`, params, config).then((res) => {
      if (res.data.ack === 1) {
        console.log('res__>', res);
        setConfirmationOpen(true);
        setConfirmationType({
          type: "success",
          message: res.data.msg,
        });
        dispatch({
          type: ACTIONS.UPDATE_GIG_DETAILS_APPLICANT,
          payload: {
            id: item.id,
            type: type,
          },
        });
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
        text={
          "This is a list of all the workers who have applied for your gig."
        }
      />
      {applicant &&
        applicant.length > 0 &&
        applicant.map((item) => {
          return (
            <Box key={item.id} className={"accourdiun-type-header"}>
              <Link
                to={{
                  pathname: "/view-profile-recommended",
                  state: { id: item.worker_id }
                }}
                style={{ textDecoration: "none" }}
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

              {item.status === "applied" || revoke ? (
                <Box className={"right-collapse"}>
                  <LabelWrapper>
                    <Small
                      className={"small"}
                      fontWeight={"700"}
                      cursor={"pointer"}
                      value="reject"
                      textDecoration={"underline"}
                      text={"Reject Applicant"}
                      color={Colors.error}
                      onClick={(e) => handleApplied(item, "reject")}
                    />
                    <Small
                      className={"small"}
                      fontWeight={"700"}
                      cursor={"pointer"}
                      value="accept"
                      textDecoration={"underline"}
                      text={"Accept Applicant"}
                      color={Colors.blue}
                      onClick={(e) => handleApplied(item, "accept")}
                    />
                  </LabelWrapper>
                </Box>
              ) : item.status === "accept" ? (
                <Box className={"right-collapse"}>
                  <Box className={"right-collapse"}>
                    <Small
                      className={"small"}
                      fontWeight={"700"}
                      textDecoration={"underline"}
                      onClick={(e) => toggleChatClass(e, item)}
                      text={"Chat"}
                      color={Colors.blue}
                      style={{ cursor: "pointer" }}
                    />
                    <LabelWrapper>
                      <span
                        className={"chips yallow"}
                        style={{ color: yallow }}
                      >
                        Awaiting Confirmation
                      </span>
                      <img
                        src={Refress}
                        className={"Refress-icon"}
                        alt=""
                        onClick={(e) => { setRevoke(true) }}
                        style={{ cursor: "pointer" }}
                      />
                    </LabelWrapper>
                  </Box>
                </Box>
              ) : item.status === "reject" ? (
                <Box className={"right-collapse"}>
                  <LabelWrapper>
                    <span className={"chips red"}>Rejected</span>
                  </LabelWrapper>
                </Box>
              ) : item.status === "decline" ? (
                <Box className={"right-collapse"}>
                  <LabelWrapper>
                    <span className={"chips red"}>Declined</span>
                  </LabelWrapper>
                </Box>
              ) : (
                item.status === "remove" && (
                  <Box className={"right-collapse"}>
                    <LabelWrapper>
                      <span className={"chips red"}>Removed</span>
                    </LabelWrapper>
                  </Box>
                )
              )}
            </Box>
          );
        })}

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

      {/* <Box className={"accourdiun-type-header"}>
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
            <span className={"chips yallow"}>Awaiting Confirmation</span>
            <img src={Refress} className={"Refress-icon"} alt="" />
          </LabelWrapper>
        </Box>
      </Box>

      <Box className={"accourdiun-type-header"}>
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
              cursor={"pointer"}
              textDecoration={"underline"}
              text={"Reject Applicant"}
              color={Colors.error}
            />
            <Small
              className={"small"}
              fontWeight={"700"}
              cursor={"pointer"}
              textDecoration={"underline"}
              text={"Accept Applicant"}
              color={Colors.blue}
            />
          </LabelWrapper>
        </Box>
      </Box>

      <Box className={"accourdiun-type-header"}>
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
            <span className={"chips red"}>Rejected</span>
          </LabelWrapper>
        </Box>
      </Box>

      <Box className={"accourdiun-type-header"}>
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
              cursor={"pointer"}
              textDecoration={"underline"}
              text={"Reject Applicant"}
              color={Colors.error}
            />
            <Small
              className={"small"}
              fontWeight={"700"}
              cursor={"pointer"}
              textDecoration={"underline"}
              text={"Accept Applicant"}
              color={Colors.blue}
            />
          </LabelWrapper>
        </Box>
      </Box> */}

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

export default GigDetailApplicantSingleDay;
