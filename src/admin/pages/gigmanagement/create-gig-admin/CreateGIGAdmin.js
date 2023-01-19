import React from 'react';
import * as Colors from '../../../../Styles-Elements/Colors';
import { Body, Heading3Bold,  } from '../../../../Styles-Elements/Labels';

import StepperHeader6 from '../../../../pages/stepper-header/StepperHeader6';
import './CreateGIGAdmin.scss';

import AdminHeader from '../../../layout/header/AdminHeader.js';
import AdminSidebar from '../../../layout/sidebar/AdminSidebar.js';

// import material ui
import Box from '@mui/material/Box';

// Importing localised strings
// const strings = require(../../../../localisation_en.json')


function CreateGIGAdmin(props) {

  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader />
      <div className='main-mid-container'>
        <div className="create-gig-main-holder">
          <div className=''>
              <Box>
                <Heading3Bold className={'heading3bold'} text={'create A Gig'} color={Colors.black} margin={'0 0 12px 0'}  />
                <Body className={'body'} text={'in Order To Start Hiring Works'} color={Colors.black}  />
                <StepperHeader6 />
              </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateGIGAdmin
