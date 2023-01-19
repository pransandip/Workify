
// Importing material ui
import * as React from 'react';
import Box from '@mui/material/Box';
import { Heading6Medium, Body,LabelWrapper ,Small} from '../../../../../../../Styles-Elements/Labels';
import * as Colors from '../../../../../../../Styles-Elements/Colors';
import '../../../../GIGS.scss';

// images
import Round1 from '../../../../../../../image-assets/product/round-img3.png';
import Refress from '../../../../../../../image-assets/structure/refress-icon.svg';

function GigDetailApplicantSingleDay(props) {
  return (
    <>
       <Body className={'body'} color={Colors.midGray} text={'This is a list of all the workers who have applied for your gig.'} />
       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
         <Box className={'right-collapse'}>
           <LabelWrapper>
             <Small className={'small'} fontWeight={'700'} cursor={'pointer'}  textDecoration={'underline'} text={'Reject Applicant'} color={Colors.error} />
             <Small className={'small'} fontWeight={'700'} cursor={'pointer'}  textDecoration={'underline'} text={'Accept Applicant'} color={Colors.blue}  />
            </LabelWrapper>
         </Box>
       </Box>

       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
         <Box className={'right-collapse'}>
           <LabelWrapper>
             <span className={'chips yallow'}>Awaiting Confirmation</span>
             <img src={Refress} className={'Refress-icon'} alt="" />
           </LabelWrapper>
         </Box>
       </Box>

       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
         <Box className={'right-collapse'}>
           <LabelWrapper>
             <Small className={'small'} fontWeight={'700'} cursor={'pointer'} textDecoration={'underline'} text={'Reject Applicant'} color={Colors.error} />
             <Small className={'small'} fontWeight={'700'} cursor={'pointer'} textDecoration={'underline'} text={'Accept Applicant'} color={Colors.blue}  />
            </LabelWrapper>
         </Box>
       </Box>

       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
         <Box className={'right-collapse'}>
           <LabelWrapper>
             <span className={'chips red'}>Rejected</span>
           </LabelWrapper>
         </Box>
       </Box>

       <Box className={'accourdiun-type-header'} >
         <Box className={'left-collapse'}>
            <img src={Round1} className={'round-img'} alt="" />
            <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
         </Box>
         <Box className={'right-collapse'}>
           <LabelWrapper>
             <Small className={'small'} fontWeight={'700'} cursor={'pointer'} textDecoration={'underline'} text={'Reject Applicant'} color={Colors.error} />
             <Small className={'small'} fontWeight={'700'} cursor={'pointer'} textDecoration={'underline'} text={'Accept Applicant'} color={Colors.blue}  />
            </LabelWrapper>
         </Box>
       </Box>
    </>
  )
}

export default GigDetailApplicantSingleDay
