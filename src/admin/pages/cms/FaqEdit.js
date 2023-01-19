import React from 'react';
import * as Colors from '../../../Styles-Elements/Colors';
import { InputLabel } from '../../../Styles-Elements/Labels';
import { Heading3Bold,  } from '../../../Styles-Elements/Labels';
import { PrimaryButton } from '../../../Styles-Elements/Buttons';
import { Textfield, TextAreafield } from '../../../Styles-Elements/Inputs';
import AdminHeader from '../../layout/header/AdminHeader.js';
import AdminSidebar from '../../layout/sidebar/AdminSidebar.js';

// Material UI for the snackbar
import Grid from '@mui/material/Grid';

import './cms.scss';

// Importing localised strings
// const strings = require('../../localisation_en.json');

//filter status dropdown
function FaqEdit(props) {
  return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader  />
      <div className='main-mid-container'>
        <div className="edit-pg-holder">
          <Grid container xs={8} spacing={2} className={''}>
            <Grid item xs={12} display={'flex'} >
                <Heading3Bold text={'FAQ Edit'} color={Colors.black} margin={'16px 0 30px 0'}  />
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Order'}
                              color={Colors.nightGray}
                              padding={'0 0 8px 0'} className={'inputlabel'} />
                  <Textfield placeholder={'Enter Name'}
                  className="textfield" />

                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Question'} color={Colors.nightGray}  padding={'0 0 8px 0'} className={'inputlabel'} />
                  <TextAreafield placeholder={'write Here'} className="textareafield textarea" />
                  {/* <TextField placeholder={strings.writeHere}  multiline  rows={3} defaultValue="" className="textfield" /> */}
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{paddingTop: '0px'}}>
                <div className="grid-item">
                  <InputLabel text={'Answer'} color={Colors.nightGray}  padding={'0 0 8px 0'} className={'inputlabel'} />
                  <TextAreafield placeholder={'write Here'} className="textareafield textarea" />
                  {/* <TextField placeholder={strings.writeHere}  multiline  rows={3} defaultValue="" className="textfield" /> */}
                </div>
            </Grid>
            <Grid item xs={12} style={{paddingTop: '0px'}}>
              <PrimaryButton className='primarybutton' text={'send '} width={'172px'} height={'56px'} margin={'8px 0 16px 0'} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default FaqEdit
