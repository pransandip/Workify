import React from 'react';
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Colors from '../../../Styles-Elements/Colors';
import { Heading3Bold,  } from '../../../Styles-Elements/Labels';
import { PrimaryButton,TransparentButton } from '../../../Styles-Elements/Buttons';
import { Textfield } from '../../../Styles-Elements/Inputs';
import Pagination from '../../../Styles-Elements/pagination/Pagination';
import UploadedImg from '../../../image-assets/product/h-product-logo1.png';
// import images
import CroseImg from '../../../image-assets/structure/crose-icon-gray.svg';
import searchIcon from '../../../image-assets/structure/search-icon.svg';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AdminHeader from '../../layout/header/AdminHeader.js';
import AdminSidebar from '../../layout/sidebar/AdminSidebar.js';

import './GigManagement.scss';

// Importing localised strings
// const strings = require('../../localisation_en.json');

//filter status dropdown
function GigManagement(props) {

const [age, setAge] = React.useState('');
const handleChange = (event) => {
  setAge(event.target.value);
};
//filter status dropdown end
  
  const [deleteProvinceopen, deleteOpen] = React.useState(false);

  const deleteClickOpen = () => { deleteOpen(true); };

  const handleClose = () => {
    deleteOpen(false);
  };
  

  // const [Astatus, setApprovalstatus ] = React.useState('');
  // const handleChangeRole = (event) => {
  //   setApprovalstatus (event.target.value);
  // };


  function createData( positiontitle, companyname, image, startdate, enddate, starttime, endtime, totalamount, paymentfrequency, totalvacancies, status, actions ) {
    return { positiontitle, companyname, image, startdate, enddate, starttime,  endtime, totalamount, paymentfrequency, totalvacancies, status, actions};
  }
  const rows = [
    createData('Lorem ipsum ', 'Lorem ipsum dolor sit amet', '', '02/05/2022', '04/06/2022', '08:AM', '05:PM', '500000', 'Lorem ipsum', '25', 'Completed', ''),
    createData('Lorem ipsum dolor ', 'Lorem ipsum', '', '02/05/2022', '04/06/2022', '08:AM', '05:PM', '500000', 'Lorem ipsum', '25', 'Completed', ''),
    createData('Lorem ipsum ', 'Lorem ipsum dolor sit', '', '02/05/2022', '04/06/2022', '08:AM', '05:PM', '500000', 'Lorem ipsum', '25', 'Completed', ''),
    createData('Lorem ipsum dolor ', 'Lorem ipsum', '', '02/05/2022', '04/06/2022', '08:AM', '05:PM', '500000', 'Lorem ipsum', '25', 'Completed', ''),
    createData('Lorem ipsum ', 'Lorem ipsum dolor sit amet', '', '02/05/2022', '04/06/2022', '08:AM', '05:PM', '500000', 'Lorem ipsum', '25', 'Completed', ''),
    
    
  ];
  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader  />
      <div className='main-mid-container'>
        <div className="admin-listing-holder">
          <Grid container spacing={2}>
            <Grid item xs={12} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'space-between'} margin={'0px 0px 24px 0px'}>
                <Heading3Bold text={'Gig Management '}  color={Colors.black} className={'heading3bold'} />
                <div className="filteblock-rgt d-flex">
                <div className="filtercol">
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select className="align-left"
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                      
                    >
                      <MenuItem value="">
                        <em>Status</em>
                      </MenuItem>
                      <MenuItem value={'Available'}>Available</MenuItem>
                      <MenuItem value={'Confirmed'}>Confirmed </MenuItem>
                      <MenuItem value={'Completed'}>Completed</MenuItem>
                      <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                  <div className="grid-item filtercol filtercol-search">
                    <Textfield className="textfield" placeholder={'Search...'} />
                    <img src={searchIcon} alt="name" className={'filtersearchicon'} />
                  </div>
                </div>
            </Grid>
            <Grid item xs={12}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Position Title</TableCell>
                      <TableCell>Company name</TableCell>
                      <TableCell align="center">Image</TableCell>
                      <TableCell>Start date</TableCell>
                      <TableCell>End date</TableCell>
                      <TableCell>Start time</TableCell>
                      <TableCell>End time</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Payment frequency</TableCell>
                      <TableCell>Total Vacancies</TableCell>
                      <TableCell align="center">Status </TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.Name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.positiontitle}</TableCell>
                        <TableCell component="th" scope="row">{row.companyname}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          <img src={UploadedImg} className={'busLogo'} alt='some value' />
                        </TableCell>
                        <TableCell component="th" scope="row">{row.startdate}</TableCell>
                        <TableCell component="th" scope="row">{row.enddate}</TableCell>
                        <TableCell component="th" scope="row">{row.starttime}</TableCell>
                        <TableCell component="th" scope="row">{row.endtime}</TableCell>
                        <TableCell component="th" scope="row">{row.totalamount}</TableCell>
                        <TableCell component="th" scope="row">{row.paymentfrequency}</TableCell>
                        <TableCell component="th" scope="row">{row.totalvacancies}</TableCell>
                        <TableCell align="center"><Link to="#" className={'chips green'} style={{color: 'var(--success)'}}>{row.status}</Link></TableCell>
                        <TableCell align="center">
                          <Link to="/create-git-admin" className={'edit-color'}>{'Edit'}</Link>
                          <span className={'cenerLine'}>|</span> 
                          <Link to="#" className={'delete-color'} onClick={deleteClickOpen}>{'Delete'}</Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
            <Pagination />
            </Grid>
          </Grid>



          {/*Delete Modal*/}
          <Dialog
            open={deleteProvinceopen}
            onClose={handleClose}
            className={'modalwidth548'}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Delete Certificate '}
                <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {'Are you sure you want to delete this Certificate'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <TransparentButton className='transparentbutton' onClick={handleClose} text={'No'} width={'auto'}  />
              <PrimaryButton className='primarybutton' onClick={handleClose} autoFocus text={'Yes'} width={'210px'}  />{/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>           
        </div>
      </div>
    </div>
  )
}

export default GigManagement
