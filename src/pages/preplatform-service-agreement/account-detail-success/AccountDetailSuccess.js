import * as React from 'react';
import {  Heading5Medium,  } from '../../../Styles-Elements/Labels';
import {  PrimaryButton } from '../../../Styles-Elements/Buttons';
// Material UI for the snackbar
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
// import images
import SuccessIcon from '../../../image-assets/structure/success-alert.svg'

import './../ServiceAgreement.scss';
const strings = require('../../../localisation_en.json');

function AccountDetailSuccess() {

return (<div>
    <Container maxWidth="lg">
      <Grid container alignItems={'cetner'} justifyContent={'center'}>
        <Grid item xs={12} >
          <div className='costomer-agreement-box' style={{margin: '0px auto',padding: '60px 32px 40px 32px',}} >
            <div className="alignCenter">
              <img
                src={SuccessIcon}
                className="icon78"
                alt="name"
              />
              <Heading5Medium  text={strings.Thankyouforcreatingyouraccount_AccountDetailPage} className="heading18" />

            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
    </div>
      )
  }
  export default AccountDetailSuccess;
