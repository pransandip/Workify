
// Importing material ui
import * as React from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Heading3Bold, Body, Heading6Medium } from '../../../../Styles-Elements/Labels';
import * as Colors from '../../../../Styles-Elements/Colors';

import GigDetailSingledayGigInfo from './gig-active-detail-admin/gig-active--singleday-detail/gigdetail-singleday-giginfo/GigDetailSingledayGigInfo';
// import GigDetailApplicantSingleDay from './gig-active-detail-admin/gig-active--singleday-detail/gigdetail-applicant-singleday/GigDetailApplicantSingleDay';
// import GigDetailBookedWorkerSingleDay from './gig-active-detail-admin/gig-active--singleday-detail/gigdetail-bookedworker-singleday/GigDetailBookedWorkerSingleDay';
// import GigDetailInvoiceSingleDay from './gig-active-detail-admin/gig-active--singleday-detail/gigdetail-invoice-singleday/GigDetailInvoiceSingleDay';

// import GigDetailMultipledayGigInfo from './gig-active-detail-admin/gig-active--multiple-detail/gigdetail-multipleday-giginfo/GigDetailMultipledayGigInfo';
import GigDetailApplicantMultipleDay from './gig-active-detail-admin/gig-active--multiple-detail/gigdetail-applicant-multipleday/GigDetailApplicantMultipleDay';
import GigDetailBookedWorkerMultipleDay from './gig-active-detail-admin/gig-active--multiple-detail/gigdetail-bookedworker-multipleday/GigDetailBookedWorkerMultipleDay';
import GigDetailInvoiceMultipleDay from './gig-active-detail-admin/gig-active--multiple-detail/gigdetail-invoice-multipleday/GigDetailInvoiceMultipleDay';


// Importing images
import HeaderImage from '../../../../image-assets/product/h-product-logo1.png';
import editBlueIcon from '../../../../image-assets/structure/editblue.svg';


import AdminHeader from '../../../layout/header/AdminHeader.js';
import AdminSidebar from '../../../layout/sidebar/AdminSidebar.js';

import './../GIGS.scss'

// Importing localised strings
// const strings = require('../../../../localisation_en.json')

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function GigDetailsAdmin(props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();
  const routeChangeCreateGIGAdmin = () =>{
    let path = `/create-git-admin`;
    history.push(path);
  }
  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
        <AdminHeader />
      <div className='main-mid-container'>
        <div className='gig-detail-main-holder'>
          <Breadcrumbs aria-label="breadcrumb" mb={2}>
            <Link underline="hover" color="inherit" to="/gig">Gigs</Link>
            <Typography color="text.primary">Barista</Typography>
          </Breadcrumbs>
            <div>
            <div className={'topHeader'}>
              <img src={HeaderImage} alt="name" className={'topHeaderImg'} />
              <div className={'relative'} >
                <p className={'status-p'}><span className={'status'} style={{background: 'var(--error)'}}></span> 0/3</p>
                <Heading3Bold text={'Ware house Mover'} color={Colors.black} className={'heading3bold'} />
                <div className={'topHeaderRow'}>
                  <Box className={'infoBox'}>
                    <Body color={Colors.lightGray} className={'body'} text={'Company'} />
                    <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'JJ Bean'} />
                  </Box>
                  <Box className={'infoBox'}>
                    <Body color={Colors.lightGray} className={'body'} text={'Date'} />
                    <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.Primary} text={'Sat, Mar 14, 2022 - Mon, Mar 16, 2022'} />
                  </Box>
                  <Box className={'infoBox'}>
                    <Body color={Colors.lightGray} className={'body'} text={'Time'} />
                    <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'11:00 AM - 5:00 PM'} />
                  </Box>
                  <Box className={'infoBox'}>
                    <Body color={Colors.lightGray} className={'body'} text={'Pay'} />
                    <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'$56.00 ($14/hr)'} />
                  </Box>
                  <Box className={'infoBox'}>
                    <Body color={Colors.lightGray} className={'body'} text={'Pay Frequency'} />
                    <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'Daily'} />
                  </Box>
                  <Box className={'infoBox'}>
                    <Body color={Colors.lightGray} className={'body'} text={'Unpaid Break'} />
                    <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'45 mins'} />
                  </Box>
                  <Box className={'infoBox'}>
                    <Body color={Colors.lightGray} className={'body'} text={'Paid Break'} />
                    <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'15 mins'} />
                  </Box>
                </div>
              </div>
              <Box className='editbutton' onClick={routeChangeCreateGIGAdmin}>
                <img src={editBlueIcon} alt="name" />
                <Body color={Colors.Primary} fontWeight={'500'} padding={'0 0 0 10px'} text={'Edit'} />
              </Box>
            </div>
            </div>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Gig Info" {...a11yProps(0)} />
                    <Tab label="Applicants" {...a11yProps(1)} />
                    <Tab label="Booked Workers" {...a11yProps(2)} />
                    <Tab label="Invoice" {...a11yProps(3)} />
                  </Tabs>
                </Box>
                <TabPanel className={'tabpanels'} value={value} index={0}>
                  <GigDetailSingledayGigInfo />
                  {/*<GigDetailMultipledayGigInfo />*/}
                </TabPanel>
                <TabPanel className={'tabpanels'} value={value} index={1}>
                  {/*<GigDetailApplicantSingleDay />*/}
                  <GigDetailApplicantMultipleDay />
                </TabPanel>
                <TabPanel className={'tabpanels'} value={value} index={2}>
                  {/*<GigDetailBookedWorkerSingleDay />*/}
                  <GigDetailBookedWorkerMultipleDay />
                </TabPanel>
                <TabPanel className={'tabpanels'} value={value} index={3}>
                  {/*<GigDetailInvoiceSingleDay />*/}
                  <GigDetailInvoiceMultipleDay />
                </TabPanel>
              </Box>
        </div>
      </div>
    </div>
  )
}

export default GigDetailsAdmin
