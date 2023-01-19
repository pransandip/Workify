import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { Tooltip } from "bootstrap";
import { useDispatch } from "react-redux";

import { ACTIONS } from "../../store/actions";
// import images
import Grid from "@mui/material/Grid";

// import axios
import axios from "../../api/axios";

import Sidebar from "../../Styles-Elements/Sidebar/Sidebar";
import Header from "../../Styles-Elements/Heading/Header";
import { SIDEBAR_STATE } from "../../Helpers/Enums";
import "./Schedule.scss";
import { getDate } from "date-fns";

// Importing localised strings
// const strings = require('../../localisation_en.json')

let tooltipInstance = null;

function Schedule(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showTooltip, setShowTooltip] = useState(false);
  const [description, setDescription] = useState(false);
  const [singleData, setSingleData] = useState([]);
  const [multipleData, setMultipleData] = useState([]);
  const [activeMultipleData, setActiveMultipleData] = useState([]);

  // const events = [{ title: "today's event", date: new Date(new Date().setDate(new Date().getDate() - 5)) },
  // { title: "today's event", date: new Date(new Date().setDate(new Date().getDate() - 4)) }];
  // console.log(new Date())

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const getDate = (startdate, starttime) => {
    return new Date(
      `${new Date(startdate).toDateString()} ${new Date(
        starttime
      ).toTimeString()}`
    );
  };

  const getTime = (startTime, endTime) => {
    return (
      new Date(`${startTime}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) +
      ` - ` +
      new Date(`${endTime}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  };

  const getAllActiveSingleData = () => {
    axios
      .get(`/api/gig/getall?status=${"active"}&day_type=${"single"}`, config)
      .then((res) => {
        // console.log(res.data.data)
        var sData = res.data.data;
        var arr = [];
        sData.map((item) => {
          let obj = {
            id: item.id,
            title: `${getTime(item.starttime, item.endtime)} ${item.position}`,
            start: getDate(item.startdate, item.starttime),
            end: getDate(item.startdate, item.endtime),
            //allDay: true,
            editable: false,
            clickable: false,
            overlap: false,
            extendedProps: {
              description: item.position,
            },
            //new Date(item.startdate),
          };
          arr.push(obj);
          // console.log(item.id)
          // console.log(item.position)
          // console.log(item.startdate)
        });
        setSingleData(arr);
      })
      .catch((error) => console.log(error));
  };

  const getAllActiveMultipleData = () => {
    axios
      .get(
        `/api/gig/getall?status=${"complete"}&page=1&day_type=multiple`,
        config
      )
      .then((res) => {
        console.log(res.data.data);
        var sData = res.data.data;
        var arr = [];
        sData.map((item) => {
          let obj = {
            id: item.id,
            title: `${getTime(item.starttime, item.endtime)} ${item.position}`,
            start: getDate(item.startdate, item.starttime),
            end: getDate(
              new Date(item.enddate).setDate(
                new Date(item.enddate).getDate() + 1
              ),
              item.endtime
            ),
            allDay: true,
            editable: false,
            clickable: false,
            overlap: true,
            extendedProps: {
              description: item.position,
            },
          };
          arr.push(obj);
          // console.log(item.id)
          // console.log(item.position)
          // console.log(item.startdate)
        });
        setMultipleData(arr);
      })
      .catch((error) => console.log(error));
  };

  const getActiveMultipleData = () => {
    axios
      .get(
        `/api/gig/getall?status=${"active"}&page=1&day_type=multiple`,
        config
      )

      .then((res) => {
        var sData = res.data.data;
        var arr = [];
        sData.map((item) => {
          let obj = {
            id: item.id,
            title: `${getTime(item.starttime, item.endtime)} ${item.position}`,
            start: getDate(item.startdate, item.starttime),
            end: getDate(
              new Date(item.enddate).setDate(
                new Date(item.enddate).getDate() + 1
              ),
              item.endtime
            ),
            allDay: true,
            editable: false,
            clickable: false,
            overlap: true,
            extendedProps: {
              description: item.position,
            },
          };
          arr.push(obj);
          // console.log(item.id)
          // console.log(item.position)
          // console.log(item.startdate)
        });
        setActiveMultipleData(arr);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllActiveSingleData();
    getAllActiveMultipleData();
    getActiveMultipleData();
  }, []);

  let allData = [...singleData, ...multipleData, ...activeMultipleData];
  console.log(allData);

  const getSelectedData = (id, path) => {
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
    axios
      .get(`/api/gig/specific/${parseInt(id)}`, config)
      .then((res) => {
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
        history.push(path);
        dispatch({
          type: ACTIONS.SIDE_BAR_STATE,
          payload: SIDEBAR_STATE.GIGS,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleEventClick = (clickInfo) => {
    // alert(`${clickInfo.event.id}`)
    console.log(clickInfo.event.id);
    let gig_id = clickInfo.event.id;
    let path = `/gig-all-details`;
    localStorage.setItem("selcted_gig", gig_id);
    getSelectedData(gig_id, path);
  };

  const handleMouseEnter = (info) => {
    if (info.event.extendedProps.description) {
      tooltipInstance = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        html: true,
        placement: "top",
        trigger: "hover",
        container: "body",
      });

      tooltipInstance.show();
    }
  };

  const handleMouseLeave = (info) => {
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
  };

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className="main-mid-container">
        <div className="schdule-holder">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {allData.length > 0 && (
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  initialView="dayGridMonth"
                  events={allData}
                  eventClick={handleEventClick}
                  eventMouseEnter={handleMouseEnter}
                  eventMouseLeave={handleMouseLeave}
                  eventDisplay="block"
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
