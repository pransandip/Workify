import * as React from "react";
import {
  Heading4Medium,
  Heading5Medium,
  Heading6Medium,
  Body,
} from "../../../Styles-Elements/Labels";
import * as Colors from "../../../Styles-Elements/Colors";
import {
  NeutralLightButton,
  SecondaryButton,
} from "../../../Styles-Elements/Buttons";
// Material UI for the snackbar
import Grid from "@mui/material/Grid";
import { Container, FormControlLabel, Checkbox, Box } from "@mui/material";
import "./../ServiceAgreement.scss";
const strings = require("../../../localisation_en.json");

function ServiceAgreementTab(props) {
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Heading4Medium
              text={strings.serviceAgreement}
              color={Colors.black}
              textAlign={"left"}
              fontWeight={700}
            />
            <div className="costomer-agreement-box">
              <Heading6Medium
                text={strings.customerAgreementTermsConditions}
                color={Colors.black}
                textAlign={"left"}
                fontWeight={700}
              />
              <Body
                text={
                  strings.theWorkBrieflyMobileApplicationIsAnInternetApplication
                }
                color={Colors.midGray}
                textAlign={"left"}
              />
              <Body
                text={
                  strings.PLEASEREADTHISAGREEMENTCAREFULLYTHISAGREEMENTCONTAINS
                }
                color={Colors.midGray}
                textAlign={"left"}
                fontWeight={"500"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={props.checked}
                    onClick={(checked) => props.onCheckBoxClick(checked)}
                  />
                }
                label="I confirm that I have read and agree to these terms."
              />
              <Box textAlign={"right"} mb={"0"}>
                {props.checked ? (
                  <SecondaryButton
                    className="neutrallightbutton"
                    text={strings.Continue}
                    width={"180px"}
                    height={"56px"}
                    margin={"20px 0 0px 0"}
                    onClick={() => props.onContinueCheck()}
                  />
                ) : (
                  <NeutralLightButton
                    className="neutrallightbutton"
                    text={strings.Continue}
                    width={"180px"}
                    height={"56px"}
                    margin={"20px 0 0px 0"}
                    onClick={() => props.onContinueCheck()}
                  />
                )}
              </Box>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            padding={"0px 0px 0px 25px;"}
          >
            <Box>
              <Heading5Medium
                text={strings.CustomerAgreement_simplified}
                color={Colors.black}
                margin={"45px 0 0px 0"}
              />
              <p className="p-double-color">
                We understand that you probably won’t read the entire Customer
                Agreement in it’s legal form so we have simplified it for you.{" "}
                <b>
                  By agreeing to these terms of use, you understand and
                  acknowledge the following:
                </b>
              </p>
              <ul>
                <li>
                  WorkBriefly is a platform that allows you to connect with
                  workers who act as independent contractors for a variety of
                  types of tasks.
                </li>
                <li>
                  You agree to adhere to local labour laws such as human rights
                  at the workplace and minimum wage laws.
                </li>
                <li>
                  You agree to provide a safe working environment and safe
                  working conditions for workers.
                </li>
                <li>
                  The Service Fee for engaging a WorkBriefly Worker as an
                  independent contractor totals 20% of the payment amount and is
                  generally for creating, hosting, administering, maintaining
                  and providing the application{" "}
                </li>
                <li>
                  WorkBriefly Inc. is not liable for any loss of profits or any
                  indirect, consequential, special or punitive damage arising
                  from use of the WorkBriefly platform.{" "}
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ServiceAgreementTab;
