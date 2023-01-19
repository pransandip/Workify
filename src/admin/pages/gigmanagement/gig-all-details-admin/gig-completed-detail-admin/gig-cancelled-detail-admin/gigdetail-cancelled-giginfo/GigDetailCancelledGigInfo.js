
import Box from '@mui/material/Box';
import { Heading4Medium,Heading5Medium, Body } from '../../../../../../../Styles-Elements/Labels';
import * as Colors from '../../../../../../../Styles-Elements/Colors';

import MapImg from '../../../../../../../image-assets/product/map.png';
import SuccessIcon from '../../../../../../../image-assets/structure/success-alert.svg';
import '../../../../GIGS.scss';

// Importing localised strings
const strings = require('../../../../../../../localisation_en.json')


function GigDetailCompletedGigInfo(props) {

  return (
    <>
      <Box className={'padding20'} >
        <div className={'left-side'}>
          <Heading4Medium className={'heading4medium'}
            text={strings.description}
            color={Colors.nightGray}
            padding={'0 0 12px 0'}
            fontWeight={'700'}
          />
          <Body className={'body'}
            text={strings.weAreSearchingForAnExperiencedAndEnergeticBaristaToFillInAShift}
            color={Colors.midGray}
            padding={'0 0 4px 0'}
          />
          <Body className={'body'}
            text={strings.youWillHaveTheOpportunityToBePartOfAFun}
            color={Colors.midGray}
            padding={'0 0 24px 0'}
          />
          <Body className={'body'}
            text={strings.youWillBeResponsibleFor}
            color={Colors.midGray}
            padding={'0 0 24px 0'}
          />
          <Body className={'body'}
            text={strings.servingCustomers}
            color={Colors.midGray}
            padding={'0 0 4px 0'}
          />
          <Body className={'body'}
            text={strings.operatingTheEspressoMachine}
            color={Colors.midGray}
            padding={'0 0 4px 0'}
          />
          <Body className={'body'}
            text={strings.operatingTheCashRegisterWhenRequired}
            color={Colors.midGray}
            padding={'0 0 16px 0'}
          />
          <Heading5Medium className={'heading5medium'}
            text={strings.CertificateLicense}
            color={Colors.nightGray}
            padding={'0 0 12px 0'}
            fontWeight={'700'}
          />
          <Body className={'body'}
            text={strings._servingItRight}
            color={Colors.midGray}
            padding={'0 0 4px 0'}
          />
          <Body className={'body'}
            text={strings.workingLicense}
            color={Colors.midGray}
            padding={'0 0 32px 0'}
          />
          <Heading4Medium className={'heading4medium'}
            text={strings.instructions}
            color={Colors.nightGray}
            padding={'0 0 12px 0'}
            fontWeight={'700'}
          />
          <Body className={'body'}
            text={strings.attire}
            color={Colors.nightGray}
            padding={'0 0 4px 0'}
            fontWeight={'700'}
          />
          <Body className={'body'}
            text={strings.blackTshirtAndLongPants}
            color={Colors.midGray}
            padding={'0 0 4px 0'}
          />
          <Body className={'body'}
            text={strings.blackDarkNonSlipShoes}
            color={Colors.midGray}
            padding={'0 0 16px 0'}
          />
          <Body className={'body'}
            text={strings.thingsToBring}
            color={Colors.nightGray}
            padding={'0 0 4px 0'}
            fontWeight={'700'}
          />
          <Body className={'body'}
            text={strings.Bringyourownapron}
            color={Colors.midGray}
            padding={'0 0 16px 0'}
          />
          <Body className={'body'}
            text={strings.AdditionalInformation}
            color={Colors.nightGray}
            padding={'0 0 4px 0'}
            fontWeight={'700'}
          />
          <Body className={'body'}
            text={strings.Pleaseenterviathebackdoor}
            color={Colors.midGray}
            padding={'0 0 4px 0'}
          />
          <Body className={'body'}
            text={strings.Youwillbeprovidedameal}
            color={Colors.midGray}
            padding={'0 0 4px 0'}
          />
          <Body className={'body'}
            text={strings.Tipsnotincluded}
            color={Colors.midGray}
            padding={'0 0 20px 0'}
          />
        </div>
        <div className={'right-side'}>
          <img src={MapImg} alt="name" className={'map-img'} />
          <Body className={'body centerText'} color={Colors.black}  text={'740 Hamamiltion St. Vancouver, BC, V6B 2H9'} />
          <Body className={'body centerText'} color={Colors.blue} fontWeight={'500'}  text={strings.Getdirectionstohere} />

          <ul className={'success-ul'}>
            <li><img src={SuccessIcon} alt="" className="successIcon" />{'There is free parking available nearby'}</li>
            <li><img src={SuccessIcon} alt="" className="successIcon" />{'There are transit options, a walk away'}</li>
          </ul>

        </div>
      </Box>
    </>
  )
}

export default GigDetailCompletedGigInfo
