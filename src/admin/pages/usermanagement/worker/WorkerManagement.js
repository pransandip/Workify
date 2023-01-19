import React from 'react';
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
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
import * as Colors from '../../../../Styles-Elements/Colors';
import { Heading3Bold,  } from '../../../../Styles-Elements/Labels';
import { PrimaryButton,TransparentButton } from '../../../../Styles-Elements/Buttons';
import { Textfield } from '../../../../Styles-Elements/Inputs';
// import { InputLabel } from '../../../../Styles-Elements/Labels';
import Pagination from '../../../../Styles-Elements/pagination/Pagination';
// import images
import CroseImg from '../../../../image-assets/structure/crose-icon-gray.svg';
import searchIcon from '../../../../image-assets/structure/search-icon.svg';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AdminHeader from '../../../layout/header/AdminHeader.js';
import AdminSidebar from '../../../layout/sidebar/AdminSidebar.js';

import './WorkerManagement.scss';

// Importing localised strings
// const strings = require('../../localisation_en.json');

//filter status dropdown
function WorkerManagement(props) {

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
  

  const [Astatus, setApprovalstatus ] = React.useState('');
  const handleChangeRole = (event) => {
    setApprovalstatus (event.target.value);
  };
 
  const aprovestatus = [
    {
      value: 'Pending ',
      label: 'Pending',
    },
    {
      value: 'Approved',
      label: 'Approved',
    },
    {
      value: 'Rejected ',
      label: 'Rejected ',
    },
  ];

  function createData( firstname, lastname, dob, email, confirmed, completed, status, approvalstatus, action ) {
    return { firstname, lastname, dob, email, confirmed, completed,  status, approvalstatus, action};
  }
  const rows = [
    createData('Frozen ', 'yoghurt', '02/05/2022', 'frozen@gmail.com', '80', '110', '', '', ''),
    createData('Frozen ', 'yoghurt', '02/05/2022', 'frozen@gmail.com', '80', '110', '', '', ''),
    createData('Frozen ', 'yoghurt', '02/05/2022', 'frozen@gmail.com', '80', '110', '', '', ''),
    createData('Frozen ', 'yoghurt', '02/05/2022', 'frozen@gmail.com', '80', '110', '', '', ''),
    createData('Frozen ', 'yoghurt', '02/05/2022', 'frozen@gmail.com', '80', '110', '', '', ''),
    createData('Frozen ', 'yoghurt', '02/05/2022', 'frozen@gmail.com', '80', '110', '', '', ''),
    
  ];


  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader  />
      <div className='main-mid-container'>
        <div className="admin-listing-holder">
          <Grid container spacing={2}>
            <Grid item xs={12} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'space-between'} margin={'0px 0px 24px 0px'}>
                <Heading3Bold text={'Worker Management '}  color={Colors.black} className={'heading3bold'} />
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
                      <MenuItem value={'pending'}>Pending</MenuItem>
                      <MenuItem value={'approved'}>Approved </MenuItem>
                      <MenuItem value={'rejected'}>Rejected</MenuItem>
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
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Date of birth</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Confirmed Gigs</TableCell>
                      <TableCell>Completed Gigs</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Approval Status  </TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.Name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.firstname}</TableCell>
                        <TableCell component="th" scope="row">{row.lastname}</TableCell>
                        <TableCell component="th" scope="row">{row.dob}</TableCell>
                        <TableCell component="th" scope="row">{row.email}</TableCell>
                        <TableCell component="th" scope="row">{row.confirmed}</TableCell>
                        <TableCell component="th" scope="row">{row.completed}</TableCell>
                        <TableCell component="th" scope="row"><Switch/></TableCell>
                        <TableCell component="th" scope="row">
                        <div className="dropdownitem-td">
                          <TextField className="textfield role-div"
                            id=""
                            select
                            placeholder={'Select	Approval Status'}
                            value={Astatus}
                            onChange={handleChangeRole}
                          >
                            {aprovestatus.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        </TableCell>
                        <TableCell align="center">
                          <Link to="/Worker-management-edit" className={'edit-color'}>{'Edit'}</Link>
                          <span className={'cenerLine'}>|</span> 
                          <Link a className={'delete-color'} onClick={deleteClickOpen}>{'Delete'}</Link>
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
              {'Delete Worker  '}
                <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {'Are you sure you want to delete this Worker '}
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

export default WorkerManagement
