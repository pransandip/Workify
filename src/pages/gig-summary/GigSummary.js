import React, {  } from 'react';
import * as Colors from '../../Styles-Elements/Colors';
import { Body, Heading3Bold,  } from '../../Styles-Elements/Labels';
import Box from '@mui/material/Box';

import StepperHeaderSummary from '../../pages/stepper-header/StepperHeaderSummary';



import Sidebar from '../../Styles-Elements/Sidebar/Sidebar';
import Header from '../../Styles-Elements/Heading/Header';

// Importing localised strings
const strings = require('../../localisation_en.json')

function GigSummary(props) {

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header  />
      <div className='main-mid-container'>
        <div className="gig-summary-holder">
          <Box>
            <Heading3Bold text={strings.GigSummary} className={'heading3bold'} color={Colors.black} margin={'0 0 12px 0'}  />
            <Body text={strings.inOrderToStartHiringWorks} color={Colors.black}  />
            <StepperHeaderSummary />

          </Box>
        </div>
      </div>
    </div>
  )
}

export default GigSummary
