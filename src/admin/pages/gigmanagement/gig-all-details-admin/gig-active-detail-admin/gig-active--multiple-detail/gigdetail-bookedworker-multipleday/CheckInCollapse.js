// Importing material ui
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Heading5Medium,Small} from '../../../../../../../Styles-Elements/Labels';
import { PrimaryButton} from '../../../../../../../Styles-Elements/Buttons';
import * as Colors from '../../../../../../../Styles-Elements/Colors';
// images
import ArrowIcon from '../../../../../../../image-assets/structure/arrow-right.svg';
import CroseImg from '../../../../../../../image-assets/structure/crose-icon-gray.svg';

import '../../../../GIGS.scss';
// Importing localised strings
const strings = require('../../../../../../../localisation_en.json')


function CheckInCollapse(props) {

  const [checkInopen, setOpen] = React.useState(false);
  const checkInClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }


  const [value, setValue] = useState('');

  return (
    <>
      <Box className={'selectTime'}>
        <Box className={'d-flex'}>
          <Heading5Medium className={'heading5medium'} fontWeight={'700'} color={Colors.nightGray} text={'Check-In Time'} />
          <Small className={'small'} fontWeight={'500'} color={Colors.blue} textDecoration={'underline'} cursor={'pointer'} onClick={checkInClickOpen} text={'Update Check-In Time'} />
        </Box>
        <Box className={'inputBoxParent'}>
          <Box className={'inputBox'}>
            <Small className={'small'} fontWeight={'500'} color={Colors.graye5} text={strings.ORIGINAL}  />
            <input className={'customeInput'} value={'10:00 AM'}  />
          </Box>
          <img src={ArrowIcon} alt="name" className={'arrowIcon'} />
          <Box className={'inputBox'}>
            <Small className={'small'} fontWeight={'500'} color={Colors.graye5} text={strings.ADJUSTED}  />
            <input className={'customeInput'} value={'-'}  />
          </Box>
        </Box>
      </Box>
      <Box className={'selectTime'}>
        <Box className={'d-flex'}>
          <Heading5Medium className={'heading5medium'} fontWeight={'700'} color={Colors.nightGray} text={'Check-Out Time'} />
          <Small className={'small'} fontWeight={'500'} color={Colors.blue} textDecoration={'underline'} cursor={'pointer'} onClick={checkInClickOpen} text={'Update Check-Out Time'} />
        </Box>
        <Box className={'inputBoxParent'}>
          <Box className={'inputBox'}>
            <Small className={'small'} fontWeight={'500'} color={Colors.graye5} text={strings.ORIGINAL}  />
            <input className={'customeInput'} value={'8:00 PM'}  />
          </Box>
          <img src={ArrowIcon} alt="name" className={'arrowIcon'} />
          <Box className={'inputBox'}>
            <Small className={'small'} fontWeight={'500'} color={Colors.graye5} text={strings.ADJUSTED}  />
            <input className={'customeInput'} value={'-'}  />
          </Box>
        </Box>
      </Box>


      <Dialog
        open={checkInopen}
        onClose={handleClose}
        className={'modalwidth548'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent style={{paddingBottom: '0px'}}>
          <h2 className={'heading30'} style={{margin: '0px 0px'}}>{strings.CheckInTime}</h2>
          <DialogContentText id="alert-dialog-description" style={{margin: '10px 0px'}}>
          You can update worker check-in time.
          </DialogContentText>
          <div className="grid-item" style={{margin: '10px 0px 20px 0px'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                ampm={true}
                openTo="hours"
                views={['hours', 'minutes']}
                inputFormat="HH:mm"
                mask="__:__"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          </DialogContent>
          <DialogActions>
              <PrimaryButton className='primarybutton' onClick={handleClose}  text={strings.Save} width={'150px'}  />
          </DialogActions>
      </Dialog>
    </>
  )
}

export default CheckInCollapse
