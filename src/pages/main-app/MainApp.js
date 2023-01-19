import { useState } from 'react';
import Sidebar from '../../Styles-Elements/Sidebar/Sidebar'
import Header from '../../Styles-Elements/Heading/Header';
import HomePage from '../home/HomePage'
import CreateGIG from '../create-gig/CreateGIG'
import GigSummary from '../gig-summary/GigSummary'
import AccountSetting from '../account-setting/AccountSetting'
import HelpSupport from '../help-support/HelpSupport'
import GiveFeedback from '../give-feedback/GiveFeedback'
import Schedule from '../schedule/Schedule';
import Staff from '../staff/Staff';
import { SIDEBAR_STATE, HEADER_STATE } from '../../Helpers/Enums'
import './MainApp.scss'

// Importing localised strings
// const strings = require('../../localisation_en.json')

function MainApp(props) {

  const [currentOpenPage, setCurrentOpenPage] = useState(SIDEBAR_STATE.GIG_SUMMARY)
  // const [currentOpenPage, setCurrentOpenPage] = useState(HEADER_STATE.ACCOUNT_SETTING)


  function renderMainComponent() {
    switch (currentOpenPage) {
      case SIDEBAR_STATE.HOME:
        return renderHomePage()
      case SIDEBAR_STATE.GIGS:
        return renderGigs()
      case SIDEBAR_STATE.SCHEDULE:
        return renderSchedule()
      case SIDEBAR_STATE.STAFF:
        return renderStaff()
      case SIDEBAR_STATE.CREATE_GIG:
        return renderCreateGig()
      case SIDEBAR_STATE.GIG_SUMMARY:
        return renderGigSummary()

      case HEADER_STATE.ACCOUNT_SETTING:
        return renderAccountSetting()
      case HEADER_STATE.HELP_SUPPORT:
        return renderHelpSupport()
      case HEADER_STATE.GIVE_FEEDBACK:
        return renderGiveFeedback()

      default:
        break;
    }
  }

  function renderHomePage() {
    return <HomePage/>
  }

  function renderGigs() {
    return
  }

  function renderSchedule() {
    return <Schedule/>
  }

  function renderStaff() {
    return <Staff/>
  }

  function renderCreateGig() {
    return <CreateGIG />
  }
  function renderGigSummary() {
    return <GigSummary />
  }

  function renderAccountSetting() {
    return <AccountSetting />
  }

  function renderHelpSupport() {
    return <HelpSupport />
  }

  function renderGiveFeedback() {
    return <GiveFeedback />
  }

  // function logOut() {

  // }

  return (
    <div className="main-app-grid">
      <Sidebar setOpenedPage={(page) => setCurrentOpenPage(page)} />
      <Header  />
      <div className='main-mid-container'>
        {renderMainComponent()}
      </div>
    </div>
  )
}

export default MainApp
