import React from 'react';
import * as Colors from '../../../Styles-Elements/Colors';
import { Heading4Medium,LabelWrapper,Small } from '../../../Styles-Elements/Labels';
import { Box, Divider} from '@mui/material';


import './../ViewProfileRecommended.scss';

// Importing localised strings
// const strings = require('../../../localisation_en.json')

function RightChips(props) {
  console.log(props.experience)
  return (
    <>
      <Heading4Medium className={'heading4medium'} fontWeight={'700'} color={Colors.nightGray} text={'Experience'} />
      {props.experience?.length > 0 && props.experience.map((item, index) => (
        <Box className={'blueChips'} key={index}>
        <LabelWrapper>
          <Small className={'small'} fontWeight={'700'} text={`${item.position}`} color={Colors.white} />
          <Small className={'small'} text={'at'} color={Colors.white}  />
          <Small className={'small'} fontWeight={'700'} text={`${item.company_name}`} color={Colors.white} />
          <Small className={'small'} text={'for'} color={Colors.white} />
          <Small className={'small'} fontWeight={'700'} text={`${item.year} yrs ${item.month} mos`} color={Colors.white} />
        </LabelWrapper>
      </Box>
      ))}
      <Divider className={'divider-line'} />
      <Heading4Medium className={'heading4medium'} fontWeight={'700'} color={Colors.nightGray} text={'Certificates & Licenses'} />
      <Box className={'blueChips'}>
        <LabelWrapper>
          <Small className={'small'} fontWeight={'700'} text={'Serving it Right'} color={Colors.white} />
          <Small className={'small'} text={'expires'} color={Colors.white}  />
          <Small className={'small'} fontWeight={'700'} text={'Mar, 2024'} color={Colors.white} />
        </LabelWrapper>
      </Box>
      <Box className={'blueChips'}>
        <LabelWrapper>
          <Small className={'small'} fontWeight={'700'} text={'Serving it Right'} color={Colors.white} />
          <Small className={'small'} text={'expires'} color={Colors.white}  />
          <Small className={'small'} fontWeight={'700'} text={'Nov, 2032'} color={Colors.white} />
        </LabelWrapper>
      </Box>
      <Box className={'blueChips'}>
        <LabelWrapper>
          <Small className={'small'} fontWeight={'700'} text={'Serving it Right'} color={Colors.white} />
          <Small className={'small'} text={'expires'} color={Colors.white}  />
          <Small className={'small'} fontWeight={'700'} text={'Aug, 2028'} color={Colors.white} />
        </LabelWrapper>
      </Box>
    </>
   )
  }

  export default RightChips
