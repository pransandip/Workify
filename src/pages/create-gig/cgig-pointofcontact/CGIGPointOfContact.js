import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Body,
  Heading4Medium,
  InputLabel,
  Error,
} from "../../../Styles-Elements/Labels";
import { Textfield } from "../../../Styles-Elements/Inputs";
import {
  PrimaryButton,
  TransparentButton,
} from "../../../Styles-Elements/Buttons";
import * as Colors from "../../../Styles-Elements/Colors";

// import ui material
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { FormControlLabel } from "@material-ui/core/";
import "./CGIGPointOfContact.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../../store/actions/index";

//refreshToken
import { refreshToken } from "../../../Helpers/refreshSession";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function CGIGPointOfContact(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  let gig_data = useSelector((state) => state.gigData);

  // State define
  const [allfields, setAllFields] = useState(null);
  const [type, setType] = useState(gig_data.type);
  const [ownerName, setOwnerName] = useState(gig_data.name);
  const [ownerNameError, setOwnerNameError] = useState(false);
  const [manager, setManager] = useState(gig_data.title);
  const [managerError, setManagerError] = useState(false);
  const [contNum, setContNum] = useState(gig_data.contact_number);
  const [contNumError, setContNumError] = useState(false);

  // Importing data from store
  const user = useSelector((state) => state.userData.data);

  useEffect(() => {
    if (user !== undefined) {
      setAllFields(user);
    } else {
      refreshToken();
    }
  }, [user]);

  const yes = () => {
    setType("yes");
    setOwnerName(
      user.owner_name !== null && user.owner_name !== ""
        ? user.owner_name
        : `${user.first_name} ${user.last_name}`
    );
    setContNum(user.mobile);
    setManager(user.title);
    setOwnerNameError(false);
    setContNumError(false);
    setManagerError(false);
  };
  const no = () => {
    setType("no");
    setOwnerName("");
    setManager("");
    setContNum("");
    setOwnerNameError(true);
    setManagerError(true);
    setContNumError(true);
  };

  const routeChangeGigSummary = () => {
    if (ownerName !== "" && manager !== "" && contNum !== "") {
      let payloadObj = {
        type: type,
        name: ownerName,
        title: manager,
        contact_number: contNum,
      };
      dispatch({
        type: ACTIONS.UPDATE_GIG_DATA,
        payload: payloadObj,
      });
      setOwnerNameError(false);
      setManagerError(false);
      setContNumError(false);
      let path = `/gig-summary`;
      history.push(path);
    } else {
      if (ownerName === "") {
        setOwnerNameError(true);
      }
      if (manager === "") {
        setManagerError(true);
      }
      if (contNum === "") {
        setContNumError(true);
      }
    }
  };

  return (
    <div className="page-background">
      <div className="cgig-overview-main-holder pointOfContact">
        <Heading4Medium
          className={"heading4medium"}
          fontWeight={"700"}
          text={strings.pointOfContact}
          color={Colors.black}
          margin={"0 0 12px 0"}
        />
        <div className="overview-box">
          <Body
            className={"body"}
            text={strings.pointOfContactRefersToThePerson}
            color={Colors.midGray}
            margin={"0 0 20px 0"}
          />
          <div className="cgig-omh-radio">
            <div className="grid-item">
              <InputLabel
                text={strings.areYouThePointOfContact}
                color={Colors.nightGray}
                padding={"0px 0 8px 0"}
                className={"inputlabel"}
              />
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="yes"
                    control={
                      <Radio
                        checked={type === "yes"}
                        value="yes"
                        onClick={yes}
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    control={
                      <Radio checked={type === "no"} value="no" onClick={no} />
                    }
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <div className="grid-item" style={{ marginTop: "25px" }}>
                <InputLabel
                  text={strings.Name}
                  color={Colors.nightGray}
                  padding={"0px 0 8px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className="textfield"
                  placeholder={strings.enterYourName}
                  value={ownerName}
                  onChange={(e) => {
                    setOwnerName(e.target.value);
                    setOwnerNameError(false);
                  }}
                />
                {ownerNameError && (
                  <Error
                    className="inputerror"
                    text={"Name is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item" style={{ marginTop: "25px" }}>
                <InputLabel
                  text={strings.title}
                  color={Colors.nightGray}
                  padding={"0px 0 8px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className="textfield"
                  placeholder={"Manager"}
                  value={manager}
                  onChange={(e) => {
                    setManager(e.target.value);
                    setManagerError(false);
                  }}
                />
                {managerError && (
                  <Error
                    className="inputerror"
                    text={"Title is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item" style={{ marginTop: "25px" }}>
                <InputLabel
                  text={strings.contactNumber}
                  color={Colors.nightGray}
                  padding={"0px 0 8px 0"}
                  className={"inputlabel"}
                />
                {/* <Textfield className="textfield" placeholder={'604.123.4567'} value={contNum} onChange={(e) => setContNum(e.target.value)} /> */}
                <PhoneInput
                  specialLabel={""}
                  className="change-value-text"
                  value={contNum}
                  inputStyle={{
                    width: "94%",
                    border: "1px solid #EBF7F9",
                    borderRadius: "4px",
                    backgroundColor: "#EBF7F9",
                    margin: "0px",
                    minHeight: "20px ",
                    padding: "10px 16px",
                  }}
                  onChange={(e) => {
                    if (e.length === "") {
                      setContNumError(true);
                    } else {
                      setContNumError(false);
                      setContNum(e);
                    }
                  }}
                />

                {contNumError && (
                  <Error
                    className="inputerror"
                    text={"Contact Number is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              justifyContent={"flex-end"}
              style={{ display: "flex", paddingTop: "20px" }}
            >
              <TransparentButton
                className="transparentbutton"
                text={strings.Back}
                width={"113px"}
                onClick={() => props.handleBack()}
              />
              <PrimaryButton
                className="primarybutton"
                onClick={routeChangeGigSummary}
                text={strings.Continue}
                width={"113px"}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default CGIGPointOfContact;
