import React, { useState, useEffect } from "react";
import * as Colors from "../../Styles-Elements/Colors";
import {
  Heading3Bold,
  Heading6Medium,
  InputLabel,
} from "../../Styles-Elements/Labels";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import images
import Crose_Icon from "../../image-assets/structure/crose-icon.svg";
import UploadedImg from "../../image-assets/product/h-product-logo1.png";
import UploadedIcon from "../../image-assets/product/upload-icon.png";

import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";
import { ACTIONS } from "../../store/actions";
// import pages-component
import AccountSettingAddresh from "../../pages/account-setting/AccountSettingAddresh";
import AccountSettingEmail from "../../pages/account-setting/AccountSettingEmail";
import AccountSettingPhoneNumber from "../../pages/account-setting/AccountSettingPhoneNumber";
import AccountSettingIndustry from "../../pages/account-setting/AccountSettingIndustry";
import AccountSettingPassword from "../../pages/account-setting/AccountSettingPassword";
import Sidebar from "../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../Styles-Elements/Heading/Header";
import axios from "../../api/axios";
import { imageBase } from "../../api/axios";
import jwt from "jwt-decode";
import "./AccountSetting.scss";
import { useDispatch, useSelector } from "react-redux";

//refreshToken
import { refreshToken } from "../../Helpers/refreshSession";

// Importing localised strings
const strings = require("../../localisation_en.json");

