import React from 'react';
import * as Colors from '../../../Styles-Elements/Colors'

import { Heading3Bold,  } from '../../../Styles-Elements/Labels';

import AdminHeader from '../../layout/header/AdminHeader.js';
import AdminSidebar from '../../layout/sidebar/AdminSidebar.js';


import './AdminDashboard.scss';

function AdminDashboard(props) {
  
    return(
      <>
      <AdminHeader />
      <AdminSidebar />
      <Heading3Bold text={'test'}  color={Colors.black} className={'heading3bold'} />

      </>
    )
}
export default AdminDashboard;
