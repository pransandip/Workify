import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { debounce, throttle } from "lodash";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Heading3Bold,
  Heading5Medium,
  Heading6Medium,
  Small,
} from "../../../../../Styles-Elements/Labels";
import * as Colors from "../../../../../Styles-Elements/Colors";
import Pagination from "../../../../../Styles-Elements/pagination/Pagination";

// Importing material ui
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../../../store/actions";

import axios, { imageBase } from "../../../../../api/axios";

import "../../../GIGS.scss";

// Importing images
import HeaderImage from "../../../../../image-assets/product/h-product-logo1.png";
import dataNotFoundImage from "../../../../../image-assets/product/no_data_found.png";
import editGrayIcon from "../../../../../image-assets/structure/editgray.svg";
import copyGrayIcon from "../../../../../image-assets/structure/copygray.svg";

// Importing localised strings
const strings = require("../../../../../localisation_en.json");

function GigActiveSingleDay(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [day_type, setDay_type] = useState("single");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const singleDayActiveGig = useSelector(
    (state) => state.singleDayGigData.activeData
  );
  // console.log({ singleDayActiveGig })

  const singleDayCompleteGig = useSelector(
    (state) => state.singleDayGigData.completeData
  );

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const changeRoute = useCallback(
    debounce((path) => {
      history.push(path);
    }, 600),
    []
  );

  const getSelectedData = (id, type, path) => {
    axios
      .get(`/api/gig/specific/${parseInt(id)}`, config)
      .then((res) => {
        if (res.data.ack === 1) {
          if (type === "details") {
            dispatch({
              type: ACTIONS.GET_GIG_DETAILS,
              payload: {
                ...res.data.data[0],
              },
            });
          }
          dispatch({
            type: ACTIONS.UPDATE_GIG_DATA,
            payload: {
              ...res.data.data[0],
              gig_type: type === "edit" ? "Edit" : "Create",
            },
          });

          changeRoute(path);
          setEditLoading(false);
          setCopyLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const getAllActiveData = (suggestions) => {
    let url =
      suggestions !== ""
        ? `/api/gig/getall?status=${"active"}&day_type=${day_type}&page=${1}&search=${suggestions}`
        : `/api/gig/getall?status=${"active"}&day_type=${day_type}&page=${1}`;
    axios
      .get(url, config)
      .then((res) => {
        setLoading(false);
        dispatch({
          type: ACTIONS.GET_SINGLE_DAY_BUSINESS_ACTIVE_GIG,
          payload: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  };

  const getAllCompletedData = (suggestions) => {
    let url =
      suggestions !== ""
        ? `/api/gig/getall?status=${"complete"}&day_type=${day_type}&page=${1}&search=${suggestions}`
        : `/api/gig/getall?status=${"complete"}&day_type=${day_type}&page=${1}`;
    axios
      .get(url, config)
      .then((res) => {
        setLoading(false);
        dispatch({
          type: ACTIONS.GET_SINGLE_DAY_BUSINESS_COMPLETE_GIG,
          payload: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    getAllActiveData(props.suggestions);
    getAllCompletedData(props.suggestions);
  }, [props.suggestions]);
  const routeChangeCreateGig = (e, item) => {
    //console.log(item)
    e.preventDefault();
    let path = `/create-gig`;
    setEditLoading(true);
    setSelectedItem(item.id);
    getSelectedData(item.id, "edit", path);
  };

  const routeChangeCopyGig = (e, item) => {
    //console.log(item)
    e.preventDefault();
    let path = `/create-gig`;
    setCopyLoading(true);
    setSelectedItem(item.id);
    getSelectedData(item.id, "copy", path);
  };

  const routeChangeGigDetails = (e, item) => {
    e.preventDefault();
    let path = `/gig-all-details`;
    localStorage.setItem("selcted_gig", item.id);
    getSelectedData(item.id, "details", path);
    //history.push(path);
  };

  /*------Code Added for search -----*/
  const filteredGigs = singleDayActiveGig.filter((gig) =>
    gig.position.toLowerCase().includes(props.search.toLowerCase())
  );

  console.log({ filteredGigs });

  /*------Code Added marge same date gigs -----*/
  const dates = singleDayActiveGig.map((item) =>
    new Date(item.startdate).toDateString()
  );
  const toFindDuplicates = dates.filter(
    (item, index) => dates.indexOf(item) !== index
  );
  const setArr = [...new Set(toFindDuplicates)];

  return (
    <div className="main-app-grid">
      {loading ? (
        <div className="loader">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="gig-single-holder" style={{ minHeight: "300px" }}>
          {filteredGigs.length > 0 ? (
            filteredGigs.map((items) => {
              return (
                items.status === "active" && (
                  <div
                    className={`gig_classA ${
                      setArr.includes(new Date(items.startdate).toDateString())
                        ? "gig_classB"
                        : "no_effect_class"
                    }`}
                  >
                    {setArr.includes(
                      new Date(items.startdate).toDateString()
                    ) ? (
                      <Heading6Medium
                        className={`heading6medium ${
                          setArr.includes(
                            new Date(items.startdate).toDateString()
                          )
                            ? `date_class`
                            : ""
                        }`}
                        text={`${new Date(items.startdate).toDateString()}`}
                        fontWeight={"700"}
                        color={Colors.nightGray}
                        padding={"0 0 16px 0"}
                      />
                    ) : (
                      <Heading6Medium
                        className={"heading6medium"}
                        text={`${new Date(items.startdate).toDateString()}`}
                        fontWeight={"700"}
                        color={Colors.nightGray}
                        padding={"0 0 16px 0"}
                      />
                    )}
                    <div className={"topHeader"}>
                      <div>
                        <img
                          src={
                            `${imageBase}${items.cover_image}`
                              ? `${imageBase}${items.cover_image}`
                              : HeaderImage
                          }
                          alt="name"
                          onClick={(e) => routeChangeGigDetails(e, items)}
                          style={{
                            width: "100px",
                            height: "120px",
                            padding: "8px 8px 0px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div
                        className={"relative"}
                        onClick={(e) => routeChangeGigDetails(e, items)}
                      >
                        <p className={"status-p"}>
                          <span
                            className={"status"}
                            style={{
                              background: `${
                                items.confirm_count == items.vacancies
                                  ? `var(--success)`
                                  : items.confirm_count === 0
                                  ? `var(--error)`
                                  : `var(--warning)`
                              }`,
                            }}
                          ></span>{" "}
                          {`${items.confirm_count}/${items.vacancies}`}
                        </p>
                        <Heading3Bold
                          text={
                            items.position.length > 100
                              ? `${items.position.substring(0, 100) + "..."}`
                              : `${items.position}`
                          }
                          color={Colors.black}
                          className={"heading3bold"}
                        />
                        <div className={"topHeaderRow"}>
                          <Box className={"infoBox"}>
                            <Small
                              color={Colors.lightGray}
                              className={"small"}
                              text={strings.Company}
                            />
                            <Heading6Medium
                              fontWeight={700}
                              className={"heading6medium"}
                              color={Colors.nightGray}
                              text={items.business_name}
                            />
                          </Box>
                          <Box className={"infoBox"}>
                            <Small
                              color={Colors.lightGray}
                              className={"small"}
                              text={strings.Time}
                            />

                            <Heading6Medium
                              fontWeight={700}
                              className={"heading6medium"}
                              color={Colors.nightGray}
                              text={`${
                                new Date(items.starttime).toString() ===
                                "Invalid Date"
                                  ? `${items.starttime + ` - ` + items.endtime}`
                                  : new Date(
                                      `${items.starttime}`
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    }) +
                                    ` - ` +
                                    new Date(
                                      `${items.endtime}`
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    })
                              }`}
                            />
                          </Box>
                          <Box className={"infoBox"}>
                            <Small
                              color={Colors.lightGray}
                              className={"small"}
                              text={"Pay"}
                            />
                            <Heading6Medium
                              fontWeight={700}
                              className={"heading6medium"}
                              color={Colors.nightGray}
                              text={`$${parseFloat(items.total_amount).toFixed(
                                2
                              )} ($${items.hourly_pay}/hr)`}
                            />
                          </Box>
                          <Box className={"infoBox"}>
                            <Small
                              color={Colors.lightGray}
                              className={"small"}
                              text={"Pay Frequency"}
                            />
                            <Heading6Medium
                              fontWeight={700}
                              className={"heading6medium"}
                              color={Colors.nightGray}
                              text={items.pay_frequency}
                            />
                          </Box>
                          {(items.status === "completed" ||
                            items.status === "cancel") && (
                            <Box className={"infoBox"}>
                              <Small
                                color={Colors.lightGray}
                                className={"small"}
                                text={"Status"}
                              />
                              <Heading5Medium
                                fontWeight={700}
                                className={"heading6medium"}
                                color={
                                  items.status === "completed"
                                    ? Colors.success
                                    : Colors.error
                                }
                                text={
                                  items.status === "completed"
                                    ? "Completed"
                                    : "Cancelled"
                                }
                              />
                            </Box>
                          )}
                        </div>
                      </div>
                      <Box className={"edit-copy-btn"}>
                        {editLoading &&
                        selectedItem.toString() === items.id.toString() ? (
                          <ClipLoader
                            color="#808080"
                            loading={editLoading}
                            size={15}
                          />
                        ) : (
                          <img
                            src={editGrayIcon}
                            alt="name"
                            className="icon22"
                            onClick={(e) => routeChangeCreateGig(e, items)}
                          />
                        )}
                        {copyLoading &&
                        selectedItem.toString() === items.id.toString() ? (
                          <ClipLoader
                            color="#808080"
                            loading={copyLoading}
                            size={15}
                          />
                        ) : (
                          <img
                            src={copyGrayIcon}
                            alt="name"
                            className="icon22"
                            onClick={(e) => routeChangeCopyGig(e, items)}
                          />
                        )}
                      </Box>
                    </div>
                    {setArr.includes(
                      new Date(items.startdate).toDateString()
                    ) ? null : (
                      <Divider className="divider-line" />
                    )}
                  </div>
                )
              );
            })
          ) : (
            <div className="main-app-grid">
              <div style={{ textAlign: "center" }}>
                <img
                  src={dataNotFoundImage}
                  alt="name"
                  style={{ marginTop: "5rem" }}
                />
              </div>
            </div>
          )}

          {/* <div className={'topHeader'} >
          <img src={HeaderImage} alt="name" className={'topHeaderImg'} />
          <div className={'relative'} >
            <p className={'status-p'}><span className={'status'} style={{ background: 'var(--yallow)' }}></span> 0/3</p>
            <Heading3Bold text={strings.WarehouseMover} color={Colors.black} className={'heading3bold'} />
            <div className={'topHeaderRow'}>
              <Box className={'infoBox'}>
                <Small color={Colors.lightGray} className={'small'} text={strings.Company} />
                <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'JJ Bean'} />
              </Box>
              <Box className={'infoBox'}>
                <Small color={Colors.lightGray} className={'small'} text={strings.Time} />
                <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'11:00 AM - 5:00 PM'} />
              </Box>
              <Box className={'infoBox'}>
                <Small color={Colors.lightGray} className={'small'} text={'Pay'} />
                <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'$56.00 ($14/hr)'} />
              </Box>
              <Box className={'infoBox'}>
                <Small color={Colors.lightGray} className={'small'} text={'Pay Frequency'} />
                <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'Daily'} />
              </Box>
            </div>
          </div>
          <Box className={'edit-copy-btn'}>
            <img src={copyGrayIcon} alt="name" className='icon22' />
          </Box>
        </div> */}

          {/* {filteredGigs.length > 0 ? <Divider className="divider-line" /> : null} */}
          {/* {singleDayCompleteGig.length > 0 &&
            singleDayCompleteGig.map((items) => {
              return (
                <>
                  <Heading6Medium
                    className={"heading6medium"}
                    text={`${new Date(items.startdate).toDateString()}`}
                    fontWeight={"700"}
                    color={Colors.nightGray}
                    padding={"0 0 16px 0"}
                  />
                  <div className={"topHeader"}>
                    <div>
                      <img
                        src={
                          `${imageBase}${items.cover_image}`
                            ? `${imageBase}${items.cover_image}`
                            : HeaderImage
                        }
                        alt="name"
                        onClick={(e) => routeChangeGigDetails(e, items)}
                        style={{
                          width: "100px",
                          height: "120px",
                          padding: "8px 8px 0px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div
                      className={"relative"}
                      onClick={(e) => routeChangeGigDetails(e, items)}
                    >
                      <p className={"status-p"}>
                        <span
                          className={"status"}
                          style={{ background: "var(--success)" }}
                        ></span>{" "}
                        0/3
                      </p>
                      <Heading3Bold
                        text={
                          items.position.length > 100
                            ? `${items.position.substring(0, 100) + "..."}`
                            : `${items.position}`
                        }
                        color={Colors.black}
                        className={"heading3bold"}
                      />
                      <div className={"topHeaderRow"}>
                        <Box className={"infoBox"}>
                          <Small
                            color={Colors.lightGray}
                            className={"small"}
                            text={strings.Company}
                          />
                          <Heading6Medium
                            fontWeight={700}
                            className={"heading6medium"}
                            color={Colors.nightGray}
                            text={items.business_name}
                          />
                        </Box>
                        <Box className={"infoBox"}>
                          <Small
                            color={Colors.lightGray}
                            className={"small"}
                            text={strings.Time}
                          />

                          <Heading6Medium
                            fontWeight={700}
                            className={"heading6medium"}
                            color={Colors.nightGray}
                            text={`${
                              new Date(items.starttime).toString() ===
                              "Invalid Date"
                                ? `${items.starttime + ` - ` + items.endtime}`
                                : new Date(
                                    `${items.starttime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }) +
                                  ` - ` +
                                  new Date(
                                    `${items.endtime}`
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })
                            }`}
                          />
                        </Box>
                        <Box className={"infoBox"}>
                          <Small
                            color={Colors.lightGray}
                            className={"small"}
                            text={"Pay"}
                          />
                          <Heading6Medium
                            fontWeight={700}
                            className={"heading6medium"}
                            color={Colors.nightGray}
                            text={`$${items.total_amount}.00 ($${items.hourly_pay}/hr)`}
                          />
                        </Box>
                        <Box className={"infoBox"}>
                          <Small
                            color={Colors.lightGray}
                            className={"small"}
                            text={"Pay Frequency"}
                          />
                          <Heading6Medium
                            fontWeight={700}
                            className={"heading6medium"}
                            color={Colors.nightGray}
                            text={items.pay_frequency}
                          />
                        </Box>
                        {(items.status === "completed" ||
                          items.status === "cancel") && (
                          <Box className={"infoBox"}>
                            <Small
                              color={Colors.lightGray}
                              className={"small"}
                              text={"Status"}
                            />
                            <Heading5Medium
                              fontWeight={700}
                              className={"heading6medium"}
                              color={
                                items.status === "completed"
                                  ? Colors.success
                                  : Colors.error
                              }
                              text={
                                items.status === "completed"
                                  ? "Completed"
                                  : "Cancelled"
                              }
                            />
                          </Box>
                        )}
                      </div>
                    </div>
                    <Box className={"edit-copy-btn"}>
                      <img src={copyGrayIcon} alt="name" className="icon22" />
                    </Box>
                  </div>
                </>
              );
            })} */}
          {/* <Heading6Medium
          className={"heading6medium"}
          text={"Sat, Mar 14, 2022"}
          fontWeight={"700"}
          color={Colors.nightGray}
          padding={"0 0 16px 0"}
        />
        <div className={"topHeader"}>
          <img src={HeaderImage} alt="name" className={"topHeaderImg"} />
          <div className={"relative"}>
            <p className={"status-p"}>
              <span
                className={"status"}
                style={{ background: "var(--success)" }}
              ></span>{" "}
              0/3
            </p>
            <Heading3Bold
              text={strings.WarehouseMover}
              color={Colors.black}
              className={"heading3bold"}
            />
            <div className={"topHeaderRow"}>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={strings.Company}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"JJ Bean"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={strings.Time}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"11:00 AM - 5:00 PM"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={"Pay"}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"$56.00 ($14/hr)"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={"Pay Frequency"}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"Daily"}
                />
              </Box>
            </div>
          </div>
          <Box className={"edit-copy-btn"}>
            <img src={copyGrayIcon} alt="name" className="icon22" />
          </Box>
        </div>

        <div className={"topHeader"}>
          <img src={HeaderImage} alt="name" className={"topHeaderImg"} />
          <div className={"relative"}>
            <p className={"status-p"}>
              <span
                className={"status"}
                style={{ background: "var(--success)" }}
              ></span>{" "}
              0/3
            </p>
            <Heading3Bold
              text={strings.WarehouseMover}
              color={Colors.black}
              className={"heading3bold"}
            />
            <div className={"topHeaderRow"}>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={strings.Company}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"JJ Bean"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={strings.Time}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"11:00 AM - 5:00 PM"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={"Pay"}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"$56.00 ($14/hr)"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={"Pay Frequency"}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"Daily"}
                />
              </Box>
            </div>
          </div>
          <Box className={"edit-copy-btn"}>
            <img src={copyGrayIcon} alt="name" className="icon22" />
          </Box>
        </div>

        <div className={"topHeader"}>
          <img src={HeaderImage} alt="name" className={"topHeaderImg"} />
          <div className={"relative"}>
            <p className={"status-p"}>
              <span
                className={"status"}
                style={{ background: "var(--yallow)" }}
              ></span>{" "}
              0/3
            </p>
            <Heading3Bold
              text={strings.WarehouseMover}
              color={Colors.black}
              className={"heading3bold"}
            />
            <div className={"topHeaderRow"}>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={strings.Company}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"JJ Bean"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={strings.Time}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"11:00 AM - 5:00 PM"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={"Pay"}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"$56.00 ($14/hr)"}
                />
              </Box>
              <Box className={"infoBox"}>
                <Small
                  color={Colors.lightGray}
                  className={"small"}
                  text={"Pay Frequency"}
                />
                <Heading6Medium
                  fontWeight={700}
                  className={"heading6medium"}
                  color={Colors.nightGray}
                  text={"Daily"}
                />
              </Box>
            </div>
          </div>
          <Box className={"edit-copy-btn"}>
            <img src={copyGrayIcon} alt="name" className="icon22" />
          </Box>
        </div> */}
        </div>
      )}
      <Pagination />
    </div>
  );
}

export default GigActiveSingleDay;
