import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Heading4Medium,
  Heading6Medium,
  LabelWrapper,
  Small,
  Error,
} from "../../../Styles-Elements/Labels";
import {
  PrimaryButton,
  TransparentButton,
  SecondaryButton,
} from "../../../Styles-Elements/Buttons";
import * as Colors from "../../../Styles-Elements/Colors";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../store/actions/index";

import Grid from "@mui/material/Grid";
import "./CGIGInstructions.scss";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function CGIGInstructions(props) {
  const dispatch = useDispatch();

  let gig_data = useSelector((state) => state.gigData);
  // states define
  const [attire, setAttire] = useState(gig_data.attire);
  const [attireError, setAttireError] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(
    gig_data.additional_info
  );
  const [additionalInfoError, setAdditionalInfoError] = useState(false);
  const [thingsToBring, setThingsToBring] = useState(gig_data.things_to_bring);
  const [thingsToBringError, setThingsToBringError] = useState(false);

  const editorRef = useRef(null);

  const goNext = (click) => {
    // && additionalInfo !== "" && thingsToBring !== ""
    if (attire !== "") {
      let payloadObj = {
        attire: attire,
        additional_info: additionalInfo,
        things_to_bring: thingsToBring,
      };
      dispatch({
        type: ACTIONS.UPDATE_GIG_DATA,
        payload: payloadObj,
      });
      if (click === "save_exit") {
        console.log("click");
        props.setLoading(true);
        //debounce(() => {
        setTimeout(() => {
          let newObj = {
            ...gig_data,
            ...payloadObj,
          };
          props.handleSave(newObj);
        }, 2000);

        //}, 2000);
      } else {
        props.handleNext();
      }
    } else {
      if (attire == "") {
        setAttireError(true);
      }
      // if (additionalInfo == "") {
      //   setAdditionalInfoError(true)
      // }
      // if (thingsToBring == "") {
      //   setThingsToBringError(true)
      // }
    }
  };

  return (
    <div className="page-background">
      <div className="cgig-overview-main-holder">
        <Heading4Medium
          fontWeight={"700"}
          text={strings.instructions}
          color={Colors.black}
          margin={"0 0 12px 0"}
        />

        <div className="overview-box">
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <Heading6Medium
                className={"heading6medium"}
                text={strings.attire}
                color={Colors.nightGray}
                margin={"0 0 4px 0"}
              />
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={attire}
                onEditorChange={(e) => {
                  setAttire(e);
                  setAttireError(false);
                }}
                init={{
                  height: 160,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "preview",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo |" +
                    "bold italic underline |" +
                    " bullist numlist |",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              {attireError && (
                <Error
                  className="inputerror"
                  text={"Attire is required"}
                  color={Colors.error}
                  margin={"4px 0 8px 0"}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <LabelWrapper margin={"0 0 4px 0"}>
                <Heading6Medium
                  className={"heading6medium"}
                  text={strings.additionallnfo}
                  color={Colors.nightGray}
                  margin={"0 0 0px 0"}
                />
                <Small
                  className={"small"}
                  text={strings.optional}
                  color={Colors.nightGray}
                  margin={"0 0 0px 4px"}
                />
              </LabelWrapper>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={additionalInfo}
                onEditorChange={(e) => {
                  setAdditionalInfo(e);
                  setAdditionalInfoError(false);
                }}
                init={{
                  height: 160,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "preview",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo |" +
                    "bold italic underline |" +
                    " bullist numlist |",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              {/* {additionalInfoError && (
                <Error
                  className="inputerror"
                  text={"Additional lnfo is required"}
                  color={Colors.error}
                  margin={"4px 0 8px 0"}
                />
              )} */}
            </Grid>
            <Grid item xs={12}>
              <LabelWrapper margin={"0 0 4px 0"}>
                <Heading6Medium
                  className={"heading6medium"}
                  text={strings.thingsToBring}
                  color={Colors.nightGray}
                  margin={"0 0 0px 0"}
                />
                <Small
                  className={"small"}
                  text={strings.optional}
                  color={Colors.nightGray}
                  margin={"0 0 0px 4px"}
                />
              </LabelWrapper>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={thingsToBring}
                onEditorChange={(e) => {
                  setThingsToBring(e);
                  setThingsToBringError(false);
                }}
                init={{
                  height: 160,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "preview",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo |" +
                    "bold italic underline |" +
                    " bullist numlist |",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              {/* {thingsToBringError && (
                <Error
                  className="inputerror"
                  text={"Things to Bring is required"}
                  color={Colors.error}
                  margin={"4px 0 8px 0"}
                />
              )} */}
            </Grid>

            <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
              <TransparentButton
                className="transparentbutton"
                text={strings.Back}
                width={"113px"}
                margin={"10px 0px 0px 0px"}
                onClick={() => props.handleBack()}
              />
              {props.type === "Edit" && (
                <SecondaryButton
                  className={
                    props.loading ? "lightbuttonLoader" : "secondarybutton"
                  }
                  loading={props.loading}
                  text={"Save & Exit"}
                  width={"130px"}
                  margin={"10px 16px 0px 0px"}
                  onClick={() => goNext("save_exit")}
                />
              )}
              <PrimaryButton
                className="neutrallightbutton"
                text={strings.Continue}
                width={"113px"}
                margin={"10px 0px 0px 0px"}
                onClick={goNext}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default CGIGInstructions;
