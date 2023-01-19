import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import * as Colors from '../../../Styles-Elements/Colors';
import { InputLabel } from '../../../Styles-Elements/Labels';
import { Heading3Bold,  } from '../../../Styles-Elements/Labels';
import { PrimaryButton } from '../../../Styles-Elements/Buttons';
import AdminHeader from '../../layout/header/AdminHeader.js';
import AdminSidebar from '../../layout/sidebar/AdminSidebar.js';

// Material UI for the snackbar
import Grid from '@mui/material/Grid';


import './cms.scss';

// Importing localised strings
// const strings = require('../../localisation_en.json');

//filter status dropdown
function PrivacyPolicy(props) {
  const editorRef = useRef(null);

    return (
    <div className="main-app-grid admin-main-content-dv">
      <AdminSidebar />
      <AdminHeader  />
      <div className='main-mid-container'>
        <div className="edit-pg-holder">
          <Grid container xs={8} spacing={2} className={''}>
            <Grid item xs={12} display={'flex'} >
                <Heading3Bold text={'Privacy Policy'} color={Colors.black} margin={'16px 0 30px 0'}  />
            </Grid>
            <Grid item xs={12}>
              <div className="grid-item">
                <InputLabel text={'Description'}
                  color={Colors.nightGray}
                  padding={'0px 0 8px 0'} />
                  <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                      height: 200,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
              </div>
            </Grid>
            <Grid item xs={12} style={{paddingTop: '0px'}}>
              <PrimaryButton className='primarybutton' text={'send '} width={'172px'} height={'56px'} margin={'8px 0 16px 0'} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
