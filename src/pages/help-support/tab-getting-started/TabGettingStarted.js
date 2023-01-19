import { useState } from 'react';
import { Heading2Bold, Heading5Medium, Body } from '../../../Styles-Elements/Labels';
import * as Colors from '../../../Styles-Elements/Colors'
import Popup from '../../../Styles-Elements/Popups/Popup'
import { POPUP_TYPE } from '../../../Helpers/Enums'

import './TabGettingStarted.scss';

// Importing Material imports
import hsStartimg1 from '../../../image-assets/product/hs-startimg1.jpg';
import hsStartimg2 from '../../../image-assets/product/hs-startimg2.jpg';

// Importing Material imports
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

// Importing localised strings
const strings = require('../../../localisation_en.json')

function TabGettingStarted() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (<div className="page-background">
    <div className='hs-containpadding'>
    <Heading2Bold text={strings.businessStartGuide} color={Colors.nightGray} margin={'0 0 34px 0'}  />
    <List component="div" disablePadding>
      
      <ListItemButton sx={{pl: 0, mb: 2, alignItems: 'flex-start' }}>
        <ListItemIcon style={{minWidth: '16px', color: 'rgba(84, 84, 84, 1)'}}>1. </ListItemIcon>
        <Heading5Medium text={strings.createAGigByClicking} color={Colors.midGray} margin={'0 0 0px 0'}  />
      </ListItemButton>
      <div className='' style={{paddingLeft: '10px'}}>
        <img src={hsStartimg1}  alt='some value' />
      </div>
      <ListItemButton sx={{ pl: 0, mb: 3, alignItems: 'flex-start' }}>
        <ListItemIcon style={{minWidth: '16px', color: 'rgba(84, 84, 84, 1)'}}>2. </ListItemIcon>
        <Heading5Medium text={strings.inviteRecommendedWorkersTo} color={Colors.midGray} margin={'0px 0 0px 0'}  />
      </ListItemButton>
      <div className='' style={{paddingLeft: '20px'}}>
        <img src={hsStartimg2}  alt='some value' />
      </div>
      <ListItemButton sx={{ pl: 0, mb: 1, mt: 1, alignItems: 'flex-start' }}>
        <ListItemIcon style={{minWidth: '16px', color: 'rgba(84, 84, 84, 1)'}}>3. </ListItemIcon>
        <Heading5Medium text={strings.prepareABriefIntroduction} color={Colors.midGray} margin={'0px 0 0px 0'}  />
      </ListItemButton>
      <ListItemButton sx={{ pl: 0, mb: 1, alignItems: 'flex-start' }}>
        <ListItemIcon style={{minWidth: '16px', color: 'rgba(84, 84, 84, 1)'}}>4. </ListItemIcon>
        <Heading5Medium text={strings.prepareAnyAttireEquipmentThatYou} color={Colors.midGray} margin={'0px 0 0px 0'}  />
      </ListItemButton>
      <ListItemButton sx={{ pl: 0, mb: 1, alignItems: 'flex-start' }}>
        <ListItemIcon style={{minWidth: '16px', color: 'rgba(84, 84, 84, 1)'}}>5. </ListItemIcon>
        <Heading5Medium text={strings.whenTheWorkerSArriveForAGig} color={Colors.midGray} margin={'0px 0 0px 0'}  />
      </ListItemButton>
      <ListItemButton sx={{ pl: 0, mb: 1, alignItems: 'flex-start' }}>
        <ListItemIcon style={{minWidth: '16px', color: 'rgba(84, 84, 84, 1)'}}>6. </ListItemIcon>
        <Heading5Medium text={strings.afterTheCheckinProcessPlease} color={Colors.midGray} margin={'0px 0 0px 0'}  />
      </ListItemButton>
      <ListItemButton sx={{ pl: 0, mb: 1, alignItems: 'flex-start' }}>
        <ListItemIcon style={{minWidth: '16px', color: 'rgba(84, 84, 84, 1)'}}>7. </ListItemIcon>
        <Heading5Medium text={strings.onceTheGigIsDoneTimeIsUp} color={Colors.midGray} margin={'0px 0 0px 0'}  />
      </ListItemButton>
      <ListItemButton sx={{ pl: 0, mb: 1, alignItems: 'flex-start' }}>
        <ListItemIcon style={{minWidth: '16px', color: 'rgba(84, 84, 84, 1)'}}>8. </ListItemIcon>
        <Heading5Medium text={strings.afterThisCheckOutProcessIs} color={Colors.midGray} margin={'0px 0 0px 0'}  />
      </ListItemButton>
      <ListItemButton sx={{ pl: 0 }}>
        <Heading5Medium text={strings.pleaseNoteThatThereAre} color={Colors.midGray} margin={'20px 0 10px 0'}  />
      </ListItemButton>
      <ListItemButton sx={{ pl: 3 }}>
        <ListItemIcon style={{minWidth: '24px', color: 'rgba(84, 84, 84, 1)'}}><span style={{width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#000'}}></span></ListItemIcon>
          <Body text={strings.byRequestingRecommendedWorkers} color={Colors.midGray} margin={'0 0 0px 0'} fontWeight={'500'} />
      </ListItemButton>
      <ListItemButton sx={{ pl: 3 }}>
          <ListItemIcon style={{minWidth: '24px', color: 'rgba(84, 84, 84, 1)'}}><span style={{width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#000'}}></span></ListItemIcon>
          <Body text={strings.workersCanAlsoBeBookedBy} color={Colors.midGray} margin={'0 0 0px 0'} fontWeight={'500'} />
      </ListItemButton>
      <ListItemButton sx={{ pl: 3 }}>
          <ListItemIcon style={{minWidth: '24px', color: 'rgba(84, 84, 84, 1)'}}><span style={{width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#000'}}></span></ListItemIcon>
          <Body text={strings.pleaseNoteThatGigsAreClaimed} color={Colors.midGray} margin={'0 0 0px 0'} fontWeight={'500'} />
      </ListItemButton>
      </List>
    </div>
    <Popup popupIsOpen={popupOpen} style={POPUP_TYPE.RESET_PASSWORD} closePopup={() => setPopupOpen(false)} />
  </div>)
}

export default TabGettingStarted;
