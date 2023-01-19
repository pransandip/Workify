import React from 'react';
import Box from '@mui/material/Box';
import * as Colors from '../../../../../Styles-Elements/Colors';
import { Heading6Medium, Body ,Small} from '../../../../../Styles-Elements/Labels';
// images
import SendIcon from '../../../../../image-assets/structure/send-icon.svg';
import Round1 from '../../../../../image-assets/product/round-img3.png';

import '../../GIGS.scss';

function GigChat(props) {
  return (
    <>
      <Box className={'chat-main'}>
        <Box className={'chat-header'}>
          <img src={Round1} alt="name" className="chat-header-icon" />
          <Heading6Medium fontWeight={'600'} className={'heading6medium'} color={Colors.white} text={'Richard Michicaels'} />
        </Box>
        <Box className={'chat-body'}>
          <Box className={'overflowScroll'}>
            <span className={'date-chips'}>Today</span>
            <Box className={'chat-sender-parent'}>
              <Box className={'chat-sender'}>
                <Body text={'Lorem ipsum dolor sit amet, consur adipiscing elit.'} color={Colors.white} />
              </Box>
              <Small className={'small'} style={{marginTop: '4px'}}  color={Colors.nightGray} text={'08.22 pm'} />
            </Box>
            <Box className={'chat-receiver-parent'}>
              <Box className={'chat-receiver'}>
                <Body text={'Hi,'} color={Colors.nightGray} />
              </Box>
              <Box className={'chat-receiver'}>
                <Body text={'Lorem ipsum dolor sit amet, constur adipiscing elit.'} color={Colors.nightGray} />
              </Box>
              <Small className={'small'} style={{marginTop: '4px'}} color={Colors.nightGray} text={'08.22 pm'} />
            </Box>
            <Box className={'chat-sender-parent'}>
              <Box className={'chat-sender'}>
                <Body text={'Lorem ipsum dolor sit amet, consur adipiscing elit.'} color={Colors.white} />
              </Box>
              <Small className={'small'} style={{marginTop: '4px'}} color={Colors.nightGray} text={'05.01 pm'} />
            </Box>
          </Box>
        </Box>
        <Box className={'chat-footer'}>
          <Box className={'chat-input-box'}>
            <input type="text" placeholder={'Type your message here'} className={'chat-input'} />
            <span className={'send-btn'}>
              <img src={SendIcon} className={'send-icon'} alt="name"  />
            </span>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default GigChat
