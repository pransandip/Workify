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

import './BusinessManagement.scss';

// Importing localised strings
// const strings = require('../../localisation_en.json');

//filter status dropdown
function BusinessManagementEdit(props) {



  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader  />
      <div className='main-mid-container'>
        <div className="edit-pg-holder">
          <Grid container xs={8} spacing={2} className={''}>
            <Grid item xs={12} display={'flex'} >
                <Heading3Bold text={'Business Management Edit'} color={Colors.black} margin={'16px 0 30px 0'}  />
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Business Name'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Email'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Business Address 1'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Business Address 2'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'City'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Province'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Country'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Postal code'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Business telephone no'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Industry'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter here '}
                  className="textfield" />

                </div>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Logo'} color={Colors.nightGray} padding={'0 0 8px 0'} className={'inputlabel'} />
                  <div className="uploadPhoto-block">
                    <Textfield type='file' />
                    <img src={Crose_Icon} className={'crose-icon'} alt='some value' />
                    <img src={UploadedImg} className={'upload-img'} alt='some value' />
                  </div>
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

export default BusinessManagementEdit
