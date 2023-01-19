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
import Autocomplete from "react-google-autocomplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// import images
import LoactionGrayIcon from "../../image-assets/structure/loaction-gray-icon.svg";

import "./AccountSetting.scss";

// Importing localised strings
const strings = require("../../localisation_en.json");

const provinces = [
  {
    value: "BC",
    label: "BC",
  },
  {
    value: "EUR",
    label: "EUR",
  },
];

function AccountSettingAddresh(props) {
  const [isCheckedOne, setIsCheckedOne] = React.useState(false);
  const [addressField, setAddressField] = useState({
    businessAddress1: props.fileds ? props.fileds.address1 : "",
    businessAddress2: props.fileds ? props.fileds.address2 : "",
    city: props.fileds ? props.fileds.city : "",
    province: props.fileds ? props.fileds.province : "",
    country: props.fileds ? props.fileds.country : "",
    postalCode: props.fileds ? props.fileds.postal_code : "",
  });
  const [addressFieldError, setAddressFieldError] = useState({
    businessAddress1Error: false,
    businessAddress2Error: false,
    cityError: false,
    provinceError: false,
    countryError: false,
    postalCodeError: false,
  });

  const [province, setProvince] = React.useState("EUR");
  const handleChange = (event) => {
    let province_id = props.provinceData.find(
      (item) => item.name === event.target.value
    );
    setAddressField({ ...addressField, province: province_id.id });
    setAddressFieldError({ ...addressFieldError, provinceError: false });
  };

  const handleExpand = () => {
    setAddressField({
      businessAddress1: props.fileds ? props.fileds.address1 : "",
      businessAddress2: props.fileds ? props.fileds.address2 : "",
      city: props.fileds ? props.fileds.city : "",
      province: props.fileds ? props.fileds.province : "",
      country: props.fileds ? props.fileds.country : "",
      postalCode: props.fileds ? props.fileds.postal_code : "",
    });
  };

  const handlePlaceSelection = (place) => {
    let updatedobj = {
      businessAddress1: place.formatted_address,
    };
    place.address_components.map((item) => {
      let index1 = item.types.findIndex((location) => location === "locality");
      if (index1 > -1) {
        updatedobj = { ...updatedobj, city: item.long_name };
      }
      let index2 = item.types.findIndex((location) => location === "country");
      if (index2 > -1) {
        updatedobj = { ...updatedobj, country: item.long_name };
      }
      let index3 = item.types.findIndex(
        (location) => location === "postal_code"
      );
      if (index3 > -1) {
        updatedobj = { ...updatedobj, postalCode: item.long_name };
      }
    });
    setAddressField({ ...addressField, ...updatedobj });
  };

  const handleUpdate = () => {
    let newAddressField = { ...addressField };
    delete newAddressField.businessAddress2;

    if (Object.values(newAddressField).every((item) => item !== "")) {
      props.onUpdatefn({
        address1: addressField.businessAddress1,
        address2: addressField.businessAddress2,
        city: addressField.city,
        country: addressField.country,
        province: addressField.province,
        postal_code: addressField.postalCode,
      });
      setTimeout(() => {
        setIsCheckedOne(false);
      }, 1000);
    } else {
      let updatedObj = {};
      if (addressField.businessAddress1 === "") {
        updatedObj = { ...updatedObj, businessAddress1Error: true };
      }
      if (addressField.city === "") {
        updatedObj = { ...updatedObj, cityError: true };
      }
      if (addressField.province === "") {
        updatedObj = { ...updatedObj, provinceError: true };
      }
      if (addressField.country === "") {
        updatedObj = { ...updatedObj, countryError: true };
      }
      if (addressField.postalCode === "") {
        updatedObj = { ...updatedObj, postalCodeError: true };
      }

      setAddressFieldError({
        ...setAddressFieldError,
        ...updatedObj,
      });
    }
  };

  let province_name =
    props.fileds &&
    props.provinceData &&
    props.provinceData.length > 0 &&
    props.fileds.province &&
    props.provinceData.find((item) => item.id === addressField.province);
  //console.log(province_name);

  return (
    <>
      <Grid className={"account-flex-row"} marginBottom={"40px"}>
        <div className={"left-heading"}>
          <Heading6Medium
            text={strings.Address}
            fontWeight={"700"}
            color={Colors.nightGray}
            className={"heading6medium"}
          />
        </div>
        <div className={"value-text"}>
          <div style={{ display: "block" }}>
            <Collapse in={isCheckedOne}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                className={"width480"}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* Business Address 1"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <div className={"location-address"}>
                      <img
                        src={LoactionGrayIcon}
                        alt="name"
                        className="locationGrayIcon"
                      />

                      <Autocomplete
                        apiKey="AIzaSyCvp1OcXRtcgYbd7WnzMh-SPGzFbLlFOts"
                        style={{
                          width: "95%",
                          border: "1px solid #EBF7F9",
                          borderRadius: "4px",
                          backgroundColor: "#EBF7F9",
                          paddingLeft: "40px",
                        }}
                        className={
                          addressFieldError.businessAddress1Error
                            ? "input-error textfield"
                            : "textfield"
                        }
                        onPlaceSelected={(place) => {
                          console.log(place);
                          handlePlaceSelection(place);
                        }}
                        value={addressField.businessAddress1}
                        options={{
                          types: ["geocode"],
                          //componentRestrictions: { country: "ru" },
                        }}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setAddressFieldError({
                              ...addressFieldError,
                              businessAddress1Error: true,
                            });
                          } else {
                            setAddressFieldError({
                              ...addressFieldError,
                              businessAddress1Error: false,
                            });
                          }
                          setAddressField({
                            ...addressField,
                            businessAddress1: e.target.value,
                          });
                        }}
                        //defaultValue="Amsterdam"
                      />
                      {addressFieldError.businessAddress1Error && (
                        <Error
                          className="inputerror"
                          text={"Business Address1 is required"}
                          color={Colors.error}
                          margin={"4px 0 8px 0"}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="grid-item">
                    <InputLabel
                      text={"Business Address 2"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <Textfield
                      className="textfield"
                      placeholder={""}
                      //value={addressField.businessAddress2}
                      onChange={(ev) => {
                        console.log(ev.target.value);
                        setAddressField({
                          ...addressField,
                          businessAddress2: ev.target.value,
                        });
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* City"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <Textfield
                      className={
                        addressFieldError.cityError
                          ? "input-error textfield"
                          : "textfield"
                      }
                      placeholder={""}
                      value={addressField.city}
                      onChange={(ev) => {
                        if (ev.target.value === "") {
                          setAddressFieldError({
                            ...addressFieldError,
                            cityError: true,
                          });
                        } else {
                          setAddressFieldError({
                            ...addressFieldError,
                            cityError: false,
                          });
                        }
                        setAddressField({
                          ...addressField,
                          city: ev.target.value,
                        });
                      }}
                    />
                    {addressFieldError.cityError && (
                      <Error
                        className="inputerror"
                        text={"province is required"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* Province"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />

                    {/* {console.log(
                      props.fileds
                        ? props.provinceData &&
                            props.provinceData.length > 0 &&
                            props.fileds.province &&
                            props.provinceData.find(
                              (item) => item.id === addressField.province
                            )
                        : ""
                    )} */}
                    <TextField
                      className={
                        addressFieldError.provinceError
                          ? "input-error textfield"
                          : "textfield"
                      }
                      select
                      value={province_name ? province_name.name : ""}
                      onChange={handleChange}
                      placeholder={
                        strings.Selectwhichindustryyouarein_egConstruction
                      }
                    >
                      {props.provinceData &&
                        props.provinceData.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                    </TextField>
                    {addressFieldError.provinceError && (
                      <Error
                        className="inputerror"
                        text={"province is required"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* Country"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <Textfield
                      className={
                        addressFieldError.countryError
                          ? "input-error textfield"
                          : "textfield"
                      }
                      placeholder={""}
                      value={addressField.country}
                      onChange={(ev) => {
                        if (ev.target.value === "") {
                          setAddressFieldError({
                            ...addressFieldError,
                            countryError: true,
                          });
                        } else {
                          setAddressFieldError({
                            ...addressFieldError,
                            countryError: false,
                          });
                        }
                        setAddressField({
                          ...addressField,
                          country: ev.target.value,
                        });
                      }}
                    />
                    {addressFieldError.countryError && (
                      <Error
                        className="inputerror"
                        text={"Country is required"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* Postal Code"}
                      color={Colors.nightGray}
                      padding={"0px 0 8px 0"}
                      className={"inputlabel"}
                    />
                    <Textfield
                      className={
                        addressFieldError.postalCodeError
                          ? "input-error textfield"
                          : "textfield"
                      }
                      placeholder={""}
                      value={addressField.postalCode}
                      onChange={(ev) => {
                        if (ev.target.value === "") {
                          setAddressFieldError({
                            ...addressFieldError,
                            postalCodeError: true,
                          });
                        } else {
                          setAddressFieldError({
                            ...addressFieldError,
                            postalCodeError: false,
                          });
                        }
                        setAddressField({
                          ...addressField,
                          postalCode: ev.target.value,
                        });
                      }}
                    />
                    {addressFieldError.postalCodeError && (
                      <Error
                        className="inputerror"
                        text={"Postal Code is required"}
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
                    setIsCheckedOne((prev) => !prev);
                  }}
                />

                {!Object.values(addressFieldError).some(
                  (item) => item === true
                ) ? (
                  <SecondaryButton
                    onClick={handleUpdate}
                    className="primarybutton"
                    text={strings.Update}
                    width={"113px"}
                  />
                ) : (
                  <NeutralLightButton
                    onClick={handleUpdate}
                    className="neutrallightbutton"
                    text={strings.Update}
                    width={"113px"}
                  />
                )}
              </Grid>
            </Collapse>
            <span className="change-value-text">
              {props.fileds?.address1 &&
                props.fileds?.city &&
                props.fileds?.country &&
                `${props.fileds.address1}, ${props.fileds.city}, ${props.fileds.country}-${props.fileds.postal_code}`}
            </span>
          </div>
        </div>
        <div className={"editTextBox"}>
          <FormControlLabel
            control={
              <input
                type="checkbox"
                checked={isCheckedOne}
                onChange={() => {
                  setIsCheckedOne((prev) => !prev);
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

export default AccountSettingAddresh;
