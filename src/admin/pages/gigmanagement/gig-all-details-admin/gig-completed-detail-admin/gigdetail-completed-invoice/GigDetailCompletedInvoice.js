import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { Heading3Bold,Body} from '../../../../../../Styles-Elements/Labels';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DatePicker, { DateObject } from "react-multi-date-picker";

import * as Colors from '../../../../../../Styles-Elements/Colors';
import '../../../GIGS.scss'

// images
import searchIcon from '../../../../../../image-assets/structure/search-icon.svg';


// Importing localised strings
const strings = require('../../../../../../localisation_en.json');

function GigDetailCompletedInvoice() {

  function createData(InvoiceNo,  Worker,  GigLength,  InvoiceDate,  TotalHours,  TotalEarnings,  Status,  Action,) {
    return { InvoiceNo, Worker, GigLength, InvoiceDate, TotalHours, TotalEarnings ,Status, Action  };
  }

  const rows = [
    createData('#543453453', 'Richard Michicaels', 'Apr 11, 2022 - Apr 15, 2022', 'Apr 15, 2022', '13:00 hrs', '$ 50.00', 'Paid', 'Download Invoice'),
    createData('#543453453', 'Richard Michicaels', 'Apr 11, 2022 - Apr 15, 2022', 'Apr 15, 2022', '13:00 hrs', '$ 50.00', 'Mark Paid', 'Download Invoice'),
    createData('#543453453', 'Richard Michicaels', 'Apr 11, 2022 - Apr 15, 2022', 'Apr 15, 2022', '13:00 hrs', '$ 50.00', 'Mark Paid', 'Download Invoice'),
    createData('#543453453', 'Richard Michicaels', 'Apr 11, 2022 - Apr 15, 2022', 'Apr 15, 2022', '13:00 hrs', '$ 50.00', 'Paid', 'Download Invoice'),
    createData('#543453453', 'Richard Michicaels', 'Apr 11, 2022 - Apr 15, 2022', 'Apr 15, 2022', '13:00 hrs', '$ 50.00', 'Mark Paid', 'Download Invoice'),
    createData('#543453453', 'Richard Michicaels', 'Apr 11, 2022 - Apr 15, 2022', 'Apr 15, 2022', '13:00 hrs', '$ 50.00', 'Mark Paid', 'Download Invoice'),
  ];

  const [value, setValue] = useState([
    new DateObject().setDay(15),
    new DateObject().add(1, "month").setDay(15),
  ]);
  const [props, setProps] = useState({
    value: new Date(),
    format: "ddd, MMM DD, YYYY",
  });


  return (
    <>
      <Box className={'empty-box'}>
        <Heading3Bold className={'heading3bold'} alignCenter={'center'} color={Colors.black} text={'There are currently no invoice available.'} />
        <Body className={'body'} color={Colors.midGray} alignCenter={'center'} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s.'} />
      </Box>

      <Box className={'tableParent'}>
        <Box className={'date-search-filter'}>
          <div className={'date-box'} >
            <DatePicker {...props}
              onPropsChange={setProps}
              value={value}
              onChange={setValue}
              range
              numberOfMonths={1}
              variant="outlined"
            />
          </div>
          <Box className={'search-box'}>
            <img src={searchIcon} alt="name" className={'search-icon'} />
            <TextField placeholder={'Search by name and invoice no.'} variant="outlined" />
          </Box>
        </Box>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Invoice No.</TableCell>
                  <TableCell>Worker</TableCell>
                  <TableCell>Gig Length</TableCell>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Total Hours</TableCell>
                  <TableCell>Total Earnings</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.InvoiceNo}</TableCell>
                    <TableCell>{row.Worker}</TableCell>
                    <TableCell>{row.GigLength}</TableCell>
                    <TableCell>{row.InvoiceDate}</TableCell>
                    <TableCell>{row.TotalHours}</TableCell>
                    <TableCell><Body className={'body'} color={Colors.success} fontWeigh={'500'} text={row.TotalEarnings} /></TableCell>
                    <TableCell>
                      {/*<Link className={'edit-color'}>{row.Status}</Link>*/}
                      <Link className={'chips green'}>{row.Status}</Link>
                    </TableCell>
                    <TableCell><Link className={'edit-color'}>{strings.DownloadInvoice}</Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default GigDetailCompletedInvoice
