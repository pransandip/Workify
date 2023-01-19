import React from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { TransparentButton } from '../../../Styles-Elements/Buttons';
import * as FontStyles from '../../../Styles-Elements/FontStyles';
import Collapse from '@mui/material/Collapse';

// import images
import sidebarLogo from '../../../image-assets/logo/sidebar-logo.svg'
import homeWhiteIcon from '../../../image-assets/structure/home-white-icon.svg'
import gigsWhiteIcon from '../../../image-assets/structure/gigs-white-icon.svg'
import scheduleWhiteIcon from '../../../image-assets/structure/schedule-white-icon.svg'
import staffWhiteIcon from '../../../image-assets/structure/staff-white-icon.svg'

import './AdminSidebar.scss'

// Importing localised strings
// const strings = require('../../localisation_en.json')

function AdminSidebar(props) {

  const [openOne, setOpenOne] = React.useState(false);
  const [openTow, setOpenTow] = React.useState(false);
  const [openThree, setOpenThree] = React.useState(false);
    const handleClickOne = () => {
      setOpenOne(!openOne);
    };
    const handleClickTow = () => {
      setOpenTow(!openTow);
    };
    const handleClickThree = () => {
      setOpenThree(!openThree);
    };

  const history = useHistory();
  const routeChangeDashboard = () =>{
      let path = `/admin-dashboard`;
      history.push(path);
  }
  const routeChangeGig = () =>{
    let path = `/gig-management`;
    history.push(path);
  }

  const routeChangeManageAdmin = () =>{
    let path = `/manage-admins-listing`;
    history.push(path);
  }
  const routeChangePushNotification = () =>{
    let path = `/push-notification`;
    history.push(path);
  }
  

  return (
    <div className={'sidebar admin-sidebar toggleSidebar'} >
      {/* <div className={'sideArrow'}>
        <MenuIcon className="menuIcon" />
        <CloseIcon className="closeIcon" />
      </div> */}
      <div className="sidebar-header">
        <img src={sidebarLogo} width={100} height={51} alt="name" />
      </div>

      <div className="sidebar-manage-strings-section">
        <div className={'sidebar-button-holder'}>
          <img src={homeWhiteIcon} alt="name" />
          <TransparentButton className='transparentbutton' theme={FontStyles.body} text={'Dashboard'} onClick={routeChangeDashboard}/>
        </div>

        <div className={'sidebar-button-holder sidedropdown-ar'} onClick={handleClickOne}>
          <img src={gigsWhiteIcon} alt="name" />
          <TransparentButton className='transparentbutton' theme={FontStyles.body} text={'Manage Settings'}/>
        </div>
        <Collapse in={openOne} timeout="auto" unmountOnExit>
          <Link to="/manage-province">Manage Province</Link>
          <Link to="/manage-industry">Manage Industry</Link>
          <Link to="/manage-license">Manage License</Link>
          <Link to="/manage-certificate">Manage Certificate</Link>
        </Collapse>

        <div className={'sidebar-button-holder sidedropdown-ar'} onClick={handleClickTow}>
          <img src={gigsWhiteIcon} alt="name" />
          <TransparentButton className='transparentbutton' theme={FontStyles.body} text={'User Management'}/>
        </div>
        <Collapse in={openTow} timeout="auto" unmountOnExit>
          <Link to="/worker-management">Worker Management</Link>
          <Link to="/business-management">Business Management</Link>
        </Collapse>

        <div className={'sidebar-button-holder'}>
          <img src={scheduleWhiteIcon} alt="name" />
          <TransparentButton className='transparentbutton' theme={FontStyles.body} text={'Gig Management'} onClick={routeChangeGig}/>
        </div>

        <div className={'sidebar-button-holder'}>
          <img src={staffWhiteIcon} alt="name" />
          <TransparentButton className='transparentbutton' theme={FontStyles.body} text={'Manage admins'} onClick={routeChangeManageAdmin}/>
        </div>
        <div className={'sidebar-button-holder'}>
          <img src={staffWhiteIcon} alt="name" />
          <TransparentButton className='transparentbutton' theme={FontStyles.body} text={'Custom Push notification'} onClick={routeChangePushNotification}/>
        </div>


        <div className={'sidebar-button-holder sidedropdown-ar'} onClick={handleClickThree}>
          <img src={gigsWhiteIcon} alt="name" />
          <TransparentButton className='transparentbutton' theme={FontStyles.body} text={'Content Management System'}/>
        </div>
        <Collapse in={openThree} timeout="auto" unmountOnExit>
          <Link to="/about-us">About us</Link>
          <Link to="/contact-us-enquiries">Contact us Enquiries</Link>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/faq-listing">FAQ</Link>
        </Collapse>
      </div>
    </div>
  )

}

export default AdminSidebar
