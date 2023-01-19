import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Heading3Bold,
  Heading5Medium,
  Body,
  InputLabel,
  Error,
} from "../../../Styles-Elements/Labels";
import { Textfield, InputWrapper } from "../../../Styles-Elements/Inputs";
import { Autocomplete as AutocompleteDropdown } from "@mui/material";
import * as Colors from "../../../Styles-Elements/Colors";
import {
  TransparentButton,
  SecondaryButton,
  NeutralLightButton,
} from "../../../Styles-Elements/Buttons";
// Material UI for the snackbar
import { Container, Box } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Autocomplete from "react-google-autocomplete";
// import images
import Crose_Icon from "../../../image-assets/structure/crose-icon.svg";
import UploadedImg from "../../../image-assets/product/h-product-logo1.png";
import UploadedIcon from "../../../image-assets/product/upload-icon.png";
import visibilityIcon from "../../../image-assets/structure/visible.svg";
import unVisibilityIcon from "../../../image-assets/structure/unvisible.svg";
import SuccessIcon from "../../../image-assets/structure/success-alert.svg";
import LoactionGrayIcon from "../../../image-assets/structure/loaction-gray-icon.svg";

import Popup from "../../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../../Helpers/Enums";
import "./../ServiceAgreement.scss";

// importing axios from api/axios.js
import axios from "../../../api/axios";
import { auth } from "../../../api/axios";

const strings = require("../../../localisation_en.json");

const currencies = [
  {
    value: "BC",
    label: "BC",
  },
  {
    value: "EUR",
    label: "EUR",
  },
];

const topIndustry = [
  { label: "Chemical Industry" },
  { label: "Chemical Industry" },
  { label: "Construction" },
];

