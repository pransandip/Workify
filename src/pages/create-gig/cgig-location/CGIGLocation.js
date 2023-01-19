import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Body,
  Heading4Medium,
  Heading6Medium,
  InputLabel,
  Error,
} from "../../../Styles-Elements/Labels";
import { Textfield } from "../../../Styles-Elements/Inputs";
import {
  PrimaryButton,
  TransparentButton,
  TertiaryButton,
  SecondaryButton,
} from "../../../Styles-Elements/Buttons";
import * as Colors from "../../../Styles-Elements/Colors";

import Popup from "../../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../../Helpers/Enums";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Radio } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { FormControlLabel, Checkbox } from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import GoogleApiWrapper from "./LocationMarker";
import axios from "../../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../store/actions/index";

// import images
import mapImg from "../../../image-assets/product/mapImg.png";
import CroseImg from "../../../image-assets/structure/crose-icon-gray.svg";

import "./CGIGLocation.scss";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function CGIGLocation(props) {
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  let gig_data = useSelector((state) => state.gigData);
  let user_location_data = useSelector((state) => state.locationData.location);

  const [province, setProvince] = React.useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [provinceData, setProvinceData] = React.useState(null);
  const [removeLocationopen, setOpenModal] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    gig_data.location_id
      ? user_location_data.findIndex(
          (item) => item.id.toString() === gig_data.location_id.toString()
        ) > -1
        ? user_location_data.find(
            (item) => item.id.toString() === gig_data.location_id.toString()
          )
        : ""
      : gig_data.location_data
  );
  const [site, setSite] = useState("");
  const [addressFieldGig, setAddressFieldGig] = useState("");
  const [gigLocationInfo, setGigLocationInfo] = useState(user_location_data);
  const [recentRemoveValue, setRecentRemoveValue] = useState("");
  const [businessAddress2, setBusinessAddress2] = useState("");
  const [siteError, setSiteError] = useState(false);
  const [address1Error, setAddress1Error] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [locationSelectionError, setLocationSelectionError] = useState(false);
  const [transit, setTransit] = useState(
    gig_data.transit !== "" ? gig_data.transit.split(",") : []
  );

  const user = useSelector((state) => state.userData.data);
  const localUser = localStorage.getItem("user");

  let user_id = user ? user.id : JSON.parse(localUser).id;

  const getProvienceData = () => {
    axios
      .get("/api/province")
      .then((res) => {
        if (res.data.ack === 1) {
          setProvinceData(res.data.data);
          dispatch({
            type: ACTIONS.GET_ALL_PROVINCE_DATA,
            payload: res.data.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const AddNewLocation = (gigLocationObj) => {
    const params = new URLSearchParams();
    params.append("location_name", gigLocationObj.location_name);
    params.append("province", gigLocationObj.province);
    params.append("address1", gigLocationObj.address1);
    params.append("address2", gigLocationObj.businessAddress2);
    params.append("latitude", gigLocationObj.latitude);
    params.append("longitude", gigLocationObj.longitude);

    axios
      .post(`api/location`, params, config)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setOpen(!open);
          getLocation();
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: `Location Successfully added`,
          });
        } else {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  const deleteLocation = (location) => {
    axios
      .delete(`api/location/${location.id}`, config)
      .then((res) => {
        console.log(res);
        if (res.data.ack === 1) {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: `Location Successfully deleted`,
          });
          getLocation();
        } else {
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  //console.log(user);
  const getLocation = () => {
    axios
      .get(`api/users/location/${user_id}`, config)
      .then((res) => {
        setGigLocationInfo(res.data.data);
        dispatch({
          type: ACTIONS.GET_ALL_LOCATION,
          payload: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProvienceData();
    if (user_location_data.length <= 0) {
      getLocation();
    }
  }, []);

  const handleChangeMenu = (event) => {
    setProvince(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const removeLocationClickOpen = (value) => {
    setRecentRemoveValue(value);
    setOpenModal(true);
  };

  const goNext = (click) => {
    // if (selectedValue !== "") {
    let payloadObj = {
      location_id: selectedValue.id,
      location_data: selectedValue,
      transit: transit.join(","),
    };
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
    // } else {
    //   setLocationSelectionError(true);
    // }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (event, item) => {
    setSelectedValue(JSON.parse(event.target.value));
    setLocationSelectionError(false);
  };

  const controlProps = (item) => ({
    checked:
      selectedValue && selectedValue.id.toString() === item.id.toString(),
    onChange: handleChange,
    value: JSON.stringify(item),
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  // const updatelocationGig = (updatedobj) => {
  //   var arr2 = [];
  //   let newLocationObj = {
  //     ...updatedobj,

  //   };
  //   arr2.push({ ...updatedobj });
  //   setAddressFieldGig(arr2);
  // };

  const handlePlaceSelection = (place) => {
    setAddress1Error(false);

    let updatedobj = {
      address1: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
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
    setAddressFieldGig(updatedobj);
  };

  const addnewLocation = () => {
    if (site !== "" && addressFieldGig !== "" && province !== "") {
      var arr3 = [...gigLocationInfo];
      // console.log(arr3)
      var gigLocationObj = {
        ...addressFieldGig,
        location_name: site,
        businessaddress2: businessAddress2,
        province: province,
      };
      // let newObj = {
      //   ...gigLocationInfo,
      // };
      // arr3.push(gigLocationObj);
      // setGigLocationInfo(arr3);
      AddNewLocation(gigLocationObj);
    } else {
      if (site === "") {
        setSiteError(true);
      }
      if (addressFieldGig === "") {
        setAddress1Error(true);
      }
      if (province === "") {
        setProvinceError(true);
      }
    }
  };

  const removeLocFromArr = () => {
    gigLocationInfo.filter((items) => items.site === recentRemoveValue);
    deleteLocation(recentRemoveValue);
    setOpenModal(false);
  };

  const selectedValue2 = {
    position: "absolute",
    width: "600px",
    height: "300px",
  };

  const selectedValue3 = {
    position: "absolute",
    width: "600px",
    height: "300px",
  };

  return (
    <div className="page-background">
      <div className="cgig-overview-main-holder">
        <Heading4Medium
          className={"heading4medium"}
          fontWeight={"700"}
          text={strings.location}
          color={Colors.black}
          margin={"0 0 12px 0"}
        />
        <div className="overview-box">
          <Body
            className={"body"}
            text={strings.pleaseProvideLocationAndTransitDetails}
            color={Colors.midGray}
            margin={"0 0 20px 0"}
          />
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <div className={"table-type-parent"}>
                <div className={"table-type-head"}>
                  <p className={"table-heading"}>Location Name</p>
                  <p className={"table-heading"}>Address</p>
                  <p className={"table-heading"}></p>
                </div>

                {gigLocationInfo &&
                  gigLocationInfo.length > 0 &&
                  gigLocationInfo.map((items) => {
                    return (
                      <div className={"table-type-body"}>
                        <p className={"table-text"}>
                          <Radio
                            //value={items.id}
                            {...controlProps(items)}
                            //onClick={() => setRecentRemoveValue(items.id)}
                            //size="small"
                            //id={items.id}
                          />
                          {items.location_name}
                        </p>
                        <p className={"table-text"}>
                          {items.address1.substring(0, 20) + " ..."}
                        </p>
                        <p className={"table-text"}>
                          <Link
                            className="removeText"
                            onClick={() => removeLocationClickOpen(items)}
                          >
                            Remove
                          </Link>
                        </p>
                      </div>
                    );
                  })}
                {/* <div className={'table-type-body'}>
                  <p className={'table-text'}><Radio {...controlProps('b')} size="small" />Site 1</p>
                  <p className={'table-text'}>5 Surrey Ave, Vancouver, V11 0BA</p>
                  <p className={'table-text'}><Link className="removeText" onClick={removeLocationClickOpen} >Remove</Link></p>
                </div>
                <div className={'table-type-body'}>
                  <p className={'table-text'}><Radio {...controlProps('c')} size="small" />Main Office</p>
                  <p className={'table-text'}>5 Surrey Ave, Vancouver, V11 0BA</p>
                  <p className={'table-text'}><Link className="removeText" onClick={removeLocationClickOpen} >Remove</Link></p>
                </div> */}
              </div>
              <TertiaryButton
                text={strings.Addanewaddress}
                className={"outline-btn"}
                onClick={handleClick}
                width="160px"
              />

              <Collapse in={open} timeout="auto" unmountOnExit>
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={6}>
                    <div className="grid-item">
                      <InputLabel
                        text={strings.LocationName}
                        color={Colors.nightGray}
                        padding={"0 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <Textfield
                        placeholder={strings.Pleaseenteryourlocationnickname}
                        className="textfield"
                        onChange={(e) => {
                          setSite(e.target.value);
                          setSiteError(false);
                        }}
                      />
                      {siteError && (
                        <Error
                          className="inputerror"
                          text={"Location Name is required"}
                          color={Colors.error}
                          margin={"4px 0 8px 0"}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="grid-item">
                      <InputLabel
                        text={strings.Province}
                        color={Colors.nightGray}
                        padding={"0 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <TextField
                        className="textfield"
                        select
                        value={province}
                        onChange={handleChangeMenu}
                        placeholder={strings.Selectaprovince}
                      >
                        {provinceData &&
                          provinceData.map((option) => (
                            <MenuItem
                              key={option.id}
                              value={option.id}
                              onChange={() => {
                                setProvince(option.id);
                                setProvinceError(false);
                              }}
                            >
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
                  <Grid item xs={12} sm={6}>
                    <div className="grid-item">
                      <InputLabel
                        text={strings.BusinessAddress1}
                        color={Colors.nightGray}
                        padding={"0 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <Autocomplete
                        apiKey="AIzaSyCvp1OcXRtcgYbd7WnzMh-SPGzFbLlFOts"
                        className="textfield"
                        placeholder={strings.Enteryourbusinessstreetaddress}
                        style={{
                          width: "93%",
                          border: "1px solid #EBF7F9",
                          borderRadius: "4px",
                          backgroundColor: "#EBF7F9",
                          paddingLeft: "15px",
                        }}
                        options={{
                          types: ["geocode"],
                          //componentRestrictions: { country: "ru" },
                        }}
                        onPlaceSelected={(place) => {
                          handlePlaceSelection(place);
                        }}
                      />
                      {address1Error && (
                        <Error
                          className="inputerror"
                          text={"Business Address1 is required"}
                          color={Colors.error}
                          margin={"4px 0 8px 0"}
                        />
                      )}
                      {/* <Textfield placeholder={strings.Enteryourbusinessstreetaddress} className="textfield" /> */}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="grid-item">
                      <InputLabel
                        text={strings.BusinessAddress2}
                        color={Colors.nightGray}
                        padding={"0 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <Textfield
                        placeholder={
                          strings.Enteryourapartmentsuiteunitnumberetc
                        }
                        value={businessAddress2}
                        onChange={(e) => setBusinessAddress2(e.target.value)}
                        className="textfield"
                      />
                    </div>
                  </Grid>
                </Grid>
                <TertiaryButton
                  text={strings.AddNewLocation}
                  className={"height48"}
                  width="160px"
                  onClick={addnewLocation}
                />
              </Collapse>
              <div style={{ height: "250px" }}>
                <GoogleApiWrapper
                  selectedAddress={selectedValue}
                  selectedMapStyles={selectedValue2}
                  selectedContainerStyle={selectedValue3}
                />
              </div>
            </Grid>

            <Grid item xs={12} style={{ marginTop: "50px" }}>
              <Heading6Medium
                className={"heading6medium"}
                text={strings.TransitOptions}
              />
            </Grid>
            <Grid
              item
              xs={12}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              flexWrap="wrap"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value="Free parking nearby"
                    checked={
                      transit.length > 0
                        ? transit.findIndex(
                            (item) => item === "Free parking nearby"
                          ) > -1
                        : false
                    }
                    onClick={(e) => {
                      if (e.target.checked === true) {
                        let arr = [...transit];
                        arr.push(e.target.value);
                        var filteredArr = arr.filter(
                          (value) => value !== "No parking available nearby"
                        );

                        setTransit(filteredArr);
                      } else {
                        let arr = [...transit];
                        var filtered = arr.filter(
                          (value) =>
                            value.toLowerCase() !== e.target.value.toLowerCase()
                        );

                        setTransit(filtered);
                      }
                    }}
                    size="small"
                  />
                }
                label="Free parking nearby"
                className="check50width"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Transit options are nearby"
                    checked={
                      transit.length > 0
                        ? transit.findIndex(
                            (item) => item === "Transit options are nearby"
                          ) > -1
                        : false
                    }
                    onClick={(e) => {
                      if (e.target.checked === true) {
                        let arr = [...transit];
                        arr.push(e.target.value);
                        var filteredArr = arr.filter(
                          (value) =>
                            value !== "There are no transit options nearby"
                        );

                        setTransit(filteredArr);
                      } else {
                        let arr = [...transit];
                        var filtered = arr.filter(
                          (value) =>
                            value.toLowerCase() !== e.target.value.toLowerCase()
                        );
                        setTransit(filtered);
                      }
                    }}
                    size="small"
                  />
                }
                label="Transit options are nearby"
                className="check50width"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Paid parking nearby"
                    checked={
                      transit.length > 0
                        ? transit.findIndex(
                            (item) => item === "Paid parking nearby"
                          ) > -1
                        : false
                    }
                    onClick={(e) => {
                      if (e.target.checked === true) {
                        let arr = [...transit];
                        arr.push(e.target.value);
                        var filteredArr = arr.filter(
                          (value) => value !== "No parking available nearby"
                        );

                        setTransit(filteredArr);
                      } else {
                        let arr = [...transit];
                        var filtered = arr.filter(
                          (value) =>
                            value.toLowerCase() !== e.target.value.toLowerCase()
                        );
                        setTransit(filtered);
                      }
                    }}
                    size="small"
                  />
                }
                label="Paid parking nearby"
                className="check50width"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Transit options are only a walk away"
                    checked={
                      transit.length > 0
                        ? transit.findIndex(
                            (item) =>
                              item === "Transit options are only a walk away"
                          ) > -1
                        : false
                    }
                    onClick={(e) => {
                      if (e.target.checked === true) {
                        let arr = [...transit];
                        arr.push(e.target.value);
                        var filteredArr = arr.filter(
                          (value) =>
                            value !== "There are no transit options nearby"
                        );

                        setTransit(filteredArr);
                      } else {
                        let arr = [...transit];
                        var filtered = arr.filter(
                          (value) =>
                            value.toLowerCase() !== e.target.value.toLowerCase()
                        );
                        setTransit(filtered);
                      }
                    }}
                    size="small"
                  />
                }
                label="Transit options are only a walk away"
                className="check50width"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="No parking available nearby"
                    checked={
                      transit.length > 0
                        ? transit.findIndex(
                            (item) => item === "No parking available nearby"
                          ) > -1
                        : false
                    }
                    onClick={(e) => {
                      if (e.target.checked === true) {
                        let arr = [...transit];
                        arr.push(e.target.value);
                        var filteredArr = arr.filter(
                          (value) =>
                            value !== "Paid parking nearby" &&
                            value !== "Free parking nearby"
                        );

                        setTransit(filteredArr);
                      } else {
                        let arr = [...transit];
                        var filtered = arr.filter(
                          (value) =>
                            value.toLowerCase() !== e.target.value.toLowerCase()
                        );
                        setTransit(filtered);
                      }
                    }}
                    size="small"
                  />
                }
                label="No parking available nearby"
                className="check50width"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="There are no transit options nearby"
                    checked={
                      transit.length > 0
                        ? transit.findIndex(
                            (item) =>
                              item === "There are no transit options nearby"
                          ) > -1
                        : false
                    }
                    onClick={(e) => {
                      if (e.target.checked === true) {
                        let arr = [...transit];
                        arr.push(e.target.value);
                        //"Transit options are nearby"
                        //"Transit options are only a walk away"
                        var filteredArr = arr.filter(
                          (value) =>
                            value !== "Transit options are nearby" &&
                            value !== "Transit options are only a walk away"
                        );
                        setTransit(filteredArr);
                      } else {
                        let arr = [...transit];
                        var filtered = arr.filter(
                          (value) =>
                            value.toLowerCase() !== e.target.value.toLowerCase()
                        );
                        setTransit(filtered);
                      }
                    }}
                    size="small"
                  />
                }
                label="There are no transit options nearby"
                className="check50width"
              />
            </Grid>

            {locationSelectionError && (
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                flexWrap="wrap"
              >
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  Please select a location!
                </span>
              </Grid>
            )}

            <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
              <TransparentButton
                className="transparentbutton"
                text={strings.Back}
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
        {confirmationOpen && (
          <Popup
            popupIsOpen={confirmationOpen}
            style={POPUP_TYPE.CONFIRMATION}
            type={confirmationType}
            closePopup={() => setConfirmationOpen(false)}
          />
        )}
      </div>
      <Dialog
        open={removeLocationopen}
        onClose={handleClose}
        className={"modalwidth548"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {strings.RemoveLocation}
          <Button className="modal-crose" onClick={handleClose}>
            <img src={CroseImg} alt="name" />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this location?
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
            onClick={removeLocFromArr}
          />
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CGIGLocation;
