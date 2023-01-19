
import * as React from 'react';
import { Link } from "react-router-dom";
import { Body, Heading4Medium, Heading6Medium, InputLabel } from '../../../Styles-Elements/Labels';
import { Textfield } from '../../../Styles-Elements/Inputs';
import { PrimaryButton, TransparentButton,TertiaryButton,SecondaryButton } from '../../../Styles-Elements/Buttons';
import * as Colors from '../../../Styles-Elements/Colors';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Radio } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { FormControlLabel, Checkbox } from '@mui/material';


// import images
import mapImg from '../../../image-assets/product/mapImg.png';
import CroseImg from '../../../image-assets/structure/crose-icon-gray.svg';

import './CGIGLocation.scss';

// Importing localised strings
const strings = require('../../../localisation_en.json')

const provinces = [
  {
    value: 'BC',
    label: 'BC',
  },
  {
    value: 'EUR',
    label: 'EUR',
  },
];

function CGIGLocation() {
  const [province, setProvince] = React.useState('EUR');
  const handleChangeMenu = (event) => {
    setProvince(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [removeLocationopen, setOpenModal] = React.useState(false);
  const removeLocationClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  }

  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

    const controlProps = (item: string) => ({
      checked: selectedValue === item,
      onChange: handleChange,
      value: item,
      name: 'size-radio-button-demo',
      inputProps: { 'aria-label': item },
    });



  return (
      <div className="page-background">
          <div className='cgig-overview-main-holder'>
            <Heading4Medium className={'heading4medium'} fontWeight={'700'} text={strings.location} color={Colors.black} margin={'0 0 12px 0'}  />
            <div className='overview-box'>
              <Body className={'body'} text={strings.pleaseProvideLocationAndTransitDetails} color={Colors.midGray} margin={'0 0 20px 0'}  />
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} >
                  <div className={'table-type-parent'}>
                    <div className={'table-type-head'}>
                      <p className={'table-heading'}>Location Name</p>
                      <p className={'table-heading'}>Address</p>
                      <p className={'table-heading'}></p>
                    </div>
                    <div className={'table-type-body'}>
                      <p className={'table-text'}><Radio {...controlProps('a')} size="small" />Headquarters</p>
                      <p className={'table-text'}>3199 West 4th, Vancouver, V5T 0A1</p>
                      <p className={'table-text'}><Link className="removeText" onClick={removeLocationClickOpen} >Remove</Link></p>
                    </div>
                    <div className={'table-type-body'}>
                      <p className={'table-text'}><Radio {...controlProps('b')} size="small" />Site 1</p>
                      <p className={'table-text'}>5 Surrey Ave, Vancouver, V11 0BA</p>
                      <p className={'table-text'}><Link className="removeText" onClick={removeLocationClickOpen} >Remove</Link></p>
                    </div>
                    <div className={'table-type-body'}>
                      <p className={'table-text'}><Radio {...controlProps('c')} size="small" />Main Office</p>
                      <p className={'table-text'}>5 Surrey Ave, Vancouver, V11 0BA</p>
                      <p className={'table-text'}><Link className="removeText" onClick={removeLocationClickOpen} >Remove</Link></p>
                    </div>
                  </div>
                  <TertiaryButton text={strings.Addanewaddress} className={'outline-btn'}  onClick={handleClick} width="160px" />

                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={12} sm={6} >
                        <div className="grid-item">
                          <InputLabel text={strings.LocationName} color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                          <Textfield placeholder={strings.Pleaseenteryourlocationnickname} className="textfield"  />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} >
                        <div className="grid-item">
                          <InputLabel text={strings.Province} color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                          <TextField
                           className="textfield"
                            select
                            value={province}
                            onChange={handleChangeMenu}
                            placeholder={strings.Selectaprovince} >
                            {provinces.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} >
                        <div className="grid-item">
                          <InputLabel text={strings.BusinessAddress1} color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                          <Textfield placeholder={strings.Enteryourbusinessstreetaddress} className="textfield"  />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} >
                        <div className="grid-item">
                          <InputLabel text={strings.BusinessAddress2} color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                          <Textfield placeholder={strings.Enteryourapartmentsuiteunitnumberetc} className="textfield"  />
                        </div>
                      </Grid>
                    </Grid>
                    <TertiaryButton text={strings.AddNewLocation} className={'height48'} width="160px" />
                  </Collapse>

                  <img src={mapImg} alt="" className="map-img" />
                </Grid>

                <Grid item xs={12} >
                  <Heading6Medium className={'heading6medium'} text={strings.TransitOptions} />
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} flexWrap="wrap">
                  <FormControlLabel control={<Checkbox size="small" />} label="Free parking nearby" className="check50width" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Transit options are nearby" className="check50width" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Paid parking nearby" className="check50width" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Transit options are only a walk away" className="check50width" />
                  <FormControlLabel control={<Checkbox size="small" />} label="No parking available nearby" className="check50width" />
                  <FormControlLabel control={<Checkbox size="small" />} label="There are no transit options nearby" className="check50width" />
                </Grid>

                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                  <TransparentButton className='transparentbutton' text={strings.Back} width={'113px'}  />
                  <SecondaryButton className='secondarybutton' text={'Save & Exit'} width={'113px'} margin={'0px 16px 0px 0px'}  />
                  <PrimaryButton className='neutrallightbutton' text={strings.Continue} width={'113px'}  />
                </Grid>
              </Grid>
            </div>
          </div>
          <Dialog
            open={removeLocationopen}
            onClose={handleClose}
            className={'modalwidth548'}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >

            <DialogTitle id="alert-dialog-title">
              {strings.RemoveLocation}
                <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to remove this location?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <TransparentButton className='transparentbutton' onClick={handleClose} text={strings.No} width={'auto'}  />
                <PrimaryButton className='primarybutton' autoFocus text={strings.Yes} width={'210px'}  />{/*{strings.SaveChanges}*/}
            </DialogActions>
          </Dialog>
      </div>
  )
}

export default CGIGLocation;