function AccountDetail(props) {
  const history = useHistory();

  const [currency, setCurrency] = React.useState("");
  const handleChange = (e) => {
    setCurrency(e.target.value);
    setProvinceError(false);
  };

  const [showPassword, setShowPassword] = useState("Password");
  const [showVisibilityIcon, setShowVisibilityIcon] = useState(false);
  const [loading, setLoading] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [businessAddress1, setBusinessAddress1] = useState("");
  const [businessAddress2, setBusinessAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [businessNameError, setBusinessNameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [businessAddress1Error, setBusinessAddress1Error] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [businessPhoneNumberError, setBusinessPhoneNumberError] =
    useState(false);
  const [industryError, setIndustryError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [role, setRole] = useState("business");
  const [latitude, setLatitude] = useState(45621564654);
  const [longitude, setLongitude] = useState(65656555326);
  const [province, setProvince] = useState(2);
  const [industry, setIndustry] = useState("");
  const [company_logo, setCompany_logo] = useState("");
  const [company_logoError, setCompany_logoError] = useState("");
  const [validImgLogoError, setvalidImgLogoError] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const [provinceData, setProvinceData] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [newPasswordValid, setnewPasswordValid] = useState({
    lowerCharacterError: true,
    upperCharacterError: true,
    specialCharacterError: true,
    lengthError: true,
    matchPassword: true,
  });

  const [previewModal, setPreviewModal] = useState({
    imageData: null,
    path: "",
  });

  useEffect(() => {
    getProvienceData();
    getIndustriesData();
  }, []);

  let RegexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let RegexPostalCode = /^[1-9][0-9]{5}$/;

  let RegexPhoneNumber = /^\(?(\d{3})\)?(\d{3})[- ]?(\d{4})$/;

  var RegexLowerCaseLetters = /[a-z]/g;
  var RegexUpperCaseLetters = /[A-Z]/g;
  var RegexSpecialCaseLetters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  var bodyData = new FormData();
  bodyData.append("business_name", businessName);
  bodyData.append("first_name", firstName);
  bodyData.append("last_name", lastName);
  bodyData.append("email", email);
  bodyData.append("address1", businessAddress1);
  bodyData.append("address2", businessAddress2);
  bodyData.append("city", city);
  bodyData.append("country", country);
  bodyData.append("postal_code", postalCode);
  bodyData.append("mobile", businessPhoneNumber);
  bodyData.append("password", newPassword);
  bodyData.append("role", role);
  bodyData.append("latitude", latitude);
  bodyData.append("longitude", longitude);
  bodyData.append("province", 10);
  bodyData.append("industry", industry);
  bodyData.append("company_logo", company_logo);
  bodyData.append("title", title);
  //title

  const getIndustriesData = () => {
    axios
      .get("/api/industry")
      .then((res) => {
        setIndustryData(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  const getProvienceData = () => {
    axios
      .get("/api/province")
      .then((res) => {
        setProvinceData(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  const handleImgUpload = (e) => {
    if (e.target.files[0]?.type.split("/")[0] !== 'image') {
      setvalidImgLogoError(true);
      setCompany_logoError(false);
      return;
    }
    setvalidImgLogoError(false);
    setCompany_logo(e.target.files[0]);
    setCompany_logoError(false);
    let reader = new window.FileReader();
    if (reader) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        var image = new Image();
        image.src = reader.result;
        image.onload = function () {
          setPreviewModal({
            imageData: reader.result,
            path: reader.path,
          });
        };
      };
    }
  };

  const handlePlaceSelection = (place) => {
    setBusinessAddress1(place.formatted_address);
    place.address_components.map((item) => {
      let index1 = item.types.findIndex((location) => location === "locality");
      if (index1 > -1) {
        setCity(item.long_name);
        setCityError(false);
      }
      let index2 = item.types.findIndex((location) => location === "country");
      if (index2 > -1) {
        setCountry(item.long_name);
        setCountryError(false);
      }
      let index3 = item.types.findIndex(
        (location) => location === "postal_code"
      );
      if (index3 > -1) {
        setPostalCode(item.long_name);
        setPostalCodeError(false);
      }
    });
  };

  const validateData = () => {
    let error = true;
    if (businessName === "" || businessName.trim() === "") {
      setBusinessNameError(true);
      error = false;
    }
    if (firstName === "" || firstName.trim() === "") {
      setFirstNameError(true);
      error = false;
    }
    if (lastName === "" || lastName.trim() === "") {
      setLastNameError(true);
      error = false;
    }
    if (currency === "") {
      setProvinceError(true);
      error = false;
    }
    if (email === "") {
      setEmailError(true);
      error = false;
    }
    if (businessAddress1 === "" || businessAddress1.trim() === "") {
      setBusinessAddress1Error(true);
      error = false;
    }
    if (city === "" || city.trim() === "") {
      setCityError(true);
      error = false;
    }
    if (country === "" || country.trim() === "") {
      setCountryError(true);
      error = false;
    }
    if (postalCode === "") {
      setPostalCodeError(true);
      error = false;
    }
    if (businessPhoneNumber === "") {
      setBusinessPhoneNumberError(true);
      error = false;
    }
    if (industry === "") {
      setIndustryError(true);
      error = false;
    }
    if (company_logo === "") {
      setCompany_logoError(true);
      error = false;
    }
    if (newPassword === "") {
      setNewPasswordError(true);
      error = false;
    }
    if (confirmNewPassword === "") {
      setConfirmNewPasswordError(true);
      error = false;
    }

    setButtonActive(error);
    return error;
  };

  const routeChange = (e) => {
    e.preventDefault();
    setvalidImgLogoError(false);
    if (validateData(!Object.values(newPasswordValid))) {
      if (!Object.values(newPasswordValid).some((item) => item === true)) {
        setLoading(true);
        axios
          .post("/api/signup", bodyData)
          .then((res) => {
            setLoading(false);

            if (res.status === 201 && res.data.ack === 1) {
              history.push({
                pathname: "/email-verification",
                state: { email: email },
              });
            } else {
              if (res.data.ack === 0) {
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
            }
          })
          .catch((err) => {
            console.log("error");
            console.log(err);
          });
      }
    }
    // let path = `/email-verification`;
  };

  const validateEmail = (value) => {
    if (!RegexEmail.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const ValidatePostalCode = (value) => {
    if (!RegexPostalCode.test(value)) {
      setPostalCodeError(true);
    } else {
      setPostalCodeError(false);
    }
  };
  const ValidatePhoneNumber = (value) => {
    if (
      !RegexPhoneNumber.test(value.replace(/[^a-zA-Z0-9]/g, "").substring(1))
    ) {
      setBusinessPhoneNumberError(true);
    } else {
      setBusinessPhoneNumberError(false);
    }
  };

  const ValidatePassword = (value) => {
    let newObj = {
      lowerCharacterError: false,
      upperCharacterError: false,
      specialCharacterError: false,
      lengthError: false,
    };
    if (!RegexLowerCaseLetters.test(value)) {
      newObj = { ...newObj, lowerCharacterError: true };
    } else {
      newObj = { ...newObj, lowerCharacterError: false };
    }
    if (!RegexUpperCaseLetters.test(value)) {
      newObj = { ...newObj, upperCharacterError: true };
    } else {
      newObj = { ...newObj, upperCharacterError: false };
    }
    if (!RegexSpecialCaseLetters.test(value)) {
      newObj = { ...newObj, specialCharacterError: true };
    } else {
      newObj = { ...newObj, specialCharacterError: false };
    }
    if (value.length < 8) {
      newObj = { ...newObj, lengthError: true };
    } else {
      newObj = { ...newObj, lengthError: false };
    }
    if (confirmNewPassword !== "") {
      if (value === confirmNewPassword) {
        newObj = {
          ...newObj,
          matchPassword: false,
        };
      } else {
        newObj = {
          ...newObj,
          matchPassword: true,
        };
      }
    }
    setnewPasswordValid({
      ...newPasswordValid,
      ...newObj,
    });
  };

  const ValidateConfirmPassword = (value) => {
    if (value === newPassword) {
      setnewPasswordValid({
        ...newPasswordValid,
        matchPassword: false,
      });
    } else {
      setnewPasswordValid({
        ...newPasswordValid,
        matchPassword: true,
      });
    }
  };

  // const ValidateNewPassword = (value) => {
  //   if (confirmNewPassword !== "") {
  //     if (value === confirmNewPassword) {
  //       setnewPasswordValid({
  //         ...newPasswordValid,
  //         matchPassword: false,
  //       });
  //     } else {
  //       setnewPasswordValid({
  //         ...newPasswordValid,
  //         matchPassword: true,
  //       });
  //     }
  //   }
  // };
  console.log({ company_logo })
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Heading3Bold
              text={strings.AccountDetails}
              color={Colors.black}
              textAlign={"left"}
            />
            <div
              className="costomer-agreement-box"
              style={{ padding: "26px 32px 24px 32px" }}
            >
              <div className={"upload-row"}>
                <div>
                  <div className={"upload-box"}>
                    {previewModal.imageData && (
                      <img
                        src={Crose_Icon}
                        className={"crose-icon"}
                        alt="some value"
                        onClick={() => {
                          setPreviewModal({
                            imageData: null,
                            path: "",
                          });
                          setCompany_logo("");
                        }}
                      />
                    )}
                    <img
                      src={
                        previewModal.imageData
                          ? previewModal.imageData
                          : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                      }
                      className={"upload-img"}
                      placeholder="Company logo"
                      alt="Company Logo"
                      style={{
                        height: "130px",
                        width: "125px",
                        padding: "15px",
                      }}
                    />
                    {/*<img src={UploadedIcon} className={'upload-icon'} alt='some value' />*/}
                  </div>
                  {company_logoError && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      Company logo required
                    </div>
                  )}
                  {validImgLogoError && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      Please upload a valid image
                    </div>
                  )}
                </div>
                <div className="upload-btn-box">
                  <SecondaryButton
                    className="secondarybutton"
                    text={strings.UploadCompanyLogo}
                    width={"210px"}
                    margin={"0px 0px 20px 15px"}
                  />
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setvalidImgLogoError(false);
                      } else {
                        handleImgUpload(e);
                      }
                    }}
                  />
                </div>
              </div>
              {/* <div className="grid-item">
                <InputLabel
                  text={"* Owner Name"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className={
                    ownerNameError ? "input-error textfield" : "textfield"
                  }
                  placeholder={"Enter Owner Name"}
                  value={ownerName}
                  onChange={(e) => {
                    setOwnerName(e.target.value);
                    if (e.target.value === "") {
                      setOwnerNameError(true);
                    } else {
                      setOwnerNameError(false);
                    }
                  }}
                />
                {ownerNameError && (
                  <Error
                    className="inputerror"
                    text={"Owner Name is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div> */}
              <div className="grid-item">
                <InputLabel
                  text={"* Business Name"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className={
                    businessNameError ? "input-error textfield" : "textfield"
                  }
                  placeholder={strings.Enterthenameofyourbusiness}
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    if (e.target.value === "") {
                      setBusinessNameError(true);
                    } else {
                      setBusinessNameError(false);
                    }
                  }}
                />
                {businessNameError && (
                  <Error
                    className="inputerror"
                    text={"Business Name is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item">
                <InputLabel
                  text={"* First Name"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className={
                    firstNameError ? "input-error textfield" : "textfield"
                  }
                  placeholder={`Enter your First Name`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (e.target.value === "") {
                      setFirstNameError(true);
                    } else {
                      setFirstNameError(false);
                    }
                  }}
                />
                {firstNameError && (
                  <Error
                    className="inputerror"
                    text={"First Name is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item">
                <InputLabel
                  text={"* Last Name"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className={
                    lastNameError ? "input-error textfield" : "textfield"
                  }
                  placeholder={`Enter your Last Name`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (e.target.value === "") {
                      setLastNameError(true);
                    } else {
                      setLastNameError(false);
                    }
                  }}
                />
                {lastNameError && (
                  <Error
                    className="inputerror"
                    text={"Last Name is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item">
                <InputLabel
                  text={"Title"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className={"textfield"}
                  placeholder={"Ex: CTO, Manager, etc.."}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="grid-item">
                <InputLabel
                  text={"* " + strings.email}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className={emailError ? "input-error textfield" : "textfield"}
                  type="email"
                  placeholder={strings.Enteryouremail}
                  value={email}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setEmailError(true);
                    } else {
                      setEmailError(false);
                    }
                    setEmail(e.target.value);
                  }}
                  onBlur={(ev) => {
                    validateEmail(ev.target.value);
                  }}
                />
                {emailError && (
                  <Error
                    className="inputerror"
                    text={"Enter a valid email"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item">
                <InputLabel
                  text={"* Business Address 1"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                {/* <Textfield
                  className={
                    businessAddress1Error
                      ? "input-error textfield"
                      : "textfield"
                  }
                  placeholder={strings.Enteryourbusinessstreetaddress}
                  value={businessAddress1}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setBusinessAddress1Error(true);
                    } else {
                      setBusinessAddress1Error(false);
                    }
                    setBusinessAddress1(e.target.value);
                  }}
                /> */}
                <div className={"location-address"}>
                  <img
                    src={LoactionGrayIcon}
                    alt="name"
                    className="locationGrayIcon"
                  />
                  <Autocomplete
                    apiKey="AIzaSyCvp1OcXRtcgYbd7WnzMh-SPGzFbLlFOts"
                    style={{
                      width: "90%",
                      border: "1px solid #EBF7F9",
                      borderRadius: "4px",
                      backgroundColor: "#EBF7F9",
                      paddingLeft: "40px",
                    }}
                    className={
                      businessAddress1Error
                        ? "input-error textfield"
                        : "textfield"
                    }
                    onPlaceSelected={(place) => {
                      handlePlaceSelection(place);
                    }}
                    value={businessAddress1}
                    options={{
                      types: ["geocode"],
                      //componentRestrictions: { country: "ru" },
                    }}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setBusinessAddress1Error(true);
                      } else {
                        setBusinessAddress1Error(false);
                      }
                      setBusinessAddress1(e.target.value);
                    }}
                  //defaultValue="Amsterdam"
                  />
                  {businessAddress1Error && (
                    <Error
                      className="inputerror"
                      text={"Business Address1 is required"}
                      color={Colors.error}
                      margin={"4px 0 8px 0"}
                    />
                  )}
                </div>
              </div>
              <div className="grid-item">
                <InputLabel
                  text={"Business Address 2"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className="textfield"
                  placeholder={
                    strings.Enteryourapartmentsuiteunitnumberetc_optional
                  }
                  value={businessAddress2}
                  onChange={(e) => setBusinessAddress2(e.target.value)}
                />
              </div>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* City"}
                      color={Colors.nightGray}
                      padding={"0 0 6px 0"}
                      className={"inputlabel"}
                    />
                    <Textfield
                      className={
                        cityError ? "input-error textfield" : "textfield"
                      }
                      placeholder={strings.Selectyourcity}
                      value={city}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setCityError(true);
                        } else {
                          setCityError(false);
                        }
                        setCity(e.target.value);
                      }}
                    />
                    {cityError && (
                      <Error
                        className="inputerror"
                        text={"City is required"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* Province"}
                      color={Colors.nightGray}
                      padding={"0 0 6px 0"}
                      className={"inputlabel"}
                    />
                    <TextField
                      className={
                        provinceError ? "input-error textfield" : "textfield"
                      }
                      select
                      value={currency}
                      onChange={handleChange}
                      placeholder={
                        strings.Selectwhichindustryyouarein_egConstruction
                      }
                    >
                      {provinceData.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    {provinceError && (
                      <Error
                        className="inputerror"
                        text={"Province is required"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* Country"}
                      color={Colors.nightGray}
                      padding={"0 0 6px 0"}
                      className={"inputlabel"}
                    />
                    <Textfield
                      className={
                        countryError ? "input-error textfield" : "textfield"
                      }
                      placeholder={strings.Selectyourcountry}
                      value={country}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setCountryError(true);
                        } else {
                          setCountryError(false);
                        }
                        setCountry(e.target.value);
                      }}
                    />
                    {countryError && (
                      <Error
                        className="inputerror"
                        text={"Country is required"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <div className="grid-item">
                    <InputLabel
                      text={"* Postal Code"}
                      color={Colors.nightGray}
                      padding={"0 0 6px 0"}
                      className={"inputlabel"}
                    />
                    <Textfield
                      className={
                        postalCodeError ? "input-error textfield" : "textfield"
                      }
                      placeholder={strings.Enteryourpostalcode}
                      value={postalCode}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setPostalCodeError(true);
                        } else {
                          setPostalCodeError(false);
                        }
                        setPostalCode(e.target.value);
                      }}
                      onBlur={(ev) => {
                        ValidatePostalCode(ev.target.value);
                      }}
                    />
                    {postalCodeError && (
                      <Error
                        className="inputerror"
                        text={"Enter a valid postal code"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
              <div className="grid-item">
                <InputLabel
                  text={strings.BusinessTelephoneNumber}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                {/* <Textfield
                  className={
                    businessPhoneNumberError
                      ? "input-error textfield"
                      : "textfield"
                  }
                  placeholder={strings.Enteryourbusinessphonenumber}
                  value={businessPhoneNumber}
                  type="tel"
                  onChange={(e) => {
                    setBusinessPhoneNumber(e.target.value);
                    if (e.target.value === "") {
                      setBusinessPhoneNumberError(true);
                    } else {
                      setBusinessPhoneNumberError(false);
                    }
                  }}
                  onBlur={(ev) => {
                    ValidatePhoneNumber(ev.target.value);
                  }}
                /> */}
                <PhoneInput
                  specialLabel={""}
                  country={"us"}
                  inputStyle={{
                    width: "90%",
                    border: "1px solid #EBF7F9 ",
                    borderRadius: "4px",
                    backgroundColor: "#EBF7F9",
                    padding: "10px 16px",
                    borderColor: businessPhoneNumberError && "red",
                  }}
                  onChange={(e) => {
                    setBusinessPhoneNumber(e);
                    if (e === "") {
                      setBusinessPhoneNumberError(true);
                    } else {
                      setBusinessPhoneNumberError(false);
                    }
                  }}
                  onBlur={(ev) => {
                    ValidatePhoneNumber(ev.target.value);
                  }}
                // {...props}
                />
                {businessPhoneNumberError && (
                  <Error
                    className="inputerror"
                    text={"Enter a valid phone number"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item">
                <InputLabel
                  text={"* Industry"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />

                <AutocompleteDropdown
                  disablePortal
                  id="combo-box-demo"
                  options={industryData}
                  getOptionLabel={(option) => option.name || ""}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(e, data) => {
                    if (data) {
                      setIndustry(data.name);
                      setIndustryError(false);
                    } else {
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
                {/*<Textfield className="textfield" placeholder={strings.Selectwhichindustryyouarein_egConstruction }  />*/}
              </div>
              <div className={"divider"}></div>
              <div className="grid-item">
                <InputLabel
                  text={"New Password"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <InputWrapper>
                  <Textfield
                    className="textfield"
                    placeholder={strings.enterYourPassword}
                    type={showPassword}
                    padding={"12px 52px 12px 16px"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      ValidatePassword(e.target.value);
                      if (e.target.value === "") {
                        setNewPasswordError(true);
                      } else {
                        setNewPasswordError(false);
                      }
                    }}
                    onBlur={(e) => {
                      ValidatePassword(e.target.value);
                    }}
                  />
                  {newPasswordError && (
                    <Error
                      className="inputerror"
                      text={"Enter valid  password"}
                      color={Colors.error}
                      margin={"4px 0 8px 0"}
                    />
                  )}
                  {showVisibilityIcon ? (
                    <img
                      src={visibilityIcon}
                      className="visibleicon"
                      onClick={() => {
                        setShowVisibilityIcon(!showVisibilityIcon);
                        setShowPassword(
                          showPassword === "Password" ? "text" : "Password"
                        );
                      }}
                      alt="name"
                    />
                  ) : (
                    <img
                      src={unVisibilityIcon}
                      className="unvisibleicon"
                      onClick={() => {
                        setShowVisibilityIcon(!showVisibilityIcon);
                        setShowPassword(
                          showPassword === "Password" ? "text" : "Password"
                        );
                      }}
                      alt="name"
                    />
                  )}
                </InputWrapper>
              </div>
              <div className="grid-item" style={{ marginTop: "20px" }}>
                <InputLabel
                  text={"Confirm New Password"}
                  color={Colors.nightGray}
                  padding={"0 0 6px 0"}
                  className={"inputlabel"}
                />
                <InputWrapper>
                  <Textfield
                    className="textfield"
                    placeholder={strings.enterYourPassword}
                    type={showPassword}
                    padding={"12px 52px 12px 16px"}
                    value={confirmNewPassword}
                    onChange={(e) => {
                      setConfirmNewPassword(e.target.value);
                      ValidateConfirmPassword(e.target.value);
                      if (e.target.value === "") {
                        setConfirmNewPasswordError(true);
                      } else {
                        setConfirmNewPasswordError(false);
                      }
                    }}
                    onBlur={(e) => {
                      ValidateConfirmPassword(e.target.value);
                    }}
                  />
                  {confirmNewPasswordError && (
                    <Error
                      className="inputerror"
                      text={"Enter valid confirm password"}
                      color={Colors.error}
                      margin={"4px 0 8px 0"}
                    />
                  )}
                  {showVisibilityIcon ? (
                    <img
                      src={visibilityIcon}
                      className="visibleicon"
                      onClick={() => {
                        setShowVisibilityIcon(!showVisibilityIcon);
                        setShowPassword(
                          showPassword === "Password" ? "text" : "Password"
                        );
                      }}
                      alt="name"
                    />
                  ) : (
                    <img
                      src={unVisibilityIcon}
                      className="unvisibleicon"
                      onClick={() => {
                        setShowVisibilityIcon(!showVisibilityIcon);
                        setShowPassword(
                          showPassword === "Password" ? "text" : "Password"
                        );
                      }}
                      alt="name"
                    />
                  )}
                </InputWrapper>
              </div>
              <Grid container style={{ marginTop: "30px" }}>
                <Grid item xs={6}>
                  <div
                    className={
                      newPasswordValid.lowerCharacterError
                        ? "pass_set wrong_pass"
                        : "pass_set SuccessIcon"
                    }
                  >
                    <img
                      src={SuccessIcon}
                      className={"SuccessIcon"}
                      alt="some value"
                    />
                    <span>One lowercase character</span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      newPasswordValid.specialCharacterError
                        ? "pass_set wrong_pass"
                        : "pass_set SuccessIcon"
                    }
                  >
                    <img
                      src={SuccessIcon}
                      className={"SuccessIcon"}
                      alt="some value"
                    />
                    One special character
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      newPasswordValid.upperCharacterError
                        ? "pass_set wrong_pass"
                        : "pass_set SuccessIcon"
                    }
                  >
                    <img
                      src={SuccessIcon}
                      className={"SuccessIcon"}
                      alt="some value"
                    />
                    One uppercase character
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      newPasswordValid.lengthError
                        ? "pass_set wrong_pass"
                        : "pass_set SuccessIcon"
                    }
                  >
                    <img
                      src={SuccessIcon}
                      className={"SuccessIcon"}
                      alt="some value"
                    />
                    8 characters minimum
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={
                      newPasswordValid.matchPassword
                        ? "pass_set wrong_pass"
                        : "pass_set SuccessIcon"
                    }
                  >
                    <img
                      src={SuccessIcon}
                      className={"SuccessIcon"}
                      alt="some value"
                    />
                    Passwords match
                  </div>
                </Grid>
              </Grid>

              <Box
                textAlign={"right"}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TransparentButton
                  className="transparentbutton"
                  text={strings.Back}
                  width={"113px"}
                  onClick={() => props.handleBack()}
                  disabled={loading}
                />
                {!Object.values(newPasswordValid).some(
                  (item) => item === true
                ) &&
                  !businessNameError &&
                  !firstNameError &&
                  !lastNameError &&
                  !emailError &&
                  !businessAddress1Error &&
                  !cityError &&
                  !provinceError &&
                  !countryError &&
                  !postalCodeError &&
                  !businessPhoneNumberError &&
                  !industryError &&
                  !company_logoError &&
                  !loading ? (
                  <SecondaryButton
                    onClick={routeChange}
                    className="primarybutton"
                    text={strings.Continue}
                    width={"180px"}
                    height={"56px"}
                    margin={"0px 0 0px 0"}
                  />
                ) : (
                  <NeutralLightButton
                    onClick={routeChange}
                    loading={loading}
                    className={loading ? "lightbuttonLoader" : "primarybutton"}
                    text={strings.Continue}
                    width={"180px"}
                    height={"56px"}
                    margin={"0px 0 0px 0"}
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
                text={strings.Uploadyourcompanylogo}
                color={Colors.black}
                margin={"45px 0 0px 0"}
              />
              <Body
                text={
                  strings.Uploadingyourofficialcompanylogo_accountDetailPages
                }
                width={"auto"}
                color={Colors.gray74}
                margin={"8px 0 4px 0"}
              />
            </Box>
          </Grid>
        </Grid>
        {confirmationOpen && (
          <Popup
            popupIsOpen={confirmationOpen}
            style={POPUP_TYPE.CONFIRMATION}
            type={confirmationType}
            closePopup={() => setConfirmationOpen(false)}
          />
        )}
      </Container>
    </div>
  );
}
export default AccountDetail;
