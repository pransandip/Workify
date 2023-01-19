
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Heading4Medium, Heading5Medium, Heading6Medium, Body } from '../../../../../Styles-Elements/Labels';
import * as Colors from '../../../../../Styles-Elements/Colors'

import '../../../GIGS.scss'

// images
import { workerImageBase } from '../../../../../api/axios';
import Round1 from '../../../../../image-assets/product/round-img3.png';

// Importing localised strings
const strings = require('../../../../../localisation_en.json');


function GigDetailCompletedCostBreakdown(props) {
  console.log(props.gig_details);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Box className={'padding-right30'}>
            <Box className={'top-heading-flex'}>
              <Heading4Medium className={'heading4medium'} fontWeight={'700'} color={Colors.black} text={'Workers'} />
              <Heading4Medium className={'heading4medium'} fontWeight={'700'} color={Colors.black} text={`Subtotal : $${parseFloat(props.gig_details.subtotal).toFixed(2)}`} />
            </Box>
            {props.gig_details.bookedworkers &&
              props.gig_details.bookedworkers?.length > 0 && props.gig_details.bookedworkers.map((item, index) => (
                <Box className={'body-heading-flex'} key={index}>
                  <Box className={'left-heading'}>
                    <img src={item.profile_picture !== ""
                          ? `${workerImageBase}${item.profile_picture}`
                          : Round1} className={'round-img'} alt="" />
                    <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={`${item.first_name} ${item.last_name}`} />
                  </Box>
                  <Box className={'right-heading'}>
                    <Heading6Medium color={Colors.nightGray} className={'heading6medium'} text={`$${parseFloat(props.gig_details.total_amount/props.gig_details.bookedworkers.length).toFixed(2)}`} />
                  </Box>
                </Box>
              ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={'whiteBorderBox'}>
            <Heading4Medium fontWeight={700} className={'heading4medium'} color={Colors.nightGray} margin={'0 0  20px 0'} text={strings.CostBreakdown} />
            <div className={'frequency-flex-right'}>
              <Body className={'body'} fontWeight={500} color={Colors.nightGray} text={strings.Noofworkers} />
              <Body className={'body'} fontWeight={500} color={Colors.nightGray} text={`${props.gig_details.bookedworkers.length}`} />
            </div>
            <div className={'frequency-flex-right'}>
              <Body className={'body'} fontWeight={500} color={Colors.nightGray} text={strings.Subtotal} />
              <Body className={'body'} fontWeight={500} color={Colors.nightGray} text={`$${parseFloat(props.gig_details.subtotal).toFixed(2)}`} />
            </div>
            <div className={'divider'} style={{ margin: '7px 0px 7px 0px' }}></div>
            <div className={'frequency-flex-right'}>
              <Body className={'body'} fontWeight={500} color={Colors.nightGray} text={'Fee (20%)'} />
              <Body className={'body'} fontWeight={500} color={Colors.nightGray} text={`$${parseFloat(props.gig_details.admin_fee_amount).toFixed(2)}`} />
            </div>
            <div className={'frequency-flex-right'}>
              <Body className={'body'} fontWeight={500} color={Colors.nightGray} text={'Tax (5%)'} />
              <Body className={'body'} fontWeight={500} color={Colors.nightGray} text={`$${parseFloat(props.gig_details.tax_amount).toFixed(2)}`} />
            </div>
            <div className={'divider'} style={{ margin: '7px 0px 7px 0px' }}></div>
            <div className={'frequency-flex-right'}>
              <Heading5Medium className={'heading5medium'} fontWeight={700} color={Colors.nightGray} text={"Total Amount"} />
              <Heading5Medium className={'heading5medium'} fontWeight={700} color={Colors.nightGray} text={`$${parseFloat(props.gig_details.total_amount).toFixed(2)}`} />
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default GigDetailCompletedCostBreakdown
