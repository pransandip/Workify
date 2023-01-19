
import * as React from 'react';
import { Heading6Medium, Body, Heading4Medium, InputLabel, LabelWrapper, Small } from '../../../Styles-Elements/Labels';
import { PrimaryButton, TertiaryButton, TransparentButton ,SecondaryButton} from '../../../Styles-Elements/Buttons';
import * as Colors from '../../../Styles-Elements/Colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { FormControlLabel, Checkbox,TextField,Autocomplete } from '@mui/material';
// import images
import CroseImg from '../../../image-assets/structure/crose-icon-gray.svg';
import alertCloseIcon from '../../../image-assets/structure/alertclose.svg';

import './CGIGExperience.scss';

// Importing localised strings
const strings = require('../../../localisation_en.json');

const CertificateLicense = [
  { label: 'Serving'},
  { label: 'Serving it Right'},
];

function CGIGExperience() {

const [removeCertificateopen, setOpen] = React.useState(false);
const removeCertificateClickOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
}
  return (
      <div className="page-background">
          <div className='cgig-overview-main-holder'>
            <LabelWrapper>
                <Heading4Medium className={'heading4medium'} fontWeight={'700'} text={strings.experience} color={Colors.black} margin={'0 0 12px 0'}  />
                <Heading6Medium className={'heading6medium'} text={strings.optional} color={Colors.black} margin={'0 0 12px 8px'}  />
            </LabelWrapper>

            <div className='overview-box'>
            <Body text={strings.inOrderToMatchYouWith} color={Colors.midGray} margin={'0 0 0px 0'}  />
            <LabelWrapper margin={'0 0 16px 0'}>
              <Body className={'body'} text={strings.PleaseMakeSureThatYou} color={Colors.midGray} margin={'0 0 0px 0'}  />
              <Body className={'body'} fontWeight={'500'} text={strings.addThisCertificateLicense} color={Colors.midGray} margin={'0 0 0px 4px'}  />
              <Body className={'body'} text={strings.toSaveEach} color={Colors.midGray} margin={'0 0 0px 4px'}  />
              <Body className={'body'} text={strings.CertificateLicense} color={Colors.midGray} margin={'0 0 0px 4px'}  />
            </LabelWrapper>
              <InputLabel text={strings.CertificateLicense}
                      color={Colors.nightGray}
                      padding={'0px 0 8px 0'} className={'inputlabel'} />
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} sm={8}>
                  <div className="grid-item">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={CertificateLicense}
                    renderInput={(params) => <TextField className="textfield" placeholder={strings.pleaseTypeTheNameOfTheCertificateOrLicense} {...params}  />}
                  />

                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="grid-item">
                    <TertiaryButton className='tertiarybutton' text={strings.add} width={'113px'}  />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="grid-item">
                    <FormControlLabel control={<Checkbox size="small" />} label="The worker is required to have this certificate/license" />
                  </div>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <div className='blue-alerttype-box'>
                      <LabelWrapper margin={'0 0 0px 0'}>
                        <Body className={'body'} fontWeight={'500'} textDecoration={'underline'} text={strings.servingItRight} color={Colors.white} margin={'0 0 0px 4px'}  />
                        <Small className={'small'} text={strings.required} color={Colors.white} margin={'0 0 0px 4px'}  />
                      </LabelWrapper>
                      <img src={alertCloseIcon} alt="name" className="alertcloseicon" onClick={removeCertificateClickOpen} />
                  </div>
                  {/*<LabelWrapper margin={'8px 0 16px 0'}>
                    <Small text={strings.thereAreCurrentlyNoRecommended} color={Colors.error} margin={'0 0 0px 0'}  />
                    <Small text={strings.requirementsOr} color={Colors.error} margin={'0 0 0px 0px'}  />
                    <Small fontWeight={'500'} text={strings.Continue} color={Colors.error} margin={'0 0 0px 4px'}  />
                    <Small text={strings.toCreateThisGig} color={Colors.error} margin={'0 0 0px 4px'}  />
                  </LabelWrapper>*/}
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                  <TransparentButton className='transparentbutton' text={strings.Back} textAlign={'center'} width={'113px'}  />
                  <SecondaryButton className='secondarybutton' text={'Save & Exit'} width={'113px'} margin={'0px 16px 0px 0px'}  />
                  <PrimaryButton className='neutrallightbutton' text={strings.Continue} width={'113px'}  />
                </Grid>
              </Grid>
            </div>
          </div>
          <Dialog
            open={removeCertificateopen}
            onClose={handleClose}
            className={'modalwidth548'}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >

            <DialogTitle id="alert-dialog-title">
              {strings.RemoveCertificate_License}
                <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to remove this Certificate/License?
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

export default CGIGExperience;
