import React, { useState } from "react";
import * as Colors from "../../Styles-Elements/Colors";
import TextField from "@mui/material/TextField";
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

import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@mui/material/Grid";

// Importing localised strings
const strings = require("../../localisation_en.json");

const topIndustry = [
  { label: "Chemical Industry" },
  { label: "Chemical Industry" },
  { label: "Construction" },
];
function AccountSettingIndustry(props) {
  const [isCheckedFore, setIsCheckedFore] = React.useState(false);

  const [industry, setIndustry] = useState(null);
  const [industryError, setIndustryError] = useState(true);

  const handleExpand = () => {
    setIndustry(props.fileds ? props.fileds.industry : "");
  };

  const industryUpate = () => {
    if (industry !== null) {
      props.onUpdatefn({
        industry: industry,
      });
      setTimeout(() => {
        setIsCheckedFore(false);
      }, 2000);
      setIndustryError(false);
    } else {
      setIndustryError(true);
    }
  };

  return (
    <>
      <Grid className={"account-flex-row"} marginBottom={"40px"}>
        <div className={"left-heading"}>
          <Heading6Medium
            text={strings.Industry}
            fontWeight={"700"}
            color={Colors.nightGray}
            className={"heading6medium"}
          />
        </div>
        <div className={"value-text"}>
          <div style={{ display: "block" }}>
            <Collapse in={isCheckedFore}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                className={"width340"}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="grid-item">
                    <InputLabel
                      text={strings.Industry}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    {/* <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={topIndustry}
                      renderInput={(params) => (
                        <TextField
                          className="textfield"
                          {...params}
                          value={industry}
                        />
                      )}
                    /> */}

                    <Autocomplete
                      classes={
                        industryError
                          ? "input-error textfield"
                          : "input textfield"
                      }
                      disablePortal
                      id="combo-box-demo"
                      options={props.industryData}
                      getOptionLabel={(option) => option.name || ""}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(e, data) => {
                        if (data) {
                          setIndustry(data.name);
                          setIndustryError(false);
                        } else {
                          setIndustry(data);
                          setIndustryError(true);
                        }
                      }}
                    />
                    {industryError && (
                      <Error
                        className="inputerror"
                        text={"Industry is required"}
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
                    setIsCheckedFore((prev) => !prev);
                  }}
                />
                {industryError === false ? (
                  <SecondaryButton
                    className="primarybutton"
                    text={strings.Update}
                    width={"113px"}
                    onClick={industryUpate}
                  />
                ) : (
                  <NeutralLightButton
                    className="neutrallightbutton"
                    text={strings.Update}
                    width={"113px"}
                    onClick={industryUpate}
                  />
                )}
              </Grid>
            </Collapse>
            <span className="change-value-text">
              {props.fileds &&
                props.fileds.industry !== "null" &&
                props.fileds.industry}
            </span>
          </div>
        </div>
        <div className={"editTextBox"}>
          <FormControlLabel
            control={
              <input
                type="checkbox"
                checked={isCheckedFore}
                onChange={() => {
                  setIsCheckedFore((prev) => !prev);
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

export default AccountSettingIndustry;
