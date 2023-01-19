

import { useState } from 'react';
import * as React from 'react';
import LoginHeader from '../../Styles-Elements/login-heading/LoginHeader';
import LoginFooter from '../../Styles-Elements/login-footer/LoginFooter';
import { Heading1Bold,} from '../../Styles-Elements/Labels';
import * as Colors from '../../Styles-Elements/Colors';

import Box from '@mui/material/Box';
// Importing localised strings
import './ServiceAgreement.scss';

import StepperHeader from '../../pages/stepper-header/StepperHeader';

const strings = require('../../localisation_en.json');

function ServiceAgreement() {

  return (
    <div className="relative">
    <LoginHeader />
    <div className="page-background-gray">
      <div className="grid-header">
          <Heading1Bold text={strings.startFillingShiftsWithWorkBriefly}
            color={Colors.black}
            textAlign={"center"} className={'heading1bold'}
          />
      </div>
      <StepperHeader />
    </div>
    <LoginFooter />
  </div>)
}

export default ServiceAgreement;
