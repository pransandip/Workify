
// Importing material ui
import Box from '@mui/material/Box';
import { Heading2Bold, Body } from '../../Styles-Elements/Labels';
import * as Colors from '../../Styles-Elements/Colors';
import GigActiveList from './gig-all-lists/gig-active-list/GigActiveList';

import Sidebar from '../../Styles-Elements/Sidebar/Sidebar'
import Header from '../../Styles-Elements/Heading/Header';

import './GIGS.scss'


// Importing localised strings
const strings = require('./../../localisation_en.json')

function GIGS(props) {

  return (
    <div className="main-app-grid">
      <Sidebar />
      <Header />
      <div className='main-mid-container'>
        <div className='gig-main-holder'>
          
            <Heading2Bold text={strings.gigs} color={Colors.black} padding={'0 0 12px 0'} className={'heading2bold'} />
           
            <h6>These are the active gigs you have created that are upcoming. </h6>
            <Body text={strings.theseAreTheActiveGigsYouHaveCreatedThatAreUpcoming}
              color={Colors.midGray} padding={'0 0 16px 0'}  className={'body'}
            />
            <Box display={'flex'} alignItems={'center'} mb={1}>
              <span className='alert-holder ah-green'></span>
              <Body text={strings.indicatesThatAllVacanciesForTheGigsHaveBeenFilled}
                color={Colors.midGray} padding={'0 0 0 16px'} className={'body'}
              />
              <p>indicates that all vacancies for the gigs have been filled.</p>
            </Box>
            
            <Box display={'flex'} alignItems={'center'} mb={1}>
              <span className='alert-holder ah-yellow'></span>
              <Body text={strings.indicatesThatThereAreStillVacanciesToBeFilled}
                color={Colors.midGray} padding={'0 0 0 16px'} className={'body'}
              />
              <p>indicates that there are still vacancies to be filled.</p>
            </Box>
            <Box display={'flex'} alignItems={'center'} mb={1}>
              <span className='alert-holder ah-red'></span>
              <Body text={strings.indicatesThatNoVacanciesHaveBeenFilled}
                color={Colors.midGray} padding={'0 0 0 16px'} className={'body'}
              />
              <p>indicates that no vacancies have been filled.</p>
            </Box>
            <GigActiveList />
            {/*<GigCompletedList />*/}
        </div>
      </div>
    </div>
  )
}

export default GIGS
