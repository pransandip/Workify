import React from 'react';
import * as Colors from '../../../Styles-Elements/Colors'
import { Heading6Medium } from '../../../Styles-Elements/Labels';
import { PrimaryButton,TransparentButton } from '../../../Styles-Elements/Buttons';
// Material UI
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// images
import CroseImg from '../../../image-assets/structure/crose-icon-gray.svg';
import ConpanyLogo from '../../../image-assets/product/round-img1.png';
import collapseIcon from '../../../image-assets/structure/collapseicon.svg';

import './AdminHeader.scss';


// Importing localised strings
// const strings = require('../../localisation_en.json')

function AdminHeader(props) {
  
  const [logoutOpen, setLogout] = React.useState(false);
  const logoutClickOpen = () => {
    setLogout(true);
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setLogout(false);
  };

    return <div className="main-header">
    {/*<img height={24} src={notificationIcon} alt="name"  />*/}
        <div className='profile-box'>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
          <img src={ConpanyLogo} alt="name" className={'round-icon34'} />
          <span className={'profile-name'}>Ivan RL</span>
          <img src={collapseIcon} width={'16px'} className='' alt="name" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>
              <Heading6Medium text={'log Out'} onClick={logoutClickOpen}
                padding={'0'}
                color={Colors.Primary}
                cursor={'pointer'}
                />
            </MenuItem>
          </Menu>
      </div>
      <Dialog
        open={logoutOpen}
        onClose={handleClose}
        className={'modalwidth548'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'log Out'}
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {'Are you sure you want to logout'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TransparentButton className='transparentbutton' onClick={handleClose} text={'No'} width={'auto'}  />
          <PrimaryButton className='primarybutton' autoFocus text={'Yes'} width={'210px'}  />{/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>
    </div>


}

export default AdminHeader;
