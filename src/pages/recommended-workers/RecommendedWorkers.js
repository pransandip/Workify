
import React, { useState } from 'react';
import * as Colors from '../../Styles-Elements/Colors';
import { Body, Heading4Medium,Heading2Bold  } from '../../Styles-Elements/Labels';
import { TertiaryButton, PrimaryButton } from '../../Styles-Elements/Buttons';
import { Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// images
import SuccessIcon from '../../image-assets/structure/success-alert.svg'
import Round1 from '../../image-assets/product/round-img3.png'
import Round2 from '../../image-assets/product/round-img4.png'
import Round3 from '../../image-assets/product/round-img2.png'

import Sidebar from '../../Styles-Elements/Sidebar/Sidebar';
import Header from '../../Styles-Elements/Heading/Header';

import './RecommendedWorkers.scss';

// Importing localised strings
const strings = require('../../localisation_en.json')

function RecommendedWorkers(props) {

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header  />
      <div className='main-mid-container'>
        <div className="recommended-holder">

          <h2 className={'heading30'}><img src={SuccessIcon} alt="" className="icon60" />{strings.GigSuccessfullyCreated}</h2>
          <Box className={'whiteBoxRecom'}>
              <Heading4Medium fontWeight={'700'} color={Colors.nightGray} className={'heading4medium'} text={strings.RecommendedWorkers} />
              <Body className={'body'} color={Colors.midGray} text={strings.lorem1} />
              <Body className={'body'} color={Colors.lightGray} text={strings.LoremIpsum} />
              <Box className="">
                <Box className="fiveWhiteBox">
                  <img src={Round1} alt="img-name" className={'roundImg'} />
                  <Body className={'body'} fontWeight={'500'} color={Colors.black} text={'Ivan RL'} />
                  <TertiaryButton className='tertiarybutton' text={strings.viewProfile} />
                  <PrimaryButton className='primarybutton' text={strings.SendRequest} />
                  <Button className='lightgreenbutton'><img src={SuccessIcon} alt="" className="icon24" />{strings.RequestSent}</Button>
                </Box>
                <Box className="fiveWhiteBox">
                  <img src={Round2} alt="img-name" className={'roundImg'} />
                  <Body className={'body'} fontWeight={'500'} color={Colors.black} text={'Linda Watson'} />
                  <TertiaryButton className='tertiarybutton' text={strings.viewProfile} />
                  <PrimaryButton className='primarybutton' text={strings.SendRequest} />
                </Box>
                <Box className="fiveWhiteBox">
                  <img src={Round3} alt="img-name" className={'roundImg'} />
                  <Body className={'body'} fontWeight={'500'} color={Colors.black} text={'John Smith'} />
                  <TertiaryButton className='tertiarybutton' text={strings.viewProfile} />
                  <PrimaryButton className='primarybutton' text={strings.SendRequest} />
                </Box>
                <Box className="fiveWhiteBox">
                  <img src={Round1} alt="img-name" className={'roundImg'} />
                  <Body className={'body'} fontWeight={'500'} color={Colors.black} text={'Ivan RL'} />
                  <TertiaryButton className='tertiarybutton' text={strings.viewProfile} />
                  <PrimaryButton className='primarybutton' text={strings.SendRequest} />
                </Box>
                <Box className="fiveWhiteBox">
                  <img src={Round2} alt="img-name" className={'roundImg'} />
                  <Body className={'body'} fontWeight={'500'} color={Colors.black} text={'Ivan RL'} />
                  <TertiaryButton className='tertiarybutton' text={strings.viewProfile} />
                  <PrimaryButton className='primarybutton' text={strings.SendRequest} />
                </Box>
              </Box>
              <div className={'alignCenter'}>
                <PrimaryButton className='primarybutton' width={'160px'} margin={'30px 0px 30px 0px'} text={strings.Continue} />
              </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default RecommendedWorkers
