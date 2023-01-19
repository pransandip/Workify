
// Importing material ui
import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Heading5Medium,Heading6Medium, Body,LabelWrapper ,Small,InputLabel} from '../../../../../../../Styles-Elements/Labels';
import { SecondaryButton ,TransparentButton,NeutralLightButton,PrimaryButton} from '../../../../../../../Styles-Elements/Buttons';
import * as Colors from '../../../../../../../Styles-Elements/Colors';
import { TextAreafield } from '../../../../../../../Styles-Elements/Inputs';


import CheckInCollapse from './CheckInCollapse';

import '../../../../GIGS.scss';
import GigChat from '../../../../gig-layout-components/gig-chat/GigChat';

// images
import Round1 from '../../../../../../../image-assets/product/round-img3.png';
import CroseImg from '../../../../../../../image-assets/structure/crose-icon-gray.svg';
import SuccessIcon from '../../../../../../../image-assets/structure/success-alert.svg';

// Importing localised strings
const strings = require('../../../../../../../localisation_en.json')


function GigDetailBookedWorkerSingleDay(props) {
  const [open, setOpen] = React.useState(false);
  const [openOne, setOpenOne] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  const [openThree, setOpenThree] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickOne = () => {
    setOpenOne(!openOne);
  };
  const handleClickTwo = () => {
    setOpenTwo(!openTwo);
  };
  const handleClickThree = () => {
    setOpenThree(!openThree);
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [isChatActive, setChatActive] = useState(false);

  const toggleChatClass = () => {
    setChatActive(!isChatActive);
  };

  const [removeWorkeropen, setOpenRemove] = React.useState(false);
  const [deleteRemoveWorkeropen, deleteOpen] = React.useState(false);
  const [successRemoveWorkeropen, successOpen] = React.useState(false);
  const [reportAnIssueopen, reportOpen] = React.useState(false);
  const [reportAnIssueEditopen, reportEditOpen] = React.useState(false);
  const [reportAnIssueSelectopen, reportSelectOpen] = React.useState(false);
  const [reportAnIssueSelectConfirmopen, reportSelectConfirmOpen] = React.useState(false);
  const [reportAnIssueSuccessopen, successReportopen] = React.useState(false);

  const removeWorkerClickOpen = () => {
    setOpenRemove(true);
  };

  const deleteRemoveWorkerClickopen = () => {
    deleteOpen(true);
    setOpenRemove(false);
    reportEditOpen(false);
  };

  const successRemoveWorkerClickopen = () => {
    successOpen(true);
    deleteOpen(false);
    setOpenRemove(false);
  };

  const reportAnIssueClickOpen = () => {
    reportOpen(true);
    reportEditOpen(false);
    setOpenRemove(false);
    reportSelectOpen(false);
  };

  const reportAnIssueEditClickOpen = () => {
    reportEditOpen(true);
    setOpenRemove(false);
    reportOpen(false);
    reportSelectOpen(false);
    reportSelectConfirmOpen(false);
  };

  const reportAnIssueSelectopenClickOpen = () => {
    reportOpen(false);
    reportSelectOpen(true);
    reportEditOpen(false);
    setOpenRemove(false);
    reportSelectConfirmOpen(false);
  };

  const reportAnIssueSelectConfirmopenClickOpen = () => {
    reportSelectConfirmOpen(true);
    reportOpen(false);
    reportSelectOpen(false);
  };

  const reportAnIssueSuccessClickOpen = () => {
    successReportopen(true);
    reportSelectConfirmOpen(false);
  };


  const handleClose = () => {
    setOpenRemove(false);
    setOpen(false);
    deleteOpen(false);
    successOpen(false);
    reportOpen(false);
    reportEditOpen(false);
    reportSelectOpen(false);
    reportSelectConfirmOpen(false);
    successReportopen(false);
  };

  return (
    <>
       <Body className={'body'} color={Colors.midGray} fontWeight={'700'} text={'Upon arrival, please click/tap “Confirm Check-In” to confirm that the worker has arrived.'} />

       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
           <Box className={'left-collapse'}>
              <img src={Round1} className={'round-img'} alt="" />
              <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
           </Box>
           <Box className={'right-collapse'}>
             <LabelWrapper>
               <Small className={'small'} fontWeight={'700'} textDecoration={'underline'} onClick={toggleChatClass}  text={'Chat'} color={Colors.blue} />
               <Small className={'small'} fontWeight={'700'} textDecoration={'underline'} onClick={reportAnIssueClickOpen} text={'Report Issue'} color={Colors.error}  />
               <Small className={'small'} fontWeight={'700'} textDecoration={'underline'} onClick={removeWorkerClickOpen} text={'Remove Worker'} color={Colors.blue}  />
              </LabelWrapper>
            <AddIcon className={'plusIcon'} />
            <RemoveIcon className={'minusIcon'} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={'collapseContentTop'}>
            <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />
            <Box display={'flex'}>
              <AccessTimeIcon className={'icon20'} />
              <Body className={'body'} color={Colors.midGray} text={'10:00 AM - 8:00 PM'} />
            </Box>
            <Button className='lightgreenbutton' style={{marginLeft: 'unset'}}><img src={SuccessIcon} alt="" className="icon24" />{strings.CheckedIn}</Button>
          </Box>
          <Box className={'collapseContentTop'}>
            <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />
            <Box display={'flex'}>
              <AccessTimeIcon className={'icon20'} />
              <Body className={'body'} color={Colors.midGray} text={'10:00 AM - 8:00 PM'} />
            </Box>
            <SecondaryButton className={openOne ? 'secondarybutton hide': 'secondarybutton'}  onClick={handleClickOne} text={'Confirm Check In'} />
          </Box>
          <Collapse in={openOne} timeout="auto" unmountOnExit>
            <CheckInCollapse />
            <NeutralLightButton className='neutrallightbutton' text={strings.submit} width={'113px'}  />
            <TransparentButton className='transparentbutton' onClick={handleClickOne} text={strings.cancel} width={'113px'}  />
          </Collapse>

          <Box className={'collapseContentTop'}>
            <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />
            <Box display={'flex'}>
              <AccessTimeIcon className={'icon20'} />
              <Body className={'body'} color={Colors.midGray} text={'10:00 AM - 8:00 PM'} />
            </Box>
            <SecondaryButton className={openTwo ? 'secondarybutton hide': 'secondarybutton'}  onClick={handleClickTwo} text={'Confirm Check In'} />
          </Box>
          <Collapse in={openTwo} timeout="auto" unmountOnExit>
            <CheckInCollapse />
            <NeutralLightButton className='neutrallightbutton' text={strings.submit} width={'113px'}  />
            <TransparentButton className='transparentbutton' onClick={handleClickTwo} text={strings.cancel} width={'113px'}  />
          </Collapse>

          <Box className={'collapseContentTop'}>
            <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />


            <PrimaryButton className={openThree ? 'primarybutton hide': 'primarybutton'}  onClick={handleClickThree} text={strings.AddCheckIn} />
          </Box>
          <Collapse in={openThree} timeout="auto" unmountOnExit>
            <CheckInCollapse />
            <NeutralLightButton className='neutrallightbutton' text={strings.submit} width={'113px'}  />
            <TransparentButton className='transparentbutton' onClick={handleClickThree} text={strings.cancel} width={'113px'}  />
          </Collapse>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Box className={'left-collapse'}>
             <img src={Round1} className={'round-img'} alt="" />
             <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
          </Box>
          <Box className={'right-collapse'}>
            <LabelWrapper>
              <Small className={'small'} fontWeight={'700'} textDecoration={'underline'} onClick={toggleChatClass} text={'Chat'} color={Colors.blue} />
              <Small className={'small disabled'} fontWeight={'700'} textDecoration={'underline'} text={'Report Issue'} color={Colors.error}  />
              <Small className={'small disabled'} fontWeight={'700'} textDecoration={'underline'} text={'Remove Worker'} color={Colors.blue}  />
              <span className={'chips green'}>Gig Completed</span>
             </LabelWrapper>
           <AddIcon className={'plusIcon'} />
           <RemoveIcon className={'minusIcon'} />
         </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={'collapseContentTop'}>
            <Button className='lightgreenbutton'><img src={SuccessIcon} alt="" className="icon24" />{strings.RequestSent}</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Box className={'left-collapse'}>
             <img src={Round1} className={'round-img'} alt="" />
             <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
          </Box>
          <Box className={'right-collapse'}>
            <LabelWrapper>
              <span className={'chips red'}>Removed</span>
            </LabelWrapper>
           <AddIcon className={'plusIcon'} />
           <RemoveIcon className={'minusIcon'} />
         </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Box className={'collapseContentTop'}>
          <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />
          <Box display={'flex'}>
            <AccessTimeIcon className={'icon20'} />
            <Body className={'body'} color={Colors.midGray} text={'10:00 AM - 8:00 PM'} />
          </Box>
          <SecondaryButton className={open ? 'secondarybutton hide': 'secondarybutton'}  onClick={handleClick} text={'Confirm Check In'} />
        </Box>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CheckInCollapse />
            <NeutralLightButton className='neutrallightbutton' text={strings.submit} width={'113px'}  />
            <TransparentButton className='transparentbutton' onClick={handleClick} text={strings.cancel} width={'113px'}  />
          </Collapse>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4 '} onChange={handleChange('panel4 ')}>
        <AccordionSummary
          aria-controls="panel4 bh-content"
          id="panel4  bh-header"
        >
          <Box className={'left-collapse'}>
             <img src={Round1} className={'round-img'} alt="" />
             <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={'Richard Michicaels'} />
          </Box>
          <Box className={'right-collapse'}>
            <LabelWrapper>
              <Small className={'small'} fontWeight={'700'} textDecoration={'underline'} onClick={toggleChatClass} text={'Chat'} color={Colors.blue} />
              <Small className={'small'} fontWeight={'700'} textDecoration={'underline'} text={'Report Issue'} color={Colors.error}  />
              <Small className={'small'} fontWeight={'700'} textDecoration={'underline'} text={'Remove Worker'} color={Colors.blue}  />
              <Small className={'small'} fontWeight={'700'} textDecoration={'underline'} text={'Complete Gig'} color={Colors.blue}  />
             </LabelWrapper>
           <AddIcon className={'plusIcon'} />
           <RemoveIcon className={'minusIcon'} />
         </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={'collapseContentTop'}>
            <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />
            <Box display={'flex'}>
              <AccessTimeIcon className={'icon20'} />
              <Body className={'body'} color={Colors.midGray} text={'10:00 AM - 8:00 PM'} />
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Button className='lightgreenbutton'><img src={SuccessIcon} alt="" className="icon24" />{'Checked In'}</Button>
            </Box>
          </Box>
          <Box className={'collapseContentTop'}>
            <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />
            <Box display={'flex'}>
              <AccessTimeIcon className={'icon20'} />
              <Body className={'body'} color={Colors.midGray} text={'10:00 AM - 8:00 PM'} />
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Button className='lightgreenbutton'><img src={SuccessIcon} alt="" className="icon24" />{'Checked In'}</Button>
            </Box>
          </Box>
          <Box className={'collapseContentTop'}>
            <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />
            <Box display={'flex'}>
              <AccessTimeIcon className={'icon20'} />
              <Body className={'body'} color={Colors.midGray} text={'10:00 AM - 8:00 PM'} />
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Button className='lightgreenbutton'><img src={SuccessIcon} alt="" className="icon24" />{'Checked In'}</Button>
            </Box>
          </Box>
          <Box className={'collapseContentTop'}>
            <Body className={'body'} fontWeight={'700'} color={Colors.midGray} text={'Monday, April 4th, 2022'} />
            <Box display={'flex'}>
              <AccessTimeIcon className={'icon20'} />
              <Body className={'body'} color={Colors.midGray} text={'10:00 AM - 8:00 PM'} />
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Button className='lightgreenbutton'><img src={SuccessIcon} alt="" className="icon24" />{'Checked In'}</Button>
            </Box>
          </Box>
          <Box className={'question-answer'}>
            <Heading6Medium className={'heading6medium'} fontWeight={'700'} color={Colors.nightGray} text={'Please answer the following questions in order to mark the gig as complete by Richard:'} />
            <FormControl style={{marginTop: '20px',height:'auto'}}>
              <InputLabel id="arriveontime" fontWeight={'500'}  color={Colors.nightGray} text={'Did Richard arrive on time?'}/>
              <RadioGroup
                aria-labelledby="arriveontime"
                defaultValue="Yes"
                name="radio-buttons-group"
                style={{flexDirection: 'row'}}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{marginTop: '12px',height:'auto'}}>
              <InputLabel id="idOne" fontWeight={'500'}  color={Colors.nightGray} text={'Was Richard dressed appropriately according to the instructions?'}/>
              <RadioGroup
                aria-labelledby="idOne"
                defaultValue="Yes"
                name="radio-buttons-group"
                style={{flexDirection: 'row'}}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{marginTop: '12px',height:'auto'}}>
              <InputLabel id="idTwo" fontWeight={'500'}  color={Colors.nightGray} text={'Would you hire Richard again?'}/>
              <RadioGroup
                aria-labelledby="idTwo"
                defaultValue="Yes"
                name="radio-buttons-group"
                style={{flexDirection: 'row'}}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{marginTop: '12px',marginBottom:'20px',height:'auto'}}>
              <InputLabel id="idThree" fontWeight={'500'}  color={Colors.nightGray} text={'Would you like to add Richard to your Favorited Worker’s list?'}/>
              <RadioGroup
                aria-labelledby="idThree"
                defaultValue="Yes"
                name="radio-buttons-group"
                style={{flexDirection: 'row'}}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <Body className={'body'}  fontWeight={'500'} text={'Note: Richard will be added to your Favorited Worker list after completing payment.'} />
            <Box style={{marginTop: '20px'}}>
              <SecondaryButton className={'secondarybutton'} width={'110px'}  text={strings.Complete} />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Box className={isChatActive ? 'chatBox show': 'chatBox'}>
        <img src={CroseImg} alt="name" onClick={toggleChatClass} className="chat-close-icon" />
        <GigChat  />
      </Box>

      {/*removeWorkeropen Modal*/}
      <Dialog
        open={removeWorkeropen}
        onClose={handleClose}
        className={'modalwidth548'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {strings.RemoveWorker}
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <LabelWrapper>
            <Body className={'body'} text={'Please provide a reason you are removing '} color={Colors.midGray} />&nbsp;
            <Body className={'body'} fontWeight={'500'} text={' David William '} color={Colors.midGray}  />
            <Body className={'body'} text={' from this gig. '} color={Colors.midGray}  />
          </LabelWrapper>
          </DialogContentText>
          <div className="grid-item">
            <TextAreafield placeholder={strings.Yourreason} className="textareafield textarea" width={'100%'} />
          </div>
        </DialogContent>
        <DialogActions>
            <SecondaryButton className='secondarybutton' autoFocus text={strings.Next} onClick={deleteRemoveWorkerClickopen} width={'120px'}  />
        </DialogActions>
      </Dialog>

      {/*Delete Modal*/}
      <Dialog
        open={deleteRemoveWorkeropen}
        onClose={handleClose}
        className={'modalwidth548'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {strings.RemoveWorker}
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {strings.Areyousureyouwanttoremovethisworker}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TransparentButton className='transparentbutton' onClick={handleClose} text={strings.No} width={'auto'}  />
          <PrimaryButton className='primarybutton' onClick={successRemoveWorkerClickopen} autoFocus text={strings.ConfirmRemoval} width={'190px'}  />{/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>

      {/*success modal*/}
      <Dialog
        open={successRemoveWorkeropen}
        onClose={handleClose}
        className={'modalwidth548'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{textAlign: 'center'}}
      >
        <DialogTitle id="alert-dialog-title">
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent style={{paddingBottom: '10px'}}>
          <img src={SuccessIcon} alt="" className="icon60" />
          <DialogContentText id="alert-dialog-description">
            <Heading5Medium className={'heading5medium'} textAlign={'center'} color={Colors.midGray} fontWeight={'700'} margin={'20px 0px 15px 0px'} text={'You have successfully removed this worker'} />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
          <PrimaryButton className='primarybutton' onClick={handleClose} autoFocus text={strings.Continue} width={'210px'}  />{/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>

      {/*report an Issue*/}
      <Dialog
        open={reportAnIssueopen}
        onClose={handleClose}
        className={'modalwidth610'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={Colors.black}>
          {strings.ReportanIssue}
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <LabelWrapper style={{margin: '0px 0px 20px 0px'}}>
            <Body className={'body'} text={'You are reporting '} color={Colors.midGray} />&nbsp;
            <Body className={'body'} fontWeight={'500'} text={'Richard Michicaels '} color={Colors.midGray}  />
          </LabelWrapper>
          </DialogContentText>
          <Body className={'body'} text={'Please select from the following options:'}  />
          <ul className={'report-ul'}>
            <li>The worker is not here for the job and I have attempted to contact the worker via the number provided</li>
            <li onClick={reportAnIssueSelectopenClickOpen}>The worker does not possess the relevant certificate/license stated on their profile that I have set as a requirement to perform this job</li>
            <li>The worker arrived without the mentioned equipment or attire specified in the gig description.</li>
            <li>The worker is not following instructions provided and is causing a disruption that is detrimental to my business.</li>
            <li onClick={reportAnIssueEditClickOpen}>I am experiencing another type of issue</li>
          </ul>
        </DialogContent>
      </Dialog>

      {/*report an Issue YOU SELECTED*/}
      <Dialog
        open={reportAnIssueSelectopen}
        onClose={handleClose}
        className={'modalwidth610'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={Colors.black}>
          {strings.ReportanIssue}
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent style={{paddingBottom: '0px'}}>
          <DialogContentText id="alert-dialog-description">
            <LabelWrapper style={{margin: '0px 0px 20px 0px'}}>
              <Body className={'body'} text={'You are reporting '} color={Colors.midGray} />&nbsp;
              <Body className={'body'} fontWeight={'500'} text={'Richard Michicaels '} color={Colors.midGray}  />
            </LabelWrapper>
          </DialogContentText>
          <Small className={'small'} fontSize={'10px'} style={{margin: '0px 0px 6px 0px'}} color={Colors.midGray} text={'YOU SELECTED'} />
          <Body className={'body'} fontWeight={'500'} color={Colors.nightGray} text={'The worker does not possess the relevant certificate/licence stated on their profile that I have set as a requirement to perform this job. '} />
          <Divider className={'divider-line'} style={{margin: '10px 0px 10px 0px'}}  />
          <Body className={'body'} color={Colors.nightGray} style={{margin: '0px 0px 16px 0px'}} text={'Please select from the following options:'} />
          <Body className={'body'} fontWeight={'500'}  color={Colors.blue} margin={'10px 0px 10px 0px'} text={'Find me a replacement ASAP. (Note: This does not guarantee that we will be able to find a replacement. It may take up to an hour for a replacement worker to be found.)  '} />
          <Body className={'body'} fontWeight={'500'}  color={Colors.blue} margin={'10px 0px 10px 0px'} text={'I will accept the worker and assign him/her another task that doesn t require said certificate/licence. (Note: This has to be a mutual agreement with the worker.)'} />
          <Body className={'body'} fontWeight={'500'}  color={Colors.blue} margin={'10px 0px 10px 0px'} onClick={reportAnIssueSelectConfirmopenClickOpen}  text={'I don’t need a replacement, I’d like the worker to leave and for this worker to be cancelled from the gig. (Note: You will not be charged for this worker.)'} />

        </DialogContent>
        <DialogActions style={{justifyContent:'start'}}>
          <TransparentButton className='transparentbutton' onClick={reportAnIssueClickOpen} text={strings.Back} width={'auto'}  />
        </DialogActions>
      </Dialog>

      {/*report an Issue YOU SELECTED*/}
      <Dialog
        open={reportAnIssueSelectConfirmopen}
        onClose={handleClose}
        className={'modalwidth610'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={Colors.black}>
          {strings.ReportanIssue}
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent style={{paddingBottom: '0px'}}>
          <DialogContentText id="alert-dialog-description">
            <LabelWrapper style={{margin: '0px 0px 20px 0px'}}>
              <Body className={'body'} text={'You are reporting '} color={Colors.midGray} />&nbsp;
              <Body className={'body'} fontWeight={'500'} text={'Richard Michicaels '} color={Colors.midGray}  />
            </LabelWrapper>
          </DialogContentText>
          <Small className={'small'} fontSize={'10px'} style={{margin: '0px 0px 6px 0px'}} color={Colors.midGray} text={'YOU SELECTED'} />
          <Body className={'body'} fontWeight={'500'} color={Colors.nightGray} lineHeight={'20px'} text={'I don’t need a replacement, I’d like the worker to leave and for this worker to be cancelled from the gig. (Note: You will not be charged for this worker.)'} />
          <Divider className={'divider-line'} style={{margin: '10px 0px 10px 0px'}}  />
          <LabelWrapper style={{margin: '0px 0px 20px 0px'}}>
            <Body className={'body'} text={'What will happen if you'} color={Colors.nightGray} />&nbsp;
            <Body className={'body'} fontWeight={'700'} text={'Confirm,'} color={Colors.nightGray}  />
          </LabelWrapper>
          <Body className={'body'} color={Colors.nightGray} text={'— {Worker name} will be cancelled from the gig and asked to leave your work site.'} />
        </DialogContent>
        <DialogActions >
          <TransparentButton className='transparentbutton' onClick={reportAnIssueSelectopenClickOpen} text={strings.Back} width={'auto'}  />
          <PrimaryButton className='primarybutton' onClick={reportAnIssueSuccessClickOpen} autoFocus text={strings.confirm} width={'140px'}  />
        </DialogActions>
      </Dialog>

      {/*report success modal*/}
      <Dialog
        open={reportAnIssueSuccessopen}
        onClose={handleClose}
        className={'modalwidth610'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{textAlign: 'center'}}
      >
        <DialogTitle id="alert-dialog-title">
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent style={{paddingBottom: '10px'}}>
          <h2 className={'heading30'}><img src={SuccessIcon} alt="" className="icon60" />Richard successfully cancelled</h2>
          <DialogContentText id="alert-dialog-description">
            <Body className={'body'} textAlign={'center'} color={Colors.midGray} margin={'20px 0px 15px 0px'} text={'{Worker name} has been cancelled for the gig. Sorry for the inconvenience and thank you for your understanding.'} />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
          <PrimaryButton className='primarybutton' onClick={handleClose} autoFocus text={strings.Continue} width={'210px'}  />
        </DialogActions>
      </Dialog>

      {/*reportAnIssueopen Modal*/}
      <Dialog
        open={reportAnIssueEditopen}
        onClose={handleClose}
        className={'modalwidth610'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {strings.ReportanIssue}
            <Button className="modal-crose" onClick={handleClose}><img src={CroseImg} alt="name"  /></Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <LabelWrapper>
            <Body className={'body'} text={'You are reporting '} color={Colors.midGray} />&nbsp;
            <Body className={'body'} fontWeight={'500'} text={' Richard Michicaels '} color={Colors.midGray}  />
          </LabelWrapper>
          </DialogContentText>
          <Small className={'small'} fontSize={'10px'} style={{margin: '0px 0px 6px 0px'}} color={Colors.midGray} text={'YOU SELECTED'} />

          <div className="grid-item">
            <InputLabel text={'I am experiencing another type of issue'} color={Colors.nightGray} padding={'0px 0 8px 0'} className={'inputlabel'} />
            <TextAreafield placeholder={'Please provide as much detail as possible about the issue you are experiencing'} className="textareafield textarea" width={'100%'} />
          </div>
          <div className="grid-item" style={{margin: '10px 0px 6px 0px'}}>
            <InputLabel text={'Would you like to cancel the worker?'} color={Colors.nightGray} padding={'0px 0 8px 0'} className={'inputlabel'} />

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="SingleDay"
              name="radio-buttons-group">
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          <Divider className={'divider-line'} style={{margin: '10px 0px 10px 0px'}}  />
          <LabelWrapper style={{margin: '0px 0px 10px 0px'}}>
            <Body className={'body'} text={'What will happen if you'} color={Colors.nightGray} />&nbsp;
            <Body className={'body'} fontWeight={'700'} text={'Confirm,'} color={Colors.nightGray}  />
          </LabelWrapper>
          <Body className={'body'} lineHeight={'20px'} text={'— Your message will be sent to a member of our team who will review it.'} />
          <Body className={'body'} lineHeight={'20px'} text={'— The worker will be removed from this gig.'} />

        </DialogContent>
        <DialogActions>
            <TransparentButton className='transparentbutton' onClick={reportAnIssueSelectopenClickOpen} text={strings.Back} width={'auto'}  />
            <PrimaryButton className='primarybutton' autoFocus text={strings.Continue} onClick={deleteRemoveWorkerClickopen} width={'120px'}  />
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GigDetailBookedWorkerSingleDay
