// Importing material ui
import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Heading3Bold,
  Body,
  Heading6Medium,
} from "../../../Styles-Elements/Labels";
import * as Colors from "../../../Styles-Elements/Colors";

import GigDetailSingledayGigInfo from "./gig-active-detail/gig-active--singleday-detail/gigdetail-singleday-giginfo/GigDetailSingledayGigInfo";
import GigDetailApplicantSingleDay from "./gig-active-detail/gig-active--singleday-detail/gigdetail-applicant-singleday/GigDetailApplicantSingleDay";
import GigDetailBookedWorkerSingleDay from "./gig-active-detail/gig-active--singleday-detail/gigdetail-bookedworker-singleday/GigDetailBookedWorkerSingleDay";
import GigDetailInvoiceSingleDay from "./gig-active-detail/gig-active--singleday-detail/gigdetail-invoice-singleday/GigDetailInvoiceSingleDay";

import GigDetailMultipledayGigInfo from "./gig-active-detail/gig-active--multiple-detail/gigdetail-multipleday-giginfo/GigDetailMultipledayGigInfo";
import GigDetailApplicantMultipleDay from "./gig-active-detail/gig-active--multiple-detail/gigdetail-applicant-multipleday/GigDetailApplicantMultipleDay";
import GigDetailBookedWorkerMultipleDay from "./gig-active-detail/gig-active--multiple-detail/gigdetail-bookedworker-multipleday/GigDetailBookedWorkerMultipleDay";
import GigDetailInvoiceMultipleDay from "./gig-active-detail/gig-active--multiple-detail/gigdetail-invoice-multipleday/GigDetailInvoiceMultipleDay";

// Importing images
import HeaderImage from "../../../image-assets/product/h-product-logo1.png";
import editBlueIcon from "../../../image-assets/structure/editblue.svg";

import Sidebar from "../../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../../Styles-Elements/Heading/Header";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../store/actions";
import axios from "../../../api/axios";
import { imageBase } from "../../../api/axios";

