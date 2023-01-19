import * as React from "react";
import { useState, useEffect } from "react";
import {
  Body,
  Heading4Medium,
  Heading5Medium,
  InputLabel,
  Error,
} from "../../../Styles-Elements/Labels";
import { Textfield } from "../../../Styles-Elements/Inputs";
import {
  PrimaryButton,
  TransparentButton,
  SecondaryButton,
} from "../../../Styles-Elements/Buttons";
import * as Colors from "../../../Styles-Elements/Colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@mui/material/Grid";
import { FormControlLabel } from "@mui/material";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../store/actions/index";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

// import images
import infoIcon from "../../../image-assets/structure/info-icon.svg";

import "./CGIGEDatesFrequency.scss";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function CGIGEDatesFrequency(props) {
  const dispatch = useDispatch();

  let gig_data = useSelector((state) => state.gigData);
  console.log({ gig_data })

  const parseTime = (timeString) => {
    if (timeString == "") return null;
    var d = new Date();
    var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
    d.setHours(
      parseInt(time[1], 10) + (parseInt(time[1], 10) < 12 && time[4] ? 12 : 0)
    );
    d.setMinutes(parseInt(time[3], 10) || 0);
    d.setSeconds(0, 0);
    return d;
  };

  const [totalWorker, setTotalWorkers] = useState(gig_data.vacancies);
  const [hourlyPay, setHourlyPay] = useState(gig_data.hourly_pay);
  const [subTotal, setSubTotal] = useState(gig_data.subtotal);
  const [totalPay, setTotalPay] = useState(gig_data.total_amount);
  const [fee, setFee] = useState(gig_data.admin_fee_amount);
  const [tax, setTax] = useState(gig_data.tax_amount);
  const [dayType, setDayType] = useState(gig_data.day_type);
  const [paidBreak, setPaidBreak] = useState(gig_data.paid_break);
  const [unPaidBreak, setunPaidBreak] = useState(gig_data.unpaid_break);
  const [payFrequency, setPayFrequency] = useState(gig_data.pay_frequency);
  const [selectedStartDate, handleStartDateChange] = useState(
    gig_data.startdate !== "" ? gig_data.startdate : new Date()
  );
  const [selectedEndDate, handleEndDateChange] = useState(
    gig_data.enddate !== "" ? gig_data.enddate : new Date()
  );
  const [selectedStartTime, handleStartTimeChange] = useState(
    gig_data.starttime !== ""
      ? new Date(gig_data.starttime).toString() === "Invalid Date"
        ? parseTime(gig_data.starttime)
        : gig_data.starttime
      : new Date()
  );
  const [selectedEndTime, handleEndTimeChange] = useState(
    gig_data.endtime !== ""
      ? new Date(gig_data.endtime).toString() === "Invalid Date"
        ? parseTime(gig_data.endtime)
        : gig_data.endtime
      : new Date()
  );
  const [totalTime, setTotalTime] = useState(gig_data.total_hours_per_worker);
  const [actualTime, setActualTime] = useState(gig_data.total_hours_per_worker);
  const [totalTimeError, setTotalTimeError] = useState(false);
  const [totalWorkerError, setTotalWorkersError] = useState(false);
  const [hourlyPayError, setHourlyPayError] = useState(false);
  const [unPaidBreakError, setunPaidBreakError] = useState(false);
  const [unPaidError, setunPaidError] = useState(false);
  const [paidBreakError, setPaidBreakError] = useState(false);

  const getSubtotalValue = (worker, hourlyPay, time) => {
    let subTotalValue = worker * hourlyPay * parseFloat(time).toFixed(2);
    setSubTotal(subTotalValue);
    getTotal(subTotalValue);
  };

  const getTotal = (subTotalValue) => {
    let fee = (subTotalValue / 100) * parseFloat(20);
    let tax = ((subTotalValue + fee) / 100) * parseFloat(5);

    let Total_amount = subTotalValue + fee + tax;

    setFee(fee);
    setTax(tax);

    setTotalPay(Total_amount);
  };

  const timeCalc = (startDate, endDate) => {
    var start = moment(startDate);
    var end = moment(endDate);
    let workingTime = parseFloat(end.diff(start, "hours", "minutes", true));
    if (workingTime < 0) {
      setTotalTimeError(true);
    }
    setTotalTime(parseFloat(end.diff(start, "hours", "minutes", true)));
    setActualTime(parseFloat(end.diff(start, "hours", "minutes", true)));
    if (workingTime > 0) {
      getSubtotalValue(
        parseInt(totalWorker),
        parseFloat(hourlyPay),
        parseFloat(workingTime)
      );
    }
  };

  const calculateTotalWorkingHours = (unPaid, startTime, endTime) => {
    // console.log(unPaid);
    var start = moment(startTime);
    var end = moment(endTime);
    let workingTime = parseFloat(end.diff(start, "hours", "minutes", true));
    let mins = Math.floor(workingTime * 60);

    let actualTime = mins - unPaid;

    setActualTime(actualTime / 60);
    getSubtotalValue(
      parseInt(totalWorker),
      parseFloat(hourlyPay),
      actualTime / 60
    );
  };

  // useEffect(() => {
  //   timeCalc(selectedStartTime, selectedEndTime);
  // }, []);

  const StartTimeChange = (value) => {
    setTotalTimeError(false);
    handleStartTimeChange(value);

    if (unPaidBreak !== "") {
      calculateTotalWorkingHours(unPaidBreak, value, selectedEndTime);
    } else {
      timeCalc(value, selectedEndTime);
    }
  };

  const EndTimeChange = (value) => {
    setTotalTimeError(false);
    handleEndTimeChange(value);

    if (unPaidBreak !== "") {
      calculateTotalWorkingHours(unPaidBreak, selectedStartTime, value);
    } else {
      timeCalc(selectedStartTime, value);
    }
  };

  const StartDateChange = (value) => {
    handleStartDateChange(value);
    if (dayType === "single") {
      handleEndDateChange(value);
    }
  };

  const TimeFormat = (date) => {
    return new Date(`${date}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const EndDateChange = (value) => {
    handleEndDateChange(value);
  };

  const handleWorkers = (value) => {
    setTotalWorkers(value);
    if (hourlyPay !== "" && totalTime && totalTime > 0) {
      getSubtotalValue(
        parseInt(value),
        parseFloat(hourlyPay),
        actualTime ? actualTime : totalTime
      );
    }
  };

  const handleHourlyPay = (value) => {
    setHourlyPay(value);
    if (totalWorker !== "" && totalTime && totalTime > 0) {
      getSubtotalValue(
        parseInt(totalWorker),
        parseFloat(value),
        actualTime ? actualTime : totalTime
      );
    }
  };

  const handleUnPaidBreak = (e) => {
    setunPaidBreak(e.target.value);
    setunPaidBreakError(false);
    let unpaid = parseFloat(e.target.value === "" ? 0 : e.target.value);
    let workingTime = parseFloat(totalTime * 60);
    if (workingTime > unpaid) {
      setunPaidError(false);
      calculateTotalWorkingHours(
        e.target.value === "" ? 0 : e.target.value,
        selectedStartTime,
        selectedEndTime
      );
    } else {
      setunPaidError(true);
      calculateTotalWorkingHours(0, selectedStartTime, selectedEndTime);
    }
  };

  const goNext = (click) => {
    console.log("click");
    if (
      totalWorker !== "" &&
      hourlyPay !== "" &&
      totalTime !== 0 &&
      paidBreak !== "" &&
      unPaidBreak !== ""
    ) {
      let payloadObj = {
        day_type: dayType,
        startdate: selectedStartDate,
        enddate: selectedEndDate,
        starttime: TimeFormat(selectedStartTime),
        endtime: TimeFormat(selectedEndTime),
        unpaid_break: unPaidBreak,
        paid_break: paidBreak,
        pay_frequency: payFrequency,
        hourly_pay: parseFloat(hourlyPay),
        total_hours_per_worker: actualTime
          ? parseFloat(actualTime)
          : parseFloat(totalTime),
        subtotal: parseFloat(subTotal),
        vacancies: totalWorker,
        admin_fee_amount: parseFloat(fee),
        tax_amount: parseFloat(tax),
        admin_fee_percent: parseFloat(20),
        tax_percent: parseFloat(5),
        total_amount: parseFloat(totalPay).toFixed(2),
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
    } else {
      if (totalWorker === "") {
        setTotalWorkersError(true);
      }
      if (hourlyPay === "") {
        setHourlyPayError(true);
      }
      if (totalTime === 0) {
        setTotalTimeError(true);
      }
      if (paidBreak === "") {
        setPaidBreakError(true);
      }
      if (unPaidBreak === "") {
        setunPaidBreakError(true);
      }
    }
  };
  return (
    <div className="page-background">
      <div className="cgig-overview-main-holder">
        <Heading4Medium
          className={"heading4medium"}
          fontWeight={"700"}
          text={strings.WorkDates_PayFrequency}
          color={Colors.black}
          margin={"0 0 12px 0"}
        />
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
            <div className="frequency-flex-box">
              <div className="overview-box width650">
                <Body
                  text={
                    strings.Pleaseaddeachdateandtimethatyourequireworkersforthisgiginadditiontothehourlyrateofpay
                  }
                  className={"body"}
                  color={Colors.midGray}
                  margin={"0 0 20px 0"}
                />

                <FormControl className={"radioSingleBox"}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="MultipleDay"
                    name="radio-buttons-group"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "20px",
                    }}
                  >
                    <FormControlLabel
                      value="single"
                      control={
                        <Radio
                          checked={dayType === "single"}
                          value="single"
                          onClick={(e) => setDayType(e.target.value)}
                        />
                      }
                      label="Single Day"
                    />
                    <FormControlLabel
                      value="multiple"
                      control={
                        <Radio
                          checked={dayType === "multiple"}
                          value="multiple"
                          onClick={(e) => setDayType(e.target.value)}
                        />
                      }
                      label="Multiple Day"
                    />
                  </RadioGroup>
                </FormControl>
                {/*single*/}
                {/*<Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="grid-item">
                      <InputLabel text={strings.Date}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <DatePicker value={selectedStartDate} clearable
                          inputVariant="outlined"
                          placeholder="DD/MM/YYYY"
                          onChange={date => handleStartDateChange(date)}
                          minDate={new Date()}
                          format="dd/MM/yyyy"
                          />
                        </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="grid-item">
                      <InputLabel text={strings.Starttime}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker value={selectedStartTime} inputVariant="outlined" onChange={handleStartTimeChange} />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="grid-item">
                      <InputLabel text={strings.Endtime}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker value={selectedEndTime} inputVariant="outlined" onChange={handleEndTimeChange} />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                </Grid>*/}
                {/*multiple*/}
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel
                        text={`* ${strings.StartDate}`}
                        color={Colors.nightGray}
                        padding={"0px 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          value={selectedStartDate}
                          clearable
                          disablePast={gig_data.gig_type === "Create"}
                          inputVariant="outlined"
                          placeholder="DD/MM/YYYY"
                          onChange={(date) => StartDateChange(date)}
                          minDate={
                            gig_data.gig_type === "Create" ? new Date() : ""
                          }
                          format="dd/MM/yyyy"
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={8} md={8} lg={5}>
                    {dayType === "multiple" && (
                      <div className="grid-item">
                        <InputLabel
                          text={`* ${strings.EndDate}`}
                          color={Colors.nightGray}
                          padding={"0px 0 8px 0"}
                          className={"inputlabel"}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            value={selectedEndDate}
                            clearable
                            inputVariant="outlined"
                            placeholder="DD/MM/YYYY"
                            onChange={(date) => EndDateChange(date)}
                            minDate={new Date(selectedStartDate)}
                            minDateMessage="End date should not be smaller then the start date"
                            format="dd/MM/yyyy"
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    )}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={5}
                    style={{ marginTop: "15px" }}
                  >
                    <div className="grid-item">
                      <InputLabel
                        text={`* ${strings.Starttime}`}
                        color={Colors.nightGray}
                        padding={"0px 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                          value={selectedStartTime}
                          inputVariant="outlined"
                          onChange={(date) => {
                            console.log(date);
                            StartTimeChange(date);
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={5}
                    style={{ marginTop: "15px" }}
                  >
                    <div className="grid-item">
                      <InputLabel
                        text={`* ${strings.Endtime}`}
                        color={Colors.nightGray}
                        padding={"0px 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                          value={selectedEndTime}
                          inputVariant="outlined"
                          //onChange={handleEndTimeChange}
                          onChange={(date) => {
                            EndTimeChange(date);
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {totalTimeError && (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {" "}
                        Total woking time cannot be in negetive or 0{" "}
                      </span>
                    )}
                  </Grid>
                </Grid>

                <div className={"divider"} />
                <Body
                  text={
                    strings.Pleaseindicatehowmanyminutesofunpaidandorpaidbreakthereareforthisgig
                  }
                  color={Colors.midGray}
                  margin={"0 0 20px 0"}
                />
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel
                        text={`* ${strings.UnpaidBreak}`}
                        color={Colors.nightGray}
                        padding={"0px 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <Textfield
                        className={
                          unPaidBreakError
                            ? "input-error textfield"
                            : "input textfield"
                        }
                        placeholder={strings.Enterminsofunpaidbreak}
                        value={unPaidBreak}
                        onChange={(e) => {
                          handleUnPaidBreak(e);
                        }}
                      />
                      {unPaidBreakError && (
                        <Error
                          className="inputerror"
                          text={"UnPaid Break is required"}
                          color={Colors.error}
                          margin={"4px 0 8px 0"}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel
                        text={`* ${strings.PaidBreak}`}
                        color={Colors.nightGray}
                        padding={"0px 0 8px 0"}
                        className={"inputlabel"}
                      />
                      <Textfield
                        className={
                          paidBreakError
                            ? "input-error textfield"
                            : "input textfield"
                        }
                        placeholder={strings.Enterminsofpaidbreak}
                        value={paidBreak}
                        onChange={(e) => {
                          setPaidBreak(e.target.value);
                          setPaidBreakError(false);
                        }}
                      />
                      {paidBreakError && (
                        <Error
                          className="inputerror"
                          text={"Paid Break is required"}
                          color={Colors.error}
                          margin={"4px 0 8px 0"}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {unPaidError && (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {" "}
                        Unpaid break must be less then Total hours per worker
                      </span>
                    )}
                  </Grid>
                </Grid>
                <div className={"divider"} />
                <Heading5Medium
                  text={"* Pay Frequency"}
                  color={Colors.nightGray}
                  margin={"0 0 10px 0"}
                />
                <FormControl style={{ marginBottom: "15px" }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="SingleDay"
                    name="radio-buttons-group"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "20px",
                    }}
                  >
                    <FormControlLabel
                      value="daily"
                      control={
                        <Radio
                          checked={payFrequency === "daily"}
                          value="daily"
                          onClick={(e) => setPayFrequency(e.target.value)}
                        />
                      }
                      label="Daily"
                    />
                    <FormControlLabel
                      value="weekly"
                      control={
                        <Radio
                          checked={payFrequency === "weekly"}
                          value="weekly"
                          onClick={(e) => setPayFrequency(e.target.value)}
                        />
                      }
                      label="Weekly"
                    />
                    <div className="tool-box">
                      <img src={infoIcon} alt="" className={"info-icon"} />
                      <div className={"tool-hover"}>
                        Weekly payments on Friday
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="overview-box width350">
                <Heading5Medium
                  text={strings.CostBreakdown}
                  color={Colors.nightGray}
                />
                <div className={"frequency-flex-right"}>
                  <Body
                    text={strings.Noofworkers}
                    className={"leftValue"}
                    color={Colors.nightGray}
                  />
                  <div className={"rightValue"}>
                    <span className={"blueSpan"}>
                      <Textfield
                        className={"input textfield"}
                        placeholder={"1"}
                        value={totalWorker}
                        fontWeight={500}
                        color={Colors.nightGray}
                        onChange={(e) => {
                          handleWorkers(e.target.value);
                          setTotalWorkersError(false);
                        }}
                        style={{
                          width: "75px",
                          height: "15px",
                          minHeight: "10px",
                          padding: "0px 16px",
                        }}
                      />
                    </span>
                    {totalWorkerError && (
                      <Error
                        className="inputerror"
                        text={"workers is required"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </div>
                <div className={"frequency-flex-right"}>
                  <Body
                    text={strings.Hourlypay}
                    className={"leftValue"}
                    color={Colors.nightGray}
                  />
                  <div className={"rightValue"}>
                    <span className={"blueSpan"}>
                      $
                      <Textfield
                        className={"input textfield"}
                        placeholder={"0.0"}
                        value={hourlyPay}
                        fontWeight={500}
                        color={Colors.nightGray}
                        onChange={(e) => {
                          handleHourlyPay(e.target.value);
                          setHourlyPayError(false);
                        }}
                        style={{
                          width: "75px",
                          height: "15px",
                          minHeight: "10px",
                          padding: "0px 16px",
                        }}
                      />
                    </span>
                    {hourlyPayError && (
                      <Error
                        className="inputerror"
                        text={"Hourly pay is required"}
                        color={Colors.error}
                        margin={"4px 0 8px 0"}
                      />
                    )}
                  </div>
                </div>
                <div className={"frequency-flex-right"}>
                  <Body
                    text={strings.Totalhoursperworker}
                    className={"leftValue"}
                    color={Colors.nightGray}
                  />
                  <div className={"rightValue"}>
                    <span className={"borderSpan"}>
                      <Body
                        text={
                          typeof totalTime !== "string"
                            ? actualTime
                              ? parseFloat(actualTime).toFixed(2)
                              : parseFloat(totalTime).toFixed(2)
                            : ""
                        }
                        fontWeight={500}
                        color={Colors.nightGray}
                      />
                    </span>
                  </div>
                </div>
                <div className={"frequency-flex-right"}>
                  <Body
                    text={strings.Subtotal}
                    className={"leftValue"}
                    color={Colors.nightGray}
                  />
                  <div className={"rightValue"}>
                    <span className={"normalSpan"}>
                      <Body
                        text={`$  ${!isNaN(subTotal) && typeof subTotal !== "string"
                          ? subTotal.toFixed(2)
                          : "00.00"
                          }`}
                        fontWeight={500}
                        color={Colors.nightGray}
                      />
                    </span>
                  </div>
                </div>
                <div
                  className={"divider"}
                  style={{ margin: "7px 0px 7px 0px" }}
                ></div>
                <div className={"frequency-flex-right"}>
                  <Body
                    text={"Fee (20%)"}
                    className={"leftValue"}
                    color={Colors.nightGray}
                  />
                  <div className={"rightValue"}>
                    <span className={"normalSpan"}>
                      <Body
                        text={`$ ${!isNaN(fee) && typeof fee !== "string"
                          ? fee.toFixed(2)
                          : "00.00"
                          }`}
                        fontWeight={500}
                        color={Colors.nightGray}
                      />
                    </span>
                  </div>
                </div>
                <div className={"frequency-flex-right"}>
                  <Body
                    text={"Tax (5%)"}
                    className={"leftValue"}
                    color={Colors.nightGray}
                  />
                  <div className={"rightValue"}>
                    <span className={"borderSpan"}>
                      <Body
                        text={`$ ${!isNaN(tax) && typeof tax !== "string"
                          ? tax.toFixed(2)
                          : "00.00"
                          }`}
                        fontWeight={500}
                        color={Colors.nightGray}
                      />
                    </span>
                  </div>
                </div>
                <div className={"frequency-flex-right"}>
                  <Body
                    text={"Total Amount"}
                    className={"leftValue"}
                    color={Colors.nightGray}
                  />

                  <div className={"rightValue"}>
                    {" "}
                    <Heading4Medium
                      text={`$ ${!isNaN(totalPay) && typeof totalPay !== "string"
                        ? totalPay.toFixed(2)
                        : gig_data.total_amount
                        }`}
                      color={Colors.nightGray}
                    />
                  </div>
                </div>
                <Grid
                  justifyContent={"flex-end"}
                  style={{ display: "flex", paddingTop: "20px" }}
                >
                  <TransparentButton
                    className="transparentbutton"
                    text={strings.Back}
                    width={"90px"}
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
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CGIGEDatesFrequency;
