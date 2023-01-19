
import { useHistory } from "react-router-dom";
import { Body, Heading4Medium, InputLabel } from '../../../Styles-Elements/Labels';
import { Textfield } from '../../../Styles-Elements/Inputs';
import { PrimaryButton, TransparentButton } from '../../../Styles-Elements/Buttons';
import * as Colors from '../../../Styles-Elements/Colors'

// import ui material
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel } from '@material-ui/core/';
import './CGIGPointOfContact.scss';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

// Importing localised strings
const strings = require('../../../localisation_en.json')

function CGIGPointOfContact(){
  const history = useHistory();
  const routeChangeGigSummary = () =>{
      let path = `/gig-summary`;
      history.push(path);
  }
  return (
    <div className="page-background">
      <div className='cgig-overview-main-holder pointOfContact'>
        <Heading4Medium className={'heading4medium'} fontWeight={'700'} text={strings.pointOfContact} color={Colors.black} margin={'0 0 12px 0'}  />
        <div className='overview-box'>
          <Body className={'body'} text={strings.pointOfContactRefersToThePerson} color={Colors.midGray} margin={'0 0 20px 0'}  />
          <div className='cgig-omh-radio'>
            <div className="grid-item">
              <InputLabel text={strings.areYouThePointOfContact}
                color={Colors.nightGray}
                padding={'0px 0 8px 0'} className={'inputlabel'} />
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="yes"
                  name="radio-buttons-group" >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <div className="grid-item">
                <InputLabel text={strings.Name} color={Colors.nightGray} padding={'0px 0 8px 0'} className={'inputlabel'} />
                <Textfield className="textfield" placeholder={strings.enterYourName}  />
              </div>
              <div className="grid-item">
                <InputLabel text={strings.title} color={Colors.nightGray} padding={'0px 0 8px 0'} className={'inputlabel'} />
                <Textfield className="textfield" placeholder={'Manager'}  />
              </div>
              <div className="grid-item">
                  <InputLabel text={strings.contactNumber} color={Colors.nightGray} padding={'0px 0 8px 0'}  className={'inputlabel'} />
                  <Textfield className="textfield" placeholder={'604.123.4567'}  />
              </div>
            </Grid>
            <Grid item xs={12} justifyContent={'flex-end'} style={{display: 'flex',paddingTop: '20px'}}>
              <TransparentButton className='transparentbutton' text={strings.Back} width={'113px'}  />
              <PrimaryButton className='primarybutton' onClick={routeChangeGigSummary} text={strings.Continue} width={'113px'}  />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default CGIGPointOfContact;
