import React from 'react';
import * as FontStyles from '../../Styles-Elements/FontStyles'
import * as Colors from '../../Styles-Elements/Colors'
import { LabelWrapper, Small } from '../../Styles-Elements/Labels';

import './LoginFooter.scss';

// import images
import headerLogo from '../../image-assets/logo/header-logo.svg';

// Importing localised strings
const strings = require('../../localisation_en.json')

class LoginHeader extends React.Component {

  render() {
    return <div>
      <div className='footer-img-block'>
          <img height={60} src={headerLogo} alt="name" className="login-logo" />
      </div>
      <div className="login-footer-holder">
        <LabelWrapper justifyContent={"center"}>
            <Small text={strings.WorkBrieflyInc2020}
                            width={'auto'}
                            color={Colors.white}
                            padding={'16px 24px 16px 24px'}
                            fontSize={'12px'}  className={'footer-small'}
                            />
            <Small text={strings.termsConditions}
                  padding={'16px 24px 16px 24px'}
                  color={Colors.white}
                  theme={FontStyles.small}
                  cursor={'pointer'}  className={'footer-small'}
                  />
            <Small text={strings.privacyPolicy}
                  padding={'16px 24px 16px 24px'}
                  color={Colors.white}
                  theme={FontStyles.small}
                  cursor={'pointer'}  className={'footer-small'}
                  />

        </LabelWrapper>

      </div>

  </div>

  }
}

export default LoginHeader;