import "./../GIGS.scss";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function GigDetails(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const getSelectedGigData = (id) => {
    axios
      .get(`/api/gig/specific/${parseInt(id)}`, config)
      .then((res) => {
        console.log('getSelectedGigData->res', res);
        if (res.data.ack === 1) {
          dispatch({
            type: ACTIONS.GET_GIG_DETAILS,
            payload: {
              ...res.data.data[0],
            },
          });

          dispatch({
            type: ACTIONS.UPDATE_GIG_DATA,
            payload: {
              ...res.data.data[0],
              gig_type: "Edit",
            },
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const gig_details = useSelector((state) => state.gigDetils);
  console.log('gig_details__>', gig_details);

  const [licenseData, setLicenseData] = useState(null);
  const [gigLocationInfo, setGigLocationInfo] = useState(null);
  const [init, setInit] = useState(null);

  const user = useSelector((state) => state.userData.data);
  const localUser = localStorage.getItem("user");

  let user_id = user ? user.id : JSON.parse(localUser).id;

  const getLocation = () => {
    axios
      .get(`api/users/location/${user_id}`, config)
      .then((res) => {
        setGigLocationInfo(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("/api/certificate_and_licence", config)
      .then((res) => {
        setLicenseData(res.data.data);
      })
      .catch((error) => console.log(error));

    getLocation();
    if (Object.keys(gig_details).length <= 0) {
      let id = localStorage.getItem("selcted_gig");
      getSelectedGigData(id);
    }
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let id = localStorage.getItem("selcted_gig");
    getSelectedGigData(id);
  };

  const routeChangeCreateGig = () => {
    let path = `/create-gig`;
    history.push(path);
  };
  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className="gig-detail-main-holder">
          <Breadcrumbs aria-label="breadcrumb" mb={2}>
            <Link underline="hover" color="inherit" to="/gig">
              Gigs
            </Link>
            <Typography color="text.primary">
              {gig_details.business_name}
            </Typography>
          </Breadcrumbs>
          <div>
            <div className={"topHeader"}>
              <img
                src={`${imageBase}${gig_details.cover_image}`}
                alt="name"
                style={{
                  width: "100px",
                  height: "120px",
                  padding: "8px 8px",
                  objectFit: "cover",
                }}
              />
              <div className={"relative"}>
                <p className={"status-p"}>
                  <span
                    className={"status"}
                    style={{
                      background: ` ${gig_details.status === "active"
                        ? "var(--error)"
                        : "var(--sucess)"
                        }`,
                    }}
                  ></span>{" "}
                  {`0/${gig_details.vacancies}`}
                </p>
                <Heading3Bold
                  text={gig_details.position}
                  color={Colors.black}
                  className={"heading3bold"}
                />
                <div className={"topHeaderRow"}>
                  <Box className={"infoBox"}>
                    <Body
                      color={Colors.lightGray}
                      className={"body"}
                      text={strings.Company}
                    />
                    <Heading6Medium
                      fontWeight={700}
                      className={"heading6medium"}
                      color={Colors.nightGray}
                      text={gig_details.business_name}
                    />
                  </Box>
                  <Box className={"infoBox"}>
                    <Body
                      color={Colors.lightGray}
                      className={"body"}
                      text={"Date"}
                    />
                    <Heading6Medium
                      fontWeight={700}
                      className={"heading6medium"}
                      color={Colors.Primary}
                      text={`${new Date(
                        gig_details.startdate
                      ).toDateString()} ${gig_details.enddate
                        ? `- ${new Date(gig_details.enddate).toDateString()}`
                        : ""
                        } `}
                    />
                  </Box>
                  <Box className={"infoBox"}>
                    <Body
                      color={Colors.lightGray}
                      className={"body"}
                      text={strings.Time}
                    />
                    <Heading6Medium
                      fontWeight={700}
                      className={"heading6medium"}
                      color={Colors.nightGray}
                      text={`${new Date(gig_details.starttime).toString() ===
                        "Invalid Date"
                        ? `${gig_details.starttime +
                        ` - ` +
                        gig_details.endtime
                        }`
                        : new Date(
                          `${gig_details.starttime}`
                        ).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }) +
                        ` - ` +
                        new Date(
                          `${gig_details.endtime}`
                        ).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                        }`}
                    />
                  </Box>
                  <Box className={"infoBox"}>
                    <Body
                      color={Colors.lightGray}
                      className={"body"}
                      text={"Pay"}
                    />
                    <Heading6Medium
                      fontWeight={700}
                      className={"heading6medium"}
                      color={Colors.nightGray}
                      text={`$${parseFloat(gig_details.total_amount).toFixed(
                        2
                      )} ($${gig_details.hourly_pay}/hr)`}
                    />
                  </Box>
                  <Box className={"infoBox"}>
                    <Body
                      color={Colors.lightGray}
                      className={"body"}
                      text={"Pay Frequency"}
                    />
                    <Heading6Medium
                      fontWeight={700}
                      className={"heading6medium"}
                      color={Colors.nightGray}
                      text={gig_details.pay_frequency}
                    />
                  </Box>
                  <Box className={"infoBox"}>
                    <Body
                      color={Colors.lightGray}
                      className={"body"}
                      text={"Unpaid Break"}
                    />
                    <Heading6Medium
                      fontWeight={700}
                      className={"heading6medium"}
                      color={Colors.nightGray}
                      text={`${gig_details.unpaid_break} mins`}
                    />
                  </Box>
                  <Box className={"infoBox"}>
                    <Body
                      color={Colors.lightGray}
                      className={"body"}
                      text={"Paid Break"}
                    />
                    <Heading6Medium
                      fontWeight={700}
                      className={"heading6medium"}
                      color={Colors.nightGray}
                      text={`${gig_details.paid_break} mins`}
                    />
                  </Box>
                  {(gig_details.status === "completed" ||
                    gig_details.status === "cancel") && (
                      <Box className={"infoBox"}>
                        <Body
                          color={Colors.lightGray}
                          className={"body"}
                          text={"Status"}
                        />
                        <Heading6Medium
                          fontWeight={700}
                          className={"heading6medium"}
                          color={
                            gig_details.status === "completed"
                              ? Colors.success
                              : Colors.error
                          }
                          text={
                            gig_details.status === "completed"
                              ? "Completed"
                              : "Cancelled"
                          }
                        />
                      </Box>
                    )}
                </div>
              </div>
              {gig_details.status !== "cancel" &&
                gig_details.status !== "completed" && (
                  <Box className="editbutton" onClick={routeChangeCreateGig}>
                    <img src={editBlueIcon} alt="name" />
                    <Body
                      color={Colors.Primary}
                      fontWeight={"500"}
                      padding={"0 0 0 10px"}
                      text={strings.Edit}
                    />
                  </Box>
                )}
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Gig Info" {...a11yProps(0)} />
                <Tab label="Applicants" {...a11yProps(1)} />
                <Tab label="Booked Workers" {...a11yProps(2)} />
                <Tab label="Invoice" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel className={"tabpanels"} value={value} index={0}>
              <GigDetailSingledayGigInfo
                gig_details={gig_details}
                licenseData={licenseData}
                gigLocationInfo={gigLocationInfo}
              />
              {/*<GigDetailMultipledayGigInfo />*/}
            </TabPanel>
            <TabPanel className={"tabpanels"} value={value} index={1}>
              {/*<GigDetailApplicantSingleDay />*/}
              <GigDetailApplicantMultipleDay gig_details={gig_details} />
            </TabPanel>
            <TabPanel className={"tabpanels"} value={value} index={2}>
              {/*<GigDetailBookedWorkerSingleDay />*/}
              <GigDetailBookedWorkerMultipleDay
                gig_details={gig_details}
                getSelectedGigData={getSelectedGigData}
              />
            </TabPanel>
            <TabPanel className={"tabpanels"} value={value} index={3}>
              {/*<GigDetailInvoiceSingleDay />*/}
              <GigDetailInvoiceMultipleDay
                gig_details={gig_details}
                getSelectedGigData={getSelectedGigData}
              />
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default GigDetails;
