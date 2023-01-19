import React from 'react';

import { Heading3Bold, Heading4Medium } from '../../Styles-Elements/Labels'
import * as Colors from '../../Styles-Elements/Colors'

import plusIcon from '../../image-assets/plus-icon.svg'
import minusIcon from '../../image-assets/minus-icon.svg'

// Importing localised strings
const strings = require('../../localisation_en.json')

function UserNumberCounter(props) {

  return (
  <div className="payment-summary-detail">
    <Heading4Medium text={strings.numberOfUsers}
                color={Colors.brandSecondary}
                padding={'6px 0 0 0'} />
    <div className="counter-holder">
      <button className="counter-button">
        <img src={minusIcon} width={16} onClick={() => props.numberOfUsers >= 2 ? props.setNumberOfUsers(props.numberOfUsers - 1) : props.setNumberOfUsers(1)} />
      </button>
      <Heading3Bold text={props.numberOfUsers} padding={'2px 0 0 0'} />
      <button className="counter-button">
        <img src={plusIcon} width={16} onClick={() => props.setNumberOfUsers(props.numberOfUsers + 1)} />
      </button>
    </div>
  </div>
  )
}

export default UserNumberCounter