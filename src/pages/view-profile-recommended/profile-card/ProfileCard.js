import React from 'react';
import * as Colors from '../../../Styles-Elements/Colors';
import { Body, Heading3Bold,Heading6Medium } from '../../../Styles-Elements/Labels';
import Box from '@mui/material/Box';
// images
import Reactangle from '../../../image-assets/product/rectangle-img.png';

import './../ViewProfileRecommended.scss';

// Importing localised strings
// const strings = require('../../../localisation_en.json')

function ProfileCard(props) {

  return (
    <>
      <Box className={'card-box'}>
        <img src={Reactangle} alt="" className={'react-img'} />
        <Box className={'card-body'}>
          <Box>
            <Heading3Bold className={'heading3bold'} color={Colors.black} text={'Waitress'} />
            <Heading6Medium className={'heading6medium'} color={Colors.nightGray} text={'Jinya Ramen'} />
            <Body className={'body'} color={Colors.nightGray} text={'Sat, Mar 14, 2022 - Mon, Mar 16, 2022'} />
          </Box>
          <Heading3Bold className={'heading3bold'} color={Colors.black} text={'$150.00'} />
        </Box>
      </Box>
    </>
   )
  }
  export default ProfileCard
