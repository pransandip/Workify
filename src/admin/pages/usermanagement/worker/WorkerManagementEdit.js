import React from 'react';
import * as Colors from '../../../../Styles-Elements/Colors';
import { InputLabel } from '../../../../Styles-Elements/Labels';
import { Heading3Bold,  } from '../../../../Styles-Elements/Labels';
import { PrimaryButton } from '../../../../Styles-Elements/Buttons';
import { Textfield } from '../../../../Styles-Elements/Inputs';
import UploadedImg from '../../../../image-assets/product/h-product-logo1.png';
import Crose_Icon from '../../../../image-assets/structure/crose-icon.svg';
import AdminHeader from '../../../layout/header/AdminHeader.js';
import AdminSidebar from '../../../layout/sidebar/AdminSidebar.js';

// Material UI for the snackbar
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import './WorkerManagement.scss';

// Importing localised strings
// const strings = require('../../localisation_en.json');

//filter status dropdown
function WorkerManagementEdit(props) {

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'Option1',
    'Option2',
    'Option3',
    'Option4',
    'Option5',
    'Option6',
    'Option7',
  ];

 


  const [industry, setindustry] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setindustry(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader  />
      <div className='main-mid-container'>
        <div className="edit-pg-holder">
          <Grid container xs={8} spacing={2} className={''}>
            <Grid item xs={12} display={'flex'} >
                <Heading3Bold text={'Worker Management Edit'} color={Colors.black} margin={'16px 0 30px 0'}  />
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'First Name'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter Name'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Last Name'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter Name'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Date of birth'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'email'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Confirmed Gigs'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Completed Gigs'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Experience'}  color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                    <div className="expTabs-rw" style={{paddingTop: '0px'}}>
                      <div className="expTabs-col">Front Desk at starbucks for 5 yrs</div>
                      <div className="expTabs-col">Front Desk at starbucks for 5 yrs</div>
                      <div className="expTabs-col">Front Desk at starbucks for 5 yrs</div>
                    </div>

                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Certificate '}  color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                    <div className="expTabs-rw" style={{paddingTop: '0px'}}>
                      <div className="expTabs-col">Saving in right expire Jan, 2032</div>
                      <div className="expTabs-col">Saving in right expire Jan, 2032</div>
                      <div className="expTabs-col">Saving in right expire Jan, 2032</div>
                    </div>

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Address'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Completed Gigs'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Radius in KM'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">                  
                  <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                    <Select
                      multiple
                      displayEmpty
                      value={industry}
                      onChange={handleChange}
                      
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }

                        return selected.join(', ');
                      }}
                      MenuProps={MenuProps}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem disabled value="">
                        <em>Placeholder</em>
                      </MenuItem>
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Profile picture'} color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                  <div className="uploadPhoto-block">
                    <Textfield type='file' />
                    <img src={Crose_Icon} className={'crose-icon'} alt='some value' />
                    <img src={UploadedImg} className={'upload-img'} alt='some value' />
                  </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Photo ID '} color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                  <div className="uploadPhoto-row" style={{display:'flex'}}>
                    <div className="uploadPhoto-block">
                      {/* <Textfield type='file' /> */}
                      <img src={Crose_Icon} className={'crose-icon'} alt='some value' />
                      <img src={UploadedImg} className={'upload-img'} alt='some value' />
                    </div>
                    <div className="uploadPhoto-block">
                      {/* <Textfield type='file' /> */}
                      <img src={Crose_Icon} className={'crose-icon'} alt='some value' />
                      <img src={UploadedImg} className={'upload-img'} alt='some value' />
                    </div>
                    <div className="uploadPhoto-block">
                      {/* <Textfield type='file' /> */}
                      <img src={Crose_Icon} className={'crose-icon'} alt='some value' />
                      <img src={UploadedImg} className={'upload-img'} alt='some value' />
                    </div>
                  </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={6} style={{paddingTop: '0px'}}>
                <div className="Criminal Record ">
                  <InputLabel text={'Address'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            
            <Grid item xs={12} style={{paddingTop: '0px', marginTop:'20px'}} >
              <PrimaryButton className='primarybutton' text={'submit'} width={'172px'} height={'56px'} margin={'8px 0 16px 0'} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default WorkerManagementEdit
