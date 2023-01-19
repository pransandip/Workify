import React, { useState } from "react";
import * as Colors from "../../Styles-Elements/Colors";
import { Textfield } from "../../Styles-Elements/Inputs";
import {
  TransparentButton,
  NeutralLightButton,
  SecondaryButton,
} from "../../Styles-Elements/Buttons";
import {
  Heading6Medium,
  InputLabel,
  Error,
} from "../../Styles-Elements/Labels";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@mui/material/Grid";
import PhoneInput from "react-phone-input-2";
// Importing localised strings
const strings = require("../../localisation_en.json");

function AccountSettingPhoneNumber(props) {
  const [isCheckedThree, setIsCheckedThree] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  let RegexPhoneNumber = /^\(?(\d{3})\)?(\d{3})[- ]?(\d{4})$/;
  const handleExpand = () => {
    setPhoneNumber(props.fileds ? 1 + props.fileds.mobile : "");
  };
  const ValidatePhoneNumber = (value) => {
    if (
      !RegexPhoneNumber.test(value.replace(/[^a-zA-Z0-9]/g, "").substring(1))
    ) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
  };

  const handlePhoneCheck = () => {
    if (phoneNumber !== "") {
      props.onUpdatefn({
        mobile: phoneNumber,
      });
      setTimeout(() => {
        setIsCheckedThree(false);
      }, 2000);
    } else {
      setPhoneNumberError(true);
    }
  };

  return (
    <>
      <Grid className={"account-flex-row"} marginBottom={"40px"}>
        <div className={"left-heading"}>
          <Heading6Medium
            text={strings.PhoneNumber}
            fontWeight={"700"}
            color={Colors.nightGray}
            className={"heading6medium"}
          />
        </div>
        <div className={"value-text"}>
          <div style={{ display: "block" }}>
            <Collapse in={isCheckedThree}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                className={"width340"}
              >
                <Grid item sm={12}>
                  <div className="grid-item">
                    <InputLabel
                      text={strings.PhoneNumber}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <PhoneInput
                      specialLabel={""}
                      country={"us"}
                      inputStyle={{
                        width: "90%",
                        border: "1px solid #EBF7F9 ",
                        borderRadius: "4px",
                        backgroundColor: "#EBF7F9",
                        padding: "10px 16px",
                        borderColor: phoneNumberError && "red",
                      }}
                      value={phoneNumber}
                      onChange={(e) => {
                        console.log(e);
                        if (e.length === "") {
                          setPhoneNumberError(true);
                        } else {
                          setPhoneNumberError(false);
                          setPhoneNumber(e);
                        }
                        ValidatePhoneNumber(e);
                      }}
                      onBlur={(ev) => {
                        console.log(ev);
                        ValidatePhoneNumber(ev.target.value);
                      }}
                      // {...props}
                    />
                    {phoneNumberError && (
                      <Error
                        className="inputerror"
                        text={"Enter a valid phone number"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                margin={"30px 0px 0px 0px"}
              >
                <TransparentButton
                  className="transparentbutton"
                  width={"100px"}
                  text={strings.cancel}
                  onClick={() => {
                    setIsCheckedThree((prev) => !prev);
                  }}
                />
                {phoneNumberError === false ? (
                  <SecondaryButton
                    className="neutrallightbutton"
                    text={strings.Update}
                    width={"113px"}
                    onClick={handlePhoneCheck}
                  />
                ) : (
                  <NeutralLightButton
                    className="neutrallightbutton"
                    text={strings.Update}
                    width={"113px"}
                    onClick={handlePhoneCheck}
                  />
                )}
              </Grid>
            </Collapse>
            <PhoneInput
              specialLabel={""}
              className="change-value-text"
              value={props.fileds && props.fileds.mobile}
              inputStyle={{ border: "none", pointerEvents: "none" }}
            >
              {/* {props.fileds && props.fileds.mobile} */}
            </PhoneInput>
          </div>
        </div>
        <div className={"editTextBox"}>
          <FormControlLabel
            control={
              <input
                type="checkbox"
                checked={isCheckedThree}
                onChange={() => {
                  setIsCheckedThree((prev) => !prev);
                  handleExpand();
                }}
              />
            }
            label="Edit"
          />
        </div>
      </Grid>
    </>
  );
}

export default AccountSettingPhoneNumber;