function AccountSetting(props) {
  const dispatch = useDispatch();
  const [allfields, setAllFields] = useState(null);
  const [company_logo, setCompany_logo] = useState(null);
  //const [provinceData, setProvinceData] = useState([]);
  //const [industryData, setIndustryData] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState(false);
  const [newLogo, setNewLogo] = useState("");
  const [init, setInit] = useState(true);

  const [previewModal, setPreviewModal] = useState({
    imageData: null,
    path: "",
  });

  const user = useSelector((state) => state.userData.data);
  const provinceData = useSelector((state) => state.provinceData.data);
  const industryData = useSelector((state) => state.industryData.data);
  //const user = useSelector(state => state.appData.user);
  //console.log(provinceData, industryData);

  useEffect(() => {
    if (user !== undefined) {
      setCompany_logo(user.company_logo);
      setAllFields(user);
    } else {
      refreshToken();
    }

    getProvienceData();
    getIndustriesData();
  }, [user]);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  const handleImgUpload = (e) => {
    setNewLogo(e.target.files[0]);
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

  const changeEmail = (params) => {
    axios
      .post("/api/change-email", params, config)
      .then((res) => {
        console.log("success");
        console.log('change-email-res',res);

        if (res.status === 201 && res.data.ack === 1) {
          refreshToken();
          setEmailConfirmation(false);
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: "Email verified sucessfully",
          });
        } else if (res.data.ack === 0) {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg,
          });
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const changePassword = (params) => {
    axios
      .post("/api/change-password", params, config)
      .then((res) => {
        console.log("success");
        console.log(res);

        if (res.data.ack === 1) {
          refreshToken();
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: "Password changed successfully",
          });
        } else if (res.data.ack === 0) {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg,
          });
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const getIndustriesData = () => {
    axios
      .get("/api/industry")
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_ALL_INDUSTRY_DATA,
          payload: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  };

  const getProvienceData = () => {
    axios
      .get("/api/province")
      .then((res) => {
        if (res.data.ack === 1) {
          dispatch({
            type: ACTIONS.GET_ALL_PROVINCE_DATA,
            payload: res.data.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const getUpdateData = (requestBody) => {
    axios
      .post("api/business-profile-update", requestBody, config)
      .then((res) => {
        console.log("success");
        console.log(res);

        if (res.status === 201 && res.data.ack === 1) {
          //localStorage.setItem("user", JSON.stringify());
          refreshToken();
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: res.data.msg,
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
  };

  const getFormData = (object, data, type) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    if (type === "image_update") {
      formData.set("company_logo", data);
    }
    return formData;
  };

  const onUpdate = (data, type) => {
    console.log(data, type);
    let updatedObj = {};
    if (type === "image_update") {
      updatedObj = { ...allfields };
    } else {
      updatedObj = { ...allfields, ...data };
    }

    let form_data = getFormData(updatedObj, data, type);

    console.log(JSON.stringify(form_data));

    if (form_data) {
      getUpdateData(form_data);
    }
  };

  const handleUpload = () => {
    onUpdate(newLogo, "image_update");
  };

  const camalize = (str) => {
    let camalizeStr = str
      ? str
          .split(" ")
          .map(function (word, index) {
            // If it is the first word make sure to lowercase all the chars.
            // if (index == 0) {
            //   return word.toLowerCase();
            // }
            // If it is not the first word only upper case the first char and lowercase the rest.
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          })
          .join("")
      : str;
    console.log(camalizeStr);
    return camalizeStr;
  };

  return (
    <div div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className="AccountSetting-holder">
          <Heading3Bold
            text={strings.AccountSettings}
            color={Colors.black}
            className={"heading3bold"}
          />
          <Box className="accountBox">
            <Grid className={"account-flex-row"} marginBottom={"40px"}>
              <div className={"left-heading"}>
                <Heading6Medium
                  text={strings.Logo}
                  fontWeight={"700"}
                  color={Colors.nightGray}
                  className={"heading6medium"}
                />
              </div>
              <div className={"upload-box"}>
                {(company_logo || previewModal.imageData) && (
                  <img
                    src={Crose_Icon}
                    className={"crose-icon"}
                    alt="some value"
                    onClick={() => {
                      setCompany_logo(null);
                      setPreviewModal({
                        imageData: null,
                        path: "",
                      });
                    }}
                  />
                )}
                <img
                  src={
                    previewModal.imageData
                      ? previewModal.imageData
                      : company_logo
                      ? `${imageBase}${company_logo}`
                      : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                  }
                  className={"upload-img"}
                  alt="Company Logo"
                />
                {/*<img src={UploadedIcon} className={'upload-icon'} alt='some value' />*/}
              </div>
              <div
                className={"upload-btn"}
                style={{ display: "flex", cursor: "pointer" }}
              >
                {previewModal.imageData && (
                  <div
                    className={"upload-btn"}
                    style={{ marginRight: "20px" }}
                    onClick={handleUpload}
                  >
                    Update
                  </div>
                )}
                <div className={"upload-btn"}>
                  Upload
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => {
                      handleImgUpload(e);
                    }}
                  />
                </div>
              </div>
            </Grid>

            <Grid className={"account-flex-row"} marginBottom={"40px"}>
              <div className={"left-heading"}>
                <Heading6Medium
                  text={strings.BusinessName}
                  fontWeight={"700"}
                  color={Colors.nightGray}
                  className={"heading6medium"}
                />
              </div>
              <p className={"value-text"}>
                {allfields && allfields.business_name}
              </p>
            </Grid>

            <Grid className={"account-flex-row"} marginBottom={"40px"}>
              <div className={"left-heading"}>
                <Heading6Medium
                  text={strings.OwnerName}
                  fontWeight={"700"}
                  color={Colors.nightGray}
                />
              </div>
              {console.log(allfields)}
              <p className={"value-text"}>
                {allfields &&
                  (allfields.owner_name !== "" &&
                  allfields.owner_name !== null &&
                  allfields.owner_name !== "null"
                    ? allfields.owner_name
                    : allfields.first_name &&
                      allfields.last_name &&
                      allfields.first_name !== "null" &&
                      allfields.last_name !== "null"
                    ? `${camalize(allfields.first_name)} ${camalize(
                        allfields.last_name
                      )}
                       `
                    : "")}
              </p>
            </Grid>

            <AccountSettingAddresh
              fileds={user}
              provinceData={provinceData}
              onUpdatefn={onUpdate}
            />

            <AccountSettingEmail
              fileds={user}
              onUpdatefn={onUpdate}
              changeEmail={changeEmail}
              setEmailConfirmation={setEmailConfirmation}
              emailConfirmation={emailConfirmation}
            />

            <AccountSettingPhoneNumber fileds={user} onUpdatefn={onUpdate} />

            <AccountSettingIndustry
              fileds={user}
              industryData={industryData}
              onUpdatefn={onUpdate}
            />

            <AccountSettingPassword
              fileds={user}
              onUpdatefn={onUpdate}
              changePassword={changePassword}
            />
          </Box>
        </div>
      </div>
      {confirmationOpen && (
        <Popup
          popupIsOpen={confirmationOpen}
          style={POPUP_TYPE.CONFIRMATION}
          type={confirmationType}
          closePopup={() => setConfirmationOpen(false)}
        />
      )}
    </div>
  );
}

export default AccountSetting;
