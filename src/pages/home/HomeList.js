import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heading3Bold,
  Heading5Medium,
  Heading4Medium,
} from "../../Styles-Elements/Labels";
import * as Colors from "../../Styles-Elements/Colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "../../api/axios";

import "./HomePage.scss";
import HomeEmpty from "../../pages/home/HomeEmpty";

// Importing localised strings
const strings = require("../../localisation_en.json");

function HomeList(props) {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const [upComingData, setUpComingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllUpcomingData = () => {
    axios
      .get(`/api/gig/getupcoming`, config)
      .then((res) => {
        setLoading(false);
        // dispatch({
        //   type: ACTIONS.GET_SINGLE_DAY_BUSINESS_ACTIVE_GIG,
        //   payload: res.data.data,
        // });
        setUpComingData(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    getAllUpcomingData();
  }, []);
  function createData(
    Date: string,
    Vacancies: string,
    Requests: string,
    Position: string,
    Time: string,
    TotalCost: string,
    Actions: string
  ) {
    return { Date, Vacancies, Requests, Position, Time, TotalCost, Actions };
  }

  const rows = [
    createData(
      "22 Jun",
      "3/3",
      "3 accepted",
      "Barista",
      "1:00PM- 8:00 PM",
      "$250.00 ($14/hr)",
      "View Booked Workers"
    ),
    createData(
      "22 Jun",
      "1/3",
      "1 accepted",
      "General Labourer",
      "1:00PM- 8:00 PM",
      "$250.00 ($14/hr)",
      "View Booked Workers"
    ),
    createData(
      "22 Jun",
      "0/3",
      "1 rejected",
      "General Labourer",
      "1:00PM- 8:00 PM",
      "$250.00 ($14/hr)",
      "View Booked Workers"
    ),
    createData(
      "22 Jun",
      "0/3",
      "0 sent",
      "General Labourer",
      "1:00PM- 8:00 PM",
      "$250.00 ($14/hr)",
      "View Booked Workers"
    ),
  ];
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HomeEmpty />
        </Grid>
        <Grid item xs={12}>
          {/* <Heading5Medium text={strings.Spend} color={Colors.nightGray} margin={'0px 0px 10px 0px'}  />
          <Box className={'spend-box'}>
            <h2 className={'font30'} color={Colors.black}>$1,000.00 <span>spent <Link>this week</Link></span></h2>
            <Link className={'see-more'}>See More</Link>
          </Box> */}
          {console.log(upComingData)}
          {
            upComingData && upComingData.length > 0 && (
              <>
                <Heading4Medium
                  text={strings.upcomingGigs}
                  color={Colors.nightGray}
                  margin={"15px 0px 10px 0px"}
                />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="center">Vacancies</TableCell>
                        <TableCell align="center">Requests</TableCell>
                        <TableCell align="center">Position/Title</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Total Cost</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {upComingData.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {new Date(row.startdate).toDateString()}
                          </TableCell>
                          <TableCell align="center">
                            <span
                              className={"status"}
                              style={{ background: "var(--success)" }}
                            ></span>
                            {row.vacancies}
                          </TableCell>
                          <TableCell align="center">
                            {row.accept_count}
                          </TableCell>
                          <TableCell align="center">{row.position}</TableCell>
                          <TableCell align="center">{row.Time}</TableCell>
                          <TableCell align="center">{`$${row.total_amount}`}</TableCell>
                          <TableCell align="center">
                            <Link>{"View bookedworkers"}</Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )

            // <div
            //   style={{
            //     height: "200px",
            //     width: "100%",
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //   }}
            // >
            //   <span>No Upcoming Gig available now</span>
            // </div>
          }
        </Grid>
      </Grid>
    </div>
  );
}
export default HomeList;
