import { useState } from 'react';
import { useHistory } from "react-router-dom";
import LoginHeader from '../../Styles-Elements/login-heading/LoginHeader';
import LoginFooter from '../../Styles-Elements/login-footer/LoginFooter';
import { Heading2Bold, Heading6Medium } from '../../Styles-Elements/Labels';
import * as Colors from '../../Styles-Elements/Colors'

import './PasswordRecoveryConfirmation.scss';

// Material UI for the snackbar

// Importing localised strings
const strings = require('../../localisation_en.json')



function PasswordRecovery() {

    const history = useHistory();
    const routeChange = () =>{
        let path = `/signin`;
        history.push(path);
    }

  return (<div className="page-background">
    <LoginHeader />
    <div className="grayBox">
      <div className="grid-header">
          <Heading2Bold text={strings.passwordRecovery}
            color={Colors.black}
            textAlign={"center"} className={'heading2bold'}
          />
      </div>
      <div className="grid-container pr-confirmation">
        <Heading6Medium text={strings.anEmailContainingInformationOnHowToResetYourPasswordWillBeSentToTheUsernameEmail}
                      color={Colors.midGray}
                      padding={'0 0 45px 0'}
                      fontWeight={'400'} className={'heading6medium'} />
        <Heading6Medium text={strings.returnToSignIn} color={Colors.midGray} padding={'0 0 0px 0'} onClick={routeChange} className={'heading6medium'} />
      </div>
    </div>
    <LoginFooter />
  </div>)
}

export default PasswordRecovery;
