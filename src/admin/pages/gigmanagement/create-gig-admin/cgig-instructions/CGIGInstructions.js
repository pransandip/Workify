import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Heading4Medium, Heading6Medium, LabelWrapper, Small } from '../../../Styles-Elements/Labels';
import { PrimaryButton, TransparentButton,SecondaryButton } from '../../../Styles-Elements/Buttons';
import * as Colors from '../../../Styles-Elements/Colors';

import Grid from '@mui/material/Grid';
import './CGIGInstructions.scss';

// Importing localised strings
const strings = require('../../../localisation_en.json')

function CGIGInstructions() {
  const editorRef = useRef(null);

  return (
      <div className="page-background">
          <div className='cgig-overview-main-holder'>
            <Heading4Medium fontWeight={'700'} text={strings.instructions} color={Colors.black} margin={'0 0 12px 0'}  />

            <div className='overview-box'>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12}>
                <Heading6Medium className={'heading6medium'} text={strings.attire} color={Colors.nightGray} margin={'0 0 4px 0'}  />
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 160,
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
              </Grid>
              <Grid item xs={12}>
                <LabelWrapper margin={'0 0 4px 0'}>
                  <Heading6Medium className={'heading6medium'} text={strings.additionallnfo} color={Colors.nightGray} margin={'0 0 0px 0'}  />
                  <Small className={'small'} text={strings.optional} color={Colors.nightGray} margin={'0 0 0px 4px'}  />
                </LabelWrapper>
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 160,
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
              </Grid>
              <Grid item xs={12}>
                <LabelWrapper margin={'0 0 4px 0'}>
                  <Heading6Medium className={'heading6medium'} text={strings.thingsToBring} color={Colors.nightGray} margin={'0 0 0px 0'}  />
                  <Small className={'small'} text={strings.optional} color={Colors.nightGray} margin={'0 0 0px 4px'}  />
                </LabelWrapper>
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 160,
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
                </Grid>

                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} >
                  <TransparentButton className='transparentbutton' text={strings.Back} width={'113px'} margin={'10px 0px 0px 0px'} />
                  <SecondaryButton className='secondarybutton' text={'Save & Exit'} width={'113px'} margin={'10px 16px 0px 0px'}  />
                  <PrimaryButton className='neutrallightbutton' text={strings.Continue} width={'113px'} margin={'10px 0px 0px 0px'} />
                </Grid>
              </Grid>
            </div>
          </div>
      </div>
  )
}

export default CGIGInstructions;
