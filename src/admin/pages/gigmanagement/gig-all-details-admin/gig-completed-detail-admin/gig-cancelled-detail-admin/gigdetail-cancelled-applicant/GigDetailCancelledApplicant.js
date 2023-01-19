
// Importing material ui
import * as React from 'react';
import Box from '@mui/material/Box';
import { Heading6Medium, Body } from '../../../../../../../Styles-Elements/Labels';
import * as Colors from '../../../../../../../Styles-Elements/Colors';
// images
import Round1 from '../../../../../../../image-assets/product/round-img3.png';

import '../../../../GIGS.scss';

function GigDetailApplicantSingleDay(props) {


  return (
    <>
       <Body className={'body'} color={Colors.midGray} text={'This is a list of all the workers who have applied for your gig.'} />
       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
       </Box>

       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
       </Box>

       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
       </Box>

       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
       </Box>

       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
       </Box>
    </>
  )
}

export default GigDetailApplicantSingleDay
