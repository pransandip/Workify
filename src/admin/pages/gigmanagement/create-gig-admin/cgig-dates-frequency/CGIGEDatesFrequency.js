import * as React from 'react';
import { useState } from 'react';
import { Body, Heading4Medium, Heading5Medium, InputLabel, } from '../../../Styles-Elements/Labels';
import { Textfield } from '../../../Styles-Elements/Inputs';
import { PrimaryButton, TransparentButton,SecondaryButton } from '../../../Styles-Elements/Buttons';
import * as Colors from '../../../Styles-Elements/Colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@mui/material/Grid';
import { FormControlLabel } from '@mui/material';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, TimePicker,  MuiPickersUtilsProvider, } from '@material-ui/pickers';

// import images
import infoIcon from '../../../image-assets/structure/info-icon.svg';

import './CGIGEDatesFrequency.scss';

// Importing localised strings
const strings = require('../../../localisation_en.json')

function CGIGEDatesFrequency() {

  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [selectedStartTime, handleStartTimeChange] = useState(new Date());
  const [selectedEndTime, handleEndTimeChange] = useState(new Date());
  return (
    <div className="page-background">
      <div className='cgig-overview-main-holder'>
        <Heading4Medium className={'heading4medium'} fontWeight={'700'} text={strings.WorkDates_PayFrequency} color={Colors.black} margin={'0 0 12px 0'}  />
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <div className='frequency-flex-box'>
              <div className='overview-box width650'>
                <Body text={strings.Pleaseaddeachdateandtimethatyourequireworkersforthisgiginadditiontothehourlyrateofpay} className={'body'} color={Colors.midGray} margin={'0 0 20px 0'}  />

                <FormControl className={'radioSingleBox'} >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="MultipleDay"
                    name="radio-buttons-group" style={{display: 'flex',flexDirection: 'row',marginBottom: '20px'}}>
                    <FormControlLabel value="SingleDay" control={<Radio />} label="Single Day" />
                    <FormControlLabel value="MultipleDay" control={<Radio />} label="Multiple Day" />
                  </RadioGroup>
                </FormControl>
                {/*single*/}
                {/*<Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="grid-item">
                      <InputLabel text={strings.Date}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <DatePicker value={selectedStartDate} clearable
                          inputVariant="outlined"
                          placeholder="DD/MM/YYYY"
                          onChange={date => handleStartDateChange(date)}
                          minDate={new Date()}
                          format="dd/MM/yyyy"
                          />
                        </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="grid-item">
                      <InputLabel text={strings.Starttime}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker value={selectedStartTime} inputVariant="outlined" onChange={handleStartTimeChange} />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="grid-item">
                      <InputLabel text={strings.Endtime}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker value={selectedEndTime} inputVariant="outlined" onChange={handleEndTimeChange} />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                </Grid>*/}
                {/*multiple*/}
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel text={strings.StartDate}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <DatePicker value={selectedStartDate} clearable
                          inputVariant="outlined"
                          placeholder="DD/MM/YYYY"
                          onChange={date => handleStartDateChange(date)}
                          minDate={new Date()}
                          format="dd/MM/yyyy"
                          />
                        </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel text={strings.EndDate}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <DatePicker value={selectedEndDate} clearable
                          inputVariant="outlined"
                          placeholder="DD/MM/YYYY"
                          onChange={date => handleEndDateChange(date)}
                          minDate={new Date()}
                          format="dd/MM/yyyy"
                          />
                        </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel text={strings.Starttime}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <TimePicker value={selectedStartTime} inputVariant="outlined" onChange={handleStartTimeChange} />
                        </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel text={strings.Endtime}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <TimePicker value={selectedEndTime} inputVariant="outlined" onChange={handleEndTimeChange} />
                        </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                </Grid>

                <div className={'divider'} />
                <Body text={strings.Pleaseindicatehowmanyminutesofunpaidandorpaidbreakthereareforthisgig} color={Colors.midGray} margin={'0 0 20px 0'}  />
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel text={strings.UnpaidBreak}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                      <Textfield className="textfield" placeholder={strings.Enterminsofunpaidbreak}  />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={5}>
                    <div className="grid-item">
                      <InputLabel text={strings.PaidBreak}
                        color={Colors.nightGray}
                        padding={'0px 0 8px 0'} className={'inputlabel'} />
                      <Textfield className="textfield" placeholder={strings.Enterminsofpaidbreak}  />
                    </div>
                  </Grid>
                </Grid>
                <div className={'divider'} />
                <Heading5Medium text={'Pay Frequency'} color={Colors.nightGray} margin={'0 0 10px 0'}  />
                <FormControl style={{marginBottom: '15px'}}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="SingleDay"
                    name="radio-buttons-group" style={{display: 'flex',flexDirection: 'row',marginBottom: '20px'}}>
                    <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
                    <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
                    <div className="tool-box">
                      <img src={infoIcon} alt="" className={'info-icon'} />
                      <div  className={'tool-hover'} >
                        Weekly payments on Friday
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className='overview-box width350'>
                  <Heading5Medium text={strings.CostBreakdown} color={Colors.nightGray}  />
                  <div className={'frequency-flex-right'}>
                    <Body text={strings.Noofworkers} className={'leftValue'} color={Colors.nightGray} />
                    <div className={'rightValue'} >
                      <span className={'blueSpan'}>
                        <Body text={'1'} fontWeight={500} color={Colors.nightGray} />
                      </span>
                    </div>
                  </div>
                  <div className={'frequency-flex-right'}>
                    <Body text={strings.Hourlypay} className={'leftValue'} color={Colors.nightGray} />
                    <div className={'rightValue'} >
                      <span className={'blueSpan'}>
                          <Body text={'$30.00'} fontWeight={500} color={Colors.nightGray} />
                      </span>
                    </div>
                  </div>
                  <div className={'frequency-flex-right'}>
                    <Body text={strings.Totalhoursperworker} className={'leftValue'} color={Colors.nightGray} />
                    <div className={'rightValue'} >
                      <span className={'borderSpan'}>
                        <Body text={'8'} fontWeight={500} color={Colors.nightGray} />
                      </span>
                    </div>
                  </div>
                  <div className={'frequency-flex-right'}>
                    <Body text={strings.Subtotal} className={'leftValue'} color={Colors.nightGray} />
                    <div className={'rightValue'} >
                      <span className={'normalSpan'}>
                        <Body text={'$64.00'} fontWeight={500} color={Colors.nightGray} />
                      </span>
                    </div>
                  </div>
                  <div className={'divider'} style={{margin:'7px 0px 7px 0px'}}></div>
                  <div className={'frequency-flex-right'}>
                    <Body text={'Fee (20%)'} className={'leftValue'} color={Colors.nightGray} />
                    <div className={'rightValue'} >
                      <span className={'normalSpan'}>
                          <Body text={'$128.00'} fontWeight={500} color={Colors.nightGray} />
                      </span>
                    </div>
                  </div>
                  <div className={'frequency-flex-right'}>
                    <Body text={'Tax (5%)'} className={'leftValue'} color={Colors.nightGray} />
                    <div className={'rightValue'} >
                      <span className={'borderSpan'}>
                        <Body text={'$128.00'} fontWeight={500} color={Colors.nightGray} />
                      </span>
                    </div>
                  </div>
                  <div className={'frequency-flex-right'}>
                    <Body text={'Total Amount'} className={'leftValue'} color={Colors.nightGray} />
                    <div className={'rightValue'} >
                        <Heading4Medium text={'$400.00'}  color={Colors.nightGray} />
                    </div>
                  </div>
                  <Grid  justifyContent={'flex-end'} style={{display: 'flex',paddingTop: '20px'}}>
                    <TransparentButton className='transparentbutton' text={strings.Back} width={'90px'}  />
                    <SecondaryButton className='secondarybutton' text={'Save & Exit'} width={'113px'} margin={'0px 16px 0px 0px'}  />
                    <PrimaryButton className='neutrallightbutton' text={strings.Continue} width={'113px'}  />
                  </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

  export default CGIGEDatesFrequency;
