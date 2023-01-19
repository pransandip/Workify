import { useState } from "react";
import { useSelector } from "react-redux";
import { Heading6Medium, Body } from "../../../Styles-Elements/Labels";
import * as Colors from "../../../Styles-Elements/Colors";
import Popup from "../../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../../Helpers/Enums";

// Importing Material imports
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import "./TabFaq.scss";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function TabFaq() {
  const userData = useSelector((state) => state.userData.data);

  let user_data = userData
    ? userData
    : JSON.parse(localStorage.getItem("user"));
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="page-background">
      <div className="hs-containpadding">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "98%", flexShrink: 0 }}>
              {" "}
              <Heading6Medium
                text={strings.howDoIFindAndBook}
                color={Colors.nightGray}
                margin={"0 0 0px 0"}
                fontWeight={"500"}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Body
              text={`${user_data.first_name} ${user_data.last_name}`}
              color={Colors.midGray}
              margin={"0 0 10px 0"}
              fontWeight={"500"}
            />
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 3 }}>
                <Body
                  text={strings.youApplyForAGig}
                  color={Colors.midGray}
                  margin={"0 0 0px 0"}
                  fontWeight={"500"}
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 3 }}>
                <Body
                  text={strings.businessInvitesYouForAGig}
                  color={Colors.midGray}
                  margin={"0 0 0px 0"}
                  fontWeight={"500"}
                />
              </ListItemButton>
            </List>
            <Body
              text={
                `${user_data.first_name} ${user_data.last_name}` +
                " " +
                strings.onceYouAreBookedForAGig
              }
              color={Colors.midGray}
              margin={"10px 0 0px 0"}
              fontWeight={"500"}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "98%", flexShrink: 0 }}>
              <Heading6Medium
                text={strings.IveBookedAWorker}
                color={Colors.nightGray}
                margin={"0 0 0px 0"}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Body
              text={`${user_data.first_name} ${user_data.last_name}`}
              color={Colors.midGray}
              margin={"0 0 10px 0"}
              fontWeight={"500"}
            />
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 3 }}>
                <Body
                  text={strings.youApplyForAGig}
                  color={Colors.midGray}
                  margin={"0 0 0px 0"}
                  fontWeight={"500"}
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 3 }}>
                <Body
                  text={strings.businessInvitesYouForAGig}
                  color={Colors.midGray}
                  margin={"0 0 0px 0"}
                  fontWeight={"500"}
                />
              </ListItemButton>
            </List>
            <Body
              text={
                `${user_data.first_name} ${user_data.last_name}` +
                " " +
                strings.onceYouAreBookedForAGig
              }
              color={Colors.midGray}
              margin={"10px 0 0px 0"}
              fontWeight={"500"}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "98%", flexShrink: 0 }}>
              <Heading6Medium
                text={strings.whatDoIDoWhenA}
                color={Colors.nightGray}
                margin={"0 0 0px 0"}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Body
              text={`${user_data.first_name} ${user_data.last_name}`}
              color={Colors.midGray}
              margin={"0 0 10px 0"}
              fontWeight={"500"}
            />
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 3 }}>
                <Body
                  text={strings.youApplyForAGig}
                  color={Colors.midGray}
                  margin={"0 0 0px 0"}
                  fontWeight={"500"}
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 3 }}>
                <Body
                  text={strings.businessInvitesYouForAGig}
                  color={Colors.midGray}
                  margin={"0 0 0px 0"}
                  fontWeight={"500"}
                />
              </ListItemButton>
            </List>
            <Body
              text={
                `${user_data.first_name} ${user_data.last_name}` +
                " " +
                strings.onceYouAreBookedForAGig
              }
              color={Colors.midGray}
              margin={"10px 0 0px 0"}
              fontWeight={"500"}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "98%", flexShrink: 0 }}>
              <Heading6Medium
                text={strings.whatHappensIfINeed}
                color={Colors.nightGray}
                margin={"0 0 0px 0"}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Body
              text={`${user_data.first_name} ${user_data.last_name}`}
              color={Colors.midGray}
              margin={"0 0 10px 0"}
              fontWeight={"500"}
            />
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 3 }}>
                <Body
                  text={strings.youApplyForAGig}
                  color={Colors.midGray}
                  margin={"0 0 0px 0"}
                  fontWeight={"500"}
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 3 }}>
                <Body
                  text={strings.businessInvitesYouForAGig}
                  color={Colors.midGray}
                  margin={"0 0 0px 0"}
                  fontWeight={"500"}
                />
              </ListItemButton>
            </List>
            <Body
              text={
                `${user_data.first_name} ${user_data.last_name}` +
                " " +
                strings.onceYouAreBookedForAGig
              }
              color={Colors.midGray}
              margin={"10px 0 0px 0"}
              fontWeight={"500"}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
          >
            <Typography sx={{ width: "98%", flexShrink: 0 }}>
              {" "}
              <Heading6Medium
                text={strings.whatJobsDoesWorkBriefly}
                color={Colors.nightGray}
                margin={"0 0 0px 0"}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
          >
            <Typography sx={{ width: "98%", flexShrink: 0 }}>
              <Heading6Medium
                text={strings.whereIsWorkBriefly}
                color={Colors.nightGray}
                margin={"0 0 0px 0"}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7bh-content"
            id="panel7bh-header"
          >
            <Typography sx={{ width: "98%", flexShrink: 0 }}>
              <Heading6Medium
                text={strings.howDoesWorkBrieflyWork}
                color={Colors.nightGray}
                margin={"0 0 0px 0"}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8bh-content"
            id="panel8bh-header"
          >
            <Typography sx={{ width: "98%", flexShrink: 0 }}>
              <Heading6Medium
                text={strings.areWorkersWorkBriefly}
                color={Colors.nightGray}
                margin={"0 0 0px 0"}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Popup
        popupIsOpen={popupOpen}
        style={POPUP_TYPE.RESET_PASSWORD}
        closePopup={() => setPopupOpen(false)}
      />
    </div>
  );
}

export default TabFaq;
