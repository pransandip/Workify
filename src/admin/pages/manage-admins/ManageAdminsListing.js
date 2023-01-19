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
import { InputLabel } from '../../../Styles-Elements/Labels';
import Pagination from '../../../Styles-Elements/pagination/Pagination';
import SuccessIcon from '../../../image-assets/structure/success-alert.svg'
// import images
import CroseImg from '../../../image-assets/structure/crose-icon-gray.svg';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';


import AdminHeader from '../../layout/header/AdminHeader.js';
import AdminSidebar from '../../layout/sidebar/AdminSidebar.js';

import './ManageAdminsListing.scss';

// Importing localised strings
// const strings = require('../../localisation_en.json');

function ManageAdminsListing(props) {
  
  const [addEditIndustryopen, setOpen] = React.useState(false);
  const [deleteProvinceopen, deleteOpen] = React.useState(false);
  const [successStaffopen, successOpen] = React.useState(false);

  const addEditInductryOpen = () => { setOpen(true); };
  const deleteClickOpen = () => { deleteOpen(true); };
  const successStaffClickopen = () => {
    successOpen(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    deleteOpen(false);
    successOpen(false);
  };
  
  // const label = { inputProps: { 'aria-label': 'Switch demo' } };

  function createData( firstname, lastname,email, status, Action, ) {
    return { firstname, lastname, email, status, Action };
  }
  const rows = [
    createData('Frozen', 'yoghurt', 'frozen@gmail.com', '', ''),
    createData('Frozen', 'yoghurt', 'frozen@gmail.com', '', ''),
    createData('Frozen', 'yoghurt', 'frozen@gmail.com', '', ''),
    createData('Frozen', 'yoghurt', 'frozen@gmail.com', '', ''),
  ];
  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader  />
      <div className='main-mid-container'>
        <div className="staff-holder">
          <Grid container spacing={2}>
            <Grid item xs={12} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'space-between'} margin={'0px 0px 24px 0px'}>
                <Heading3Bold text={'Manage Admins '}  color={Colors.black} className={'heading3bold'} />
                <PrimaryButton className='primarybutton' width={'155px'} onClick={addEditInductryOpen} text={'Create Admin'} />
            </Grid>
            <Grid item xs={12}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name </TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell align="center">Status </TableCell>
                      <TableCell align="center">Actions </TableCell>
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
                        <TableCell component="th" scope="row">{row.email}</TableCell>
                        <TableCell align="center"><Switch /></TableCell>
                        
                        <TableCell align="center">
                         <Link to="#" className={'edit-color'}  onClick={successStaffClickopen}>{'Resend Invite'}</Link>
                          <span className={'cenerLine'}>|</span> 
                          <Link to="#" className={'edit-color'} onClick={addEditInductryOpen}>{'Edit'}</Link>
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

          <Dialog
            open={addEditIndustryopen}
            onClose={handleClose}
            className={'modalwidth548'}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Create Admin'}
                <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
            </DialogTitle>

            <DialogContent>
              <div className="grid-item">
                <InputLabel text={'First Name'} color={Colors.nightGray} padding={'0 0 4px 0'} className={'inputlabel'} />
                <Textfield className="textfield" placeholder={''} />
              </div>
              <div className="grid-item">
                <InputLabel text={'Last Name'} color={Colors.nightGray} padding={'0 0 4px 0'} className={'inputlabel'} />
                <Textfield className="textfield" placeholder={''} />
              </div>
              <div className="grid-item">
                <InputLabel text={'Email'} color={Colors.nightGray} padding={'0 0 4px 0'} className={'inputlabel'} />
                <Textfield className="textfield" placeholder={''} />
              </div>
            </DialogContent>
            <DialogActions style={{justifyContent:'between'}}>
                <TransparentButton className='transparentbutton' onClick={handleClose} text={'Back'} width={'auto'}  />
                <PrimaryButton className='primarybutton' autoFocus text={'Create Admin'} width={'210px'}  />{/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>   


          {/*Delete Modal*/}
          <Dialog
            open={deleteProvinceopen}
            onClose={handleClose}
            className={'modalwidth548'}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Delete Admin '}
                <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {'Are you sure you want to delete this Admin'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <TransparentButton className='transparentbutton' onClick={handleClose} text={'No'} width={'auto'}  />
              <PrimaryButton className='primarybutton' onClick={handleClose} autoFocus text={'Yes'} width={'210px'}  />{/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>   

           {/*success modal*/}
          <Dialog
            open={successStaffopen}
            onClose={handleClose}
            className={'modalwidth610'}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{textAlign: 'center'}}
          >
            <DialogTitle id="alert-dialog-title">
                <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
            </DialogTitle>
            <DialogContent>
              <h2 className={'heading30'}><img src={SuccessIcon} alt="" className="icon60" />{'Admin Invite Sent Successfully'}</h2>
              <DialogContentText id="alert-dialog-description">
                You have invited <b>Kevin Hashimoto</b> (kevin@workbriefly.com) to WorkBriefly as an <b>Admin</b>.
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{justifyContent:'center'}}>
              <PrimaryButton className='primarybutton' onClick={handleClose} autoFocus text={'Continue'} width={'210px'}  />{/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>        
        </div>
      </div>
    </div>
  )
}

export default ManageAdminsListing
