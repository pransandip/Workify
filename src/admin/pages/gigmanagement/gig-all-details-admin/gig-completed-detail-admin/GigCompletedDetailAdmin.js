
// Importing material ui
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import GigDetailCompletedGigInfo from './gigdetail-completed-giginfo/GigDetailCompletedGigInfo';
import GigDetailCompletedInvoice from './gigdetail-completed-invoice/GigDetailCompletedInvoice';
import GigDetailCompletedCostBreakdown from './gigdetail-completed-cost-breakdown/GigDetailCompletedCostBreakdown';


import { Heading3Bold, Body, Heading6Medium } from '../../../../../Styles-Elements/Labels';
import * as Colors from '../../../../../Styles-Elements/Colors';

// import Sidebar from '../../../../../Styles-Elements/Sidebar/Sidebar';
// import Header from '../../../../../Styles-Elements/Heading/Header';

import AdminHeader from '../../../../layout/header/AdminHeader.js';
import AdminSidebar from '../../../../layout/sidebar/AdminSidebar.js';

// Importing images
import HeaderImage from '../../../../../image-assets/product/h-product-logo1.png';

import '../../GIGS.scss';
// Importing localised strings
// const strings = require('../../../../../localisation_en.json');

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

function GigCompletedDetailAdmin(props) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader />
      <div className='main-mid-container'>
        <div className='gigcompleted-main-holder'>
        <Breadcrumbs aria-label="breadcrumb" mb={2}>
          <Link underline="hover" color="inherit" href="/">Gigs</Link>
          <Typography color="text.primary">Barista</Typography>
        </Breadcrumbs>
        <div>
          <div className={'topHeader'}>
            <img src={HeaderImage} alt="name" className={'topHeaderImg'} />
            <div className={'relative'} >
              <p style={{display: 'flex', alignItems: 'center'}} className={'status-p'}><span className={'status'} style={{background: 'var(--success)'}}></span> 0/3</p>
              <Box className='head-edit-copy-box' display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Heading3Bold text={'Ware house Mover'} color={Colors.black} className={'heading3bold'} />
              </Box>
              <div className={'topHeaderRow'} style={{flexWrap: 'wrap', paddingBottom: '8px'}}>
                <Box className={'infoBox'}>
                  <Body color={Colors.lightGray} className={'body'} text={'Company'} />
                  <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.nightGray} text={'JJ Bean'} />
                </Box>
                <Box className={'infoBox'}>
                  <Body color={Colors.lightGray} className={'body'} text={'Date'} />
                  <Heading6Medium fontWeight={700} className={'heading6medium'} color={Colors.Primary} text={'Sat, Mar 14, 2022'} />
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
          </div>
        </div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Gig Info" {...a11yProps(0)} />
              <Tab label="Cost Breakdown" {...a11yProps(1)} />
              <Tab label="Invoice" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel className={'tabpanels'} value={value} index={0}>
            <GigDetailCompletedGigInfo />
          </TabPanel>
          <TabPanel className={'tabpanels'} value={value} index={1}>
            <GigDetailCompletedCostBreakdown />
          </TabPanel>
          <TabPanel className={'tabpanels'} value={value} index={2}>
            <GigDetailCompletedInvoice />
          </TabPanel>
        </Box>
        </div>
      </div>
    </div>
  )
}

export default GigCompletedDetailAdmin
