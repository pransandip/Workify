import React from 'react';
import { useHistory } from "react-router-dom";
import * as Colors from '../../../Styles-Elements/Colors';
import { Body, Heading2Bold,Heading4Medium } from '../../../Styles-Elements/Labels';
import {  PrimaryButton } from '../../../Styles-Elements/Buttons';
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// images
import Round1 from '../../../image-assets/product/round-img3.png';
import Weapons from '../../../image-assets/structure/weapons.svg';

import { workerImageBase } from '../../../api/axios';

import './../ViewProfileRecommended.scss';

// Importing localised strings
const strings = require('../../../localisation_en.json')

function LeftProfile(props) {
  const history = useHistory();
  const routeChange = () =>{
      let path = `/recommended-workers`;
      history.push(path);
  }
  return (
    <>
      <div className={'tap-back'}>
        {false && <KeyboardBackspaceIcon onClick={routeChange} />}
        <Body color={Colors.blue} className={'body'} fontWeight={'500'} text={strings.BacktoRecommendedWorkers} />
      </div>
      <Heading2Bold className={'heading2bold'} color={Colors.black} text={strings.viewProfile} />
      <Box className={'profileRoundBox'}>
        <img src={props.worker.profile_picture !== "" ? `${workerImageBase}${props.worker.profile_picture}` : Round1} alt="img-name" className={'roundImg'} style={{objectFit: 'contain', borderRadius: '50%'}} />
        <img src={Weapons} alt="name" className={'weaponIcon'} />
      </Box>
      <Heading4Medium className={'heading4medium'} fontWeight={'500'} color={Colors.black} text={`${props.worker.first_name} ${props.worker.last_name}`} />
        <PrimaryButton className='primarybutton' text={strings.SendRequest} />
    </>
   )
  }
  export default LeftProfile
