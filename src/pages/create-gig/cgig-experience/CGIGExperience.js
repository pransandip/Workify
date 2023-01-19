import * as React from "react";
import { useEffect } from "react";
import {
  Heading6Medium,
  Body,
  Heading4Medium,
  InputLabel,
  LabelWrapper,
  Small,
  Error,
} from "../../../Styles-Elements/Labels";
import {
  PrimaryButton,
  TertiaryButton,
  TransparentButton,
  SecondaryButton,
} from "../../../Styles-Elements/Buttons";
import * as Colors from "../../../Styles-Elements/Colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../store/actions/index";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
// import images
import CroseImg from "../../../image-assets/structure/crose-icon-gray.svg";
import alertCloseIcon from "../../../image-assets/structure/alertclose.svg";

import "./CGIGExperience.scss";

// import pages-component
import axios from "../../../api/axios";
import { set } from "date-fns";

// Importing localised strings
const strings = require("../../../localisation_en.json");

const CertificateLicense = [
  { label: "Serving" },
  { label: "Serving it Right" },
];

function CGIGExperience(props) {
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const getLicenseData = () => {
    axios
      .get("/api/certificate_and_licence", config)
      .then((res) => {
        setLicenseData(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  let gig_data = useSelector((state) => state.gigData);

  useEffect(() => {
    if (licenseDataAdd) {
      getLicenseData();
    }
  }, []);

  const [removeCertificateopen, setOpen] = React.useState(false);
  const [licenseData, setLicenseData] = React.useState([]);
  const [licenseDataError, setLicenseDataError] = React.useState(false);
  const [selectedLicense, setSelectedLicense] = React.useState("");
  const [licenseDataAdd, setLicenseDataAdd] = React.useState(
    gig_data.experience
      ? gig_data.experience
      : gig_data.certificate_and_licence_data
  );
  const [checkedIcon, setCheckedIcon] = React.useState(false);
  const [selectedLicenseDelete, setSelectedLicenseDelete] =
    React.useState(null);

  const removeCertificateClickOpen = (e, data) => {
    setOpen(true);
    setSelectedLicenseDelete(data);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLicenseDelete(null);
  };

  const goNext = (click) => {
    //console.log(licenseData, licenseDataAdd);
    let payloadObj = {
      certificate_and_licence: JSON.stringify(
        licenseDataAdd.map((item) => {
          return {
            id: item.certificate_and_licence_id
              ? item.certificate_and_licence_id
              : item.id,
            required: item.required ? 1 : 0,
          };
        })
      ),
      certificate_and_licence_data: licenseDataAdd,
    };

    console.log(payloadObj);
    dispatch({
      type: ACTIONS.UPDATE_GIG_DATA,
      payload: payloadObj,
    });

    if (click === "save_exit") {
      console.log("click");
      props.setLoading(true);
      //debounce(() => {
      setTimeout(() => {
        let newObj = {
          ...gig_data,
          ...payloadObj,
        };
        props.handleSave(newObj);
      }, 2000);

      //}, 2000);
    } else {
      props.handleNext();
    }
  };

  const handleAddLicense = () => {
    if (selectedLicense !== "") {
      let arr = [...licenseDataAdd];
      arr.push({ ...selectedLicense, required: checkedIcon });
      const ids = arr.map((o) => o.id);
      const filteredArr = arr.filter(
        ({ id }, index) => !ids.includes(id, index + 1)
      );

      setLicenseDataAdd([...filteredArr]);
    }
    setLicenseDataError(false);
  };

  const handleDelete = () => {
    let arr = [...licenseDataAdd];
    //console.log(arr);
    //console.log(selectedLicenseDelete);
    arr = arr.filter(
      (item) => item.id.toString() !== selectedLicenseDelete.id.toString()
    );
    setLicenseDataAdd([...arr]);
    setOpen(false);
  };

  return (
    <div className="page-background">
      <div className="cgig-overview-main-holder">
        <LabelWrapper>
          <Heading4Medium
            className={"heading4medium"}
            fontWeight={"700"}
            text={strings.experience}
            color={Colors.black}
            margin={"0 0 12px 0"}
          />
          <Heading6Medium
            className={"heading6medium"}
            text={strings.optional}
            color={Colors.black}
            margin={"0 0 12px 8px"}
          />
        </LabelWrapper>

        <div className="overview-box">
          <Body
            text={strings.inOrderToMatchYouWith}
            color={Colors.midGray}
            margin={"0 0 0px 0"}
          />
          <LabelWrapper margin={"0 0 16px 0"}>
            <Body
              className={"body"}
              text={strings.PleaseMakeSureThatYou}
              color={Colors.midGray}
              margin={"0 0 0px 0"}
            />
            <Body
              className={"body"}
              fontWeight={"500"}
              text={strings.addThisCertificateLicense}
              color={Colors.midGray}
              margin={"0 0 0px 4px"}
            />
            <Body
              className={"body"}
              text={strings.toSaveEach}
              color={Colors.midGray}
              margin={"0 0 0px 4px"}
            />
            <Body
              className={"body"}
              text={strings.CertificateLicense}
              color={Colors.midGray}
              margin={"0 0 0px 4px"}
            />
          </LabelWrapper>
          <InputLabel
            text={strings.CertificateLicense}
            color={Colors.nightGray}
            padding={"0px 0 8px 0"}
            className={"inputlabel"}
          />
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={8}>
              <div className="grid-item">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={licenseData}
                  getOptionLabel={(option) => option.name || ""}
                  renderInput={(params) => (
                    <TextField
                      className={
                        licenseDataError ? "input-error textfield" : "textfield"
                      }
                      placeholder={
                        strings.pleaseTypeTheNameOfTheCertificateOrLicense
                      }
                      {...params}
                    />
                  )}
                  onChange={(e, data) => {
                    if (data) {
                      setSelectedLicense(data);
                    }
                  }}
                />
                {licenseDataError && (
                  <Error
                    className="inputerror"
                    text={"At least one Certificate / License is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="grid-item">
                <TertiaryButton
                  className="tertiarybutton"
                  value={licenseData}
                  text={strings.add}
                  width={"113px"}
                  onClick={(e) => {
                    handleAddLicense();
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="grid-item">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={checkedIcon}
                      onChange={(e) => setCheckedIcon(e.target.checked)}
                    />
                  }
                  label="The worker is required to have this certificate/license"
                />
              </div>
            </Grid>
            {console.log(licenseDataAdd, licenseData)}
            {licenseDataAdd.length > 0 &&
              licenseDataAdd.map((items) => {
                return (
                  <Grid item xs={12} sm={9}>
                    <div className="blue-alerttype-box">
                      <LabelWrapper margin={"0 0 0px 0"}>
                        <Body
                          className={"body"}
                          fontWeight={"500"}
                          textDecoration={"underline"}
                          text={
                            items.name
                              ? items.name
                              : licenseData.length > 0 &&
                                licenseData.find(
                                  (item) =>
                                    item.id.toString() ===
                                    items.certificate_and_licence_id.toString()
                                ) &&
                                licenseData.find(
                                  (item) =>
                                    item.id.toString() ===
                                    items.certificate_and_licence_id.toString()
                                ).name
                          }
                          color={Colors.white}
                          margin={"0 0 0px 4px"}
                        />

                        {items.required !== 0 && items.required !== false && (
                          <Small
                            className={"small"}
                            text={strings.required}
                            color={Colors.white}
                            margin={"0 0 0px 4px"}
                          />
                        )}
                      </LabelWrapper>
                      <div>
                        <img
                          src={alertCloseIcon}
                          alt="name"
                          className="alertcloseicon"
                          onClick={(e) => removeCertificateClickOpen(e, items)}
                        />
                      </div>
                    </div>
                    {/*<LabelWrapper margin={'8px 0 16px 0'}>
                     <Small text={strings.thereAreCurrentlyNoRecommended} color={Colors.error} margin={'0 0 0px 0'}  />
                     <Small text={strings.requirementsOr} color={Colors.error} margin={'0 0 0px 0px'}  />
                     <Small fontWeight={'500'} text={strings.Continue} color={Colors.error} margin={'0 0 0px 4px'}  />
                     <Small text={strings.toCreateThisGig} color={Colors.error} margin={'0 0 0px 4px'}  />
                   </LabelWrapper>*/}
                  </Grid>
                );
              })}

            <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
              <TransparentButton
                className="transparentbutton"
                text={strings.Back}
                textAlign={"center"}
                width={"113px"}
                onClick={() => props.handleBack()}
              />
              {props.type === "Edit" && (
                <SecondaryButton
                  className={
                    props.loading ? "lightbuttonLoader" : "secondarybutton"
                  }
                  loading={props.loading}
                  text={"Save & Exit"}
                  width={"130px"}
                  margin={"0px 16px 0px 0px"}
                  onClick={() => goNext("save_exit")}
                />
              )}
              <PrimaryButton
                className="neutrallightbutton"
                text={strings.Continue}
                width={"113px"}
                onClick={goNext}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <Dialog
        open={removeCertificateopen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {strings.RemoveCertificate_License}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this Certificate/License?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TransparentButton
            className="transparentbutton"
            onClick={handleClose}
            text={strings.No}
            width={"auto"}
          />
          <PrimaryButton
            className="primarybutton"
            autoFocus
            text={strings.Yes}
            width={"210px"}
            onClick={handleDelete}
          />
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CGIGExperience;
