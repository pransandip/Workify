import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as Colors from "../../Styles-Elements/Colors";
import { Heading3Bold, Error } from "../../Styles-Elements/Labels";
import {
  PrimaryButton,
  TransparentButton,
} from "../../Styles-Elements/Buttons";
import { Textfield } from "../../Styles-Elements/Inputs";
import { InputLabel } from "../../Styles-Elements/Labels";
import PhoneInput from "react-phone-input-2";
import Pagination from "../../Styles-Elements/pagination/Pagination";
// import images
import CroseImg from "../../image-assets/structure/crose-icon-gray.svg";
import SuccessIcon from "../../image-assets/structure/success-alert.svg";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";

import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";
import axios from "../../api/axios";

import Sidebar from "../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../Styles-Elements/Heading/Header";

import "./Staff.scss";

const contrycodes = [
  {
    value: "+1",
    label: "+1",
  },
  {
    value: "+91",
    label: "+91",
  },
];
const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "manager",
    label: "Manager",
  },
  {
    value: "supervisor",
    label: "Supervisor",
  },
];

// Importing localised strings
const strings = require("../../localisation_en.json");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

function Staff(props) {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [contry, setContry] = React.useState("+1");
  const [staffData, setStaffData] = React.useState([]);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberError2, setPhoneNumberError2] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const [flag, setFlag] = useState(false);
  const [handleCloseFlag, setHandleCloseFlag] = useState(0);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");

  const [addEditopen, setOpen] = React.useState(false);
  const [deleteStaffopen, deleteOpen] = React.useState(false);
  const [successStaffopen, successOpen] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState(false);

  // let RegexPhoneNumber = /^\(?(\d{3})\)?(\d{3})[- ]?(\d{4})$/;

  const handleChangeContry = (event) => {
    setContry(event.target.value);
    setCountryError(false);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
    setRoleError(false);
  };

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  // const ValidatePhoneNumber = (value) => {
  //   console.log(RegexPhoneNumber.test(value));
  //   if (!RegexPhoneNumber.test(value)) {
  //     setPhoneNumberError(true);
  //     return false;
  //   } else {
  //     setPhoneNumberError(false);
  //     return true;
  //   }
  // };

  const getAllStuff = () => {
    axios
      .get("/api/staff", config)
      .then((res) => {
        setStaffData(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllStuff();
  }, []);

  const addEditClickOpen = (value) => {
    console.log({ value });
    if (value != 1) {
      setUserId(value.id);
      setFlag(true);
      setName(value.business_name);
      setEmail(value.email);
      setRole(value.access);
      setContry(value.country_code);
      setPhoneNumber(value.mobile);
      setOpen(true);
    } else {
      setFlag(false);
      setOpen(true);
      setName("");
      setContry("+1");
      setEmail("");
      setPhoneNumber("");
      setRole("");
    }
  };

  const deleteStaffClickopen = (value) => {
    setUserId(value.id);
    deleteOpen(true);
  };

  const deleteStaff = () => {
    axios
      .delete(`/api/staff/${userId}`, config)
      .then((res) => {
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const resendInvite = (value) => {
    setUserId(value.id);
    setName(value.business_name);
    setEmail(value.email);
    setRole(value.access);

    axios
      .get(`/api/staff/resend_invite/${value.id}`, config)
      .then((res) => {
        successOpen(true);
      })
      .catch((error) => console.log(error));
  };

  const successStaffClickopen = () => {
    if (flag) {
      if (name !== "" && email !== "" && phoneNumber !== "" && role !== "") {
        if (!phoneNumberError2) {
          const params2 = new URLSearchParams();
          params2.append("business_name", name);
          params2.append("email", email);
          params2.append("country_code", contry);
          params2.append("mobile", phoneNumber);
          params2.append("access", role);

          axios
            .put(`/api/staff/${userId}`, params2, config)
            .then((res) => {
              if (res.data.ack === 1) {
                handleClose();
              } else if (res.data.ack === 0) {
                setConfirmationOpen(true);
                setConfirmationType({
                  type: "error",
                  message: res.data.msg,
                });
              }
            })
            .catch((error) => console.log(error));
          setOpen(false);
          handleClose();
        }
      } else {
        if (name === "") {
          setNameError(true);
        }
        if (email === "") {
          setEmailError(true);
        }
        if (contry === "") {
          setCountryError(true);
        }
        if (phoneNumber === "") {
          setPhoneNumberError2(false);
          setPhoneNumberError(true);
        }
        if (role === "") {
          setRoleError(true);
        }
      }
    } else {
      if (name !== "" && email !== "" && phoneNumber !== "" && role !== "") {
        if (!phoneNumberError2) {
          const params = new URLSearchParams();
          params.append("business_name", name);
          params.append("email", email);
          params.append("country_code", contry);
          params.append("mobile", phoneNumber);
          params.append("access", role);
          axios
            .post("/api/staff", params, config)
            .then((res) => {
              if (res.data.ack === 1) {
                //setConfirmationOpensuccessOpen(true);
                //setOpen(false);
                console.log(res.data);
                getAllStuff();
              } else {
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
            })
            .catch((error) => console.log(error));
          //successOpen(true);
          setOpen(false);
        }
      } else {
        // console.log("here");
        if (name === "") {
          setNameError(true);
        }
        if (email === "") {
          setEmailError(true);
        }
        if (contry === "") {
          setCountryError(true);
        }
        if (phoneNumber === "") {
          setPhoneNumberError2(false);
          setPhoneNumberError(true);
        }
        if (role === "") {
          setRoleError(true);
        }
      }
    }
  };

  const handleClose = () => {
    getAllStuff();
    setNameError(false);
    setEmailError(false);
    setCountryError(false);
    setPhoneNumberError(false);
    setRoleError(false);
    setOpen(false);
    deleteOpen(false);
    successOpen(false);
  };

  const changeStuffStatus = (id, status) => {
    // console.log(id, staffData, status);
    let newStaff = staffData.map((item) => {
      let newObj = {};
      if (id.toString() === item.id.toString()) {
        // console.log("found", item);
        newObj = {
          ...item,
          status: status === "active" ? "inactive" : "active",
        };
      } else {
        newObj = {
          ...item,
        };
      }
      // console.log(newObj);
      return newObj;
    });
    setStaffData(newStaff);
  };

  const switchHandleChange = (event, value) => {
    //event.preventDefault();
    var userid = value.id;
    setSelectedUser(value);
    const params3 = new URLSearchParams();
    changeStuffStatus(userid, event.target.value);
    params3.append("status", event.target.checked ? "active" : "inactive");
    axios
      .put(`/api/staff/changestatus/${userid}`, params3, config)
      .then((res) => {
        if (res.data.ack === 0) {
          //getAllStuff();
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: res.data.msg,
          });
          // } else if (res.data.ack === 0) {
          //   setConfirmationOpen(true);
          //   setConfirmationType({
          //     type: "error",
          //     message: res.data.msg,
          //   });
          // handleClose();
        }
      })
      .catch((error) => console.log(error));

    // } else {
    //   console.log(value.id);
    //   var userid = value.id;
    //   const params4 = new URLSearchParams();
    //   params4.append("status", "inactive");
    //   axios
    //     .put(`/api/staff/changestatus/${userid}`, params4, config)
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data.ack === 1) {
    //         setConfirmationOpen(true);
    //         setConfirmationType({
    //           type: "success",
    //           message: res.data.msg,
    //         });

    //         // } else if (res.data.ack === 0) {
    //         //   setConfirmationOpen(true);
    //         //   setConfirmationType({
    //         //     type: "error",
    //         //     message: res.data.msg,
    //         //   });
    //         // handleClose();
    //       }
    //     })
    //     .catch((error) => console.log(error));
    // }
  };

  console.log(name.trim().length === 0);

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      {/* {console.log("called")} */}
      <div className="main-mid-container">
        <div className="staff-holder">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display={"flex"}
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"space-between"}
              margin={"0px 0px 24px 0px"}
            >
              <Heading3Bold
                text={strings.staff}
                color={Colors.black}
                className={"heading3bold"}
              />
              <PrimaryButton
                className="primarybutton"
                width={"155px"}
                text={strings.AddStaff}
                onClick={() => addEditClickOpen(1)}
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} style={{ minHeight: "500px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell align="center">Active / Inactive</TableCell>
                      <TableCell align="center">Invite</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {staffData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.business_name}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.access}</TableCell>
                        <TableCell align="center">
                          {row.status && (
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={row.status === "active"}
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                  name={row.business_name}
                                  value={row.status}
                                  color="primary"
                                  //disableRipple
                                  onChange={(
                                    event //{() => setTest(!test)}
                                  ) => switchHandleChange(event, row)}
                                />
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            className={"edit-color"}
                            onClick={() =>
                              row.status !== "active" && resendInvite(row)
                            }
                          >
                            {row.status === "active"
                              ? "--"
                              : strings.ResendInvite}
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            className={"edit-color"}
                            onClick={() => addEditClickOpen(row)}
                          >
                            {strings.Edit}
                          </Link>{" "}
                          <span className={"cenerLine"}>|</span>{" "}
                          <Link
                            className={"delete-color"}
                            onClick={() => deleteStaffClickopen(row)}
                          >
                            {strings.Delete}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination />
            </Grid>
          </Grid>

          <Dialog
            open={addEditopen}
            onClose={handleClose}
            className={"modalwidth548"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {flag ? strings.EditStaff : strings.AddStaff}
              {/*{strings.EditStaff*/}
              <Button className="modal-crose" onClick={handleClose}>
                <img src={CroseImg} alt="name" />
              </Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {flag
                  ? strings.Editthedetailsofastaffaccount
                  : strings.Inviteastaffmembertoyourorganization}
                {/*  {strings.Editthedetailsofastaffaccount}*/}
              </DialogContentText>
              <div className="grid-item">
                <InputLabel
                  text={strings.Name}
                  color={Colors.nightGray}
                  padding={"0 0 8px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className="textfield"
                  placeholder={""}
                  value={name}
                  onChange={(e) => {
                    if (e.target.value.trim().length === 0) {
                      setName("");
                      return;
                    } else {
                      setName(e.target.value);
                      setNameError(false);
                    }
                  }}
                />
                {/* {console.log(nameError, emailError)} */}
                {nameError && (
                  <Error
                    className="inputerror"
                    text={"Name is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item">
                <InputLabel
                  text={strings.Email}
                  color={Colors.nightGray}
                  padding={"0 0 8px 0"}
                  className={"inputlabel"}
                  style={{ marginTop: "25px" }}
                />
                <Textfield
                  className="textfield"
                  placeholder={""}
                  value={email}
                  onChange={(e) => {
                    if (e.target.value.trim().length === 0) {
                      setEmail("");
                      return;
                    } else {
                      setEmail(e.target.value);
                      setEmailError(false);
                    }
                  }}
                />
                {emailError && (
                  <Error
                    className="inputerror"
                    text={"Email is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
              <div className="grid-item">
                <InputLabel
                  text={strings.PhoneNumber}
                  color={Colors.nightGray}
                  padding={"0 0 8px 0"}
                  className={"inputlabel"}
                  style={{ marginTop: "25px" }}
                />
                <div className={"mobile-parent-div"}>
                  <TextField
                    className="textfield mobile-div"
                    id="outlined-select-currency"
                    select
                    value={contry}
                    onChange={handleChangeContry}
                  >
                    {contrycodes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Textfield
                    className="textfield"
                    placeholder={"(198) 754-1934"}
                    // value={phoneNumber.replace(
                    //   /(\d{3})(\d{3})(\d{4})/,
                    //   "($1) $2-$3"
                    // )}
                    value={phoneNumber}
                    // maxLength={10}
                    type="number"
                    onChange={(e) => {
                      if (e.target.value.length == 11) {
                        return;
                      }
                      if (e.target.value.length < 10) {
                        setPhoneNumberError2(true);
                      } else {
                        setPhoneNumberError2(false);
                      }
                      setPhoneNumber(e.target.value);
                      setPhoneNumberError(false);
                    }}
                  />
                  {/* <PhoneInput specialLabel={""} className="change-value-text" value={phoneNumber} inputStyle={{ width: "94%", border: "1px solid #EBF7F9", borderRadius: "4px", backgroundColor: "#EBF7F9", margin: "0px", minHeight: "20px ", padding: "10px 16px", }} onChange={e => {setPhoneNumber(e.target.value); setPhoneNumberError(false); }} /> */}
                </div>
                {countryError && (
                  <Error
                    className="inputerror"
                    text={"Country is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
                {phoneNumberError && (
                  <Error
                    className="inputerror"
                    text={"please enter valid phone number (*10 digit)"}
                    color={Colors.error}
                    margin={"4px 0 8px 100px"}
                  />
                )}
                {phoneNumberError2 && (
                  <Error
                    className="inputerror"
                    text={"Entered number is less then 10"}
                    color={Colors.error}
                    margin={"4px 0 8px 100px"}
                  />
                )}
              </div>
              <div className="grid-item">
                <InputLabel
                  text={strings.Role}
                  color={Colors.nightGray}
                  padding={"0 0 8px 0"}
                  className={"inputlabel"}
                />
                {/* {console.log("Role", role)} */}
                <TextField
                  className="textfield"
                  select
                  placeholder={"Select a role"}
                  value={role}
                  onChange={handleChangeRole}
                >
                  {roles.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value ? option.value : role}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {roleError && (
                  <Error
                    className="inputerror"
                    text={"Role is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <TransparentButton
                className="transparentbutton"
                onClick={handleClose}
                text={strings.Back}
                width={"auto"}
              />
              <PrimaryButton
                className="primarybutton"
                onClick={() => {
                  // setPhoneNumberError2(false);
                  successStaffClickopen(flag);
                }}
                autoFocus
                text={flag ? strings.confirm : strings.SendInvite}
                width={"210px"}
              />
              {/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>
          {/*success modal*/}
          <Dialog
            open={successStaffopen}
            onClose={handleClose}
            className={"modalwidth610"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ textAlign: "center" }}
          >
            <DialogTitle id="alert-dialog-title">
              <Button className="modal-crose" onClick={handleClose}>
                <img src={CroseImg} alt="name" />
              </Button>
            </DialogTitle>
            <DialogContent>
              <h2 className={"heading30"}>
                <img src={SuccessIcon} alt="" className="icon60" />
                {strings.StaffInviteSentSuccessfully}
              </h2>
              <DialogContentText id="alert-dialog-description">
                You have invited <b>{name}</b> ({email}) to WorkBriefly as an{" "}
                <b>{role}</b>.
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <PrimaryButton
                className="primarybutton"
                onClick={handleClose}
                autoFocus
                text={strings.Continue}
                width={"210px"}
              />
              {/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>

          <Dialog
            open={confirmationOpen}
            onClose={() => setConfirmationOpen(false)}
            className={"modalwidth610"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ textAlign: "center" }}
          >
            <DialogTitle id="alert-dialog-title">
              <Button className="modal-crose" onClick={handleClose}>
                <img src={CroseImg} alt="name" />
              </Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <h3>{confirmationType.message}</h3>
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <PrimaryButton
                className="primarybutton"
                onClick={() => setConfirmationOpen(false)}
                autoFocus
                text={strings.Continue}
                width={"210px"}
              />
              {/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>

          {/*Delete Modal*/}
          <Dialog
            open={deleteStaffopen}
            onClose={handleClose}
            className={"modalwidth548"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {strings.DeleteStaff}
              <Button className="modal-crose" onClick={handleClose}>
                <img src={CroseImg} alt="name" />
              </Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {strings.Areyousureyouwanttodeletethisstaff}
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
                onClick={deleteStaff}
                autoFocus
                text={strings.Yes}
                width={"210px"}
              />
              {/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>

          {/* <Popup
            popupIsOpen={confirmationOpen}
            style={POPUP_TYPE.CONFIRMATION}
            type={confirmationType}
            closePopup={() => setConfirmationOpen(false)}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Staff);
