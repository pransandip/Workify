import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Body, Heading4Medium, Heading5Medium, InputLabel } from '../../../Styles-Elements/Labels';
import { Textfield } from '../../../Styles-Elements/Inputs';
import { PrimaryButton,SecondaryButton } from '../../../Styles-Elements/Buttons';
import * as Colors from '../../../Styles-Elements/Colors'
// import images
import imageUploadIcon from '../../../image-assets/structure/image-upload.svg';
import WeaponsIcon from '../../../image-assets/structure/weapons.svg';

import Grid from '@mui/material/Grid';
import {  FormControlLabel, Checkbox } from '@mui/material';
import './CGIGOverview.scss';

// Importing localised strings
const strings = require('../../../localisation_en.json')

function CGIGOverview() {
  const editorRef = useRef(null);


  return (
      <div className="page-background">
          <div className='cgig-overview-main-holder'>
            <Heading4Medium className={'heading4medium'} fontWeight={'700'} text={strings.overview} color={Colors.black} margin={'0 0 12px 0'}  />
            <div className='overview-box'>
              <Heading5Medium className={'heading5medium'} fontWeight={'500'} text={strings.description} color={Colors.black} margin={'0 0 16px 0'}  />
              <Body className={'body'} text={strings.pleaseIndicateThePositionTitle} color={Colors.midGray} margin={'0 0 20px 0'}  />

              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12}>
                  <InputLabel text={strings.coverImage}
                          color={Colors.nightGray}
                          padding={'0px 0 8px 0'} className={'inputlabel'} />
                  <div className='image-upload-holder'>
                    <label class="img-upload-box">
                        <img src={imageUploadIcon} alt="name" className='' />
                        <Body className={'body'} fontWeight={'500'} text={strings.uploadImage} color={Colors.nightGray} margin={'8px 0 0px 0'}  />
                        <Body className={'body'} text={strings.UploadImageInAllFormat} color={Colors.lightGray} margin={'8px 0 0px 0'}  />
                        <input type="file" />
                    </label>
                    {/* <img src={} className="uploaded-img" /> */}
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className="grid-item">
                    <InputLabel text={strings.positionTitle}
                      color={Colors.nightGray}
                      padding={'0px 0 8px 0'} className={'inputlabel'} />
                    <Textfield className="textfield" placeholder={strings.enterGigPositionTitle}  />
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="grid-item">
                    <InputLabel text={strings.vacancies}
                      color={Colors.nightGray}
                      padding={'0px 0 8px 0'} className={'inputlabel'} />
                    <Textfield className="textfield" placeholder={'1'}  />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="grid-item">
                    <InputLabel text={strings.jobDescription}
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
                <Grid item xs={12}>
                  <div className="grid-item" style={{display: 'flex',justifyContent:'flex-start'}}>
                    <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="I require worker(s) who have been criminally background checked" />
                    <img src={WeaponsIcon} className={'weapons-icon'} alt="" />
                  </div>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                  <SecondaryButton className='secondarybutton' text={'Save & Exit'} width={'113px'} margin={'30px 16px 0px 0px'}  />
                  <PrimaryButton className='primarybutton' text={strings.Continue} width={'113px'} margin={'30px 0px 0px 0px'}  />
                </Grid>
              </Grid>
            </div>
          </div>

      </div>
  )
}

export default CGIGOverview;
