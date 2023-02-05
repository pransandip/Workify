import React, { useRef, useState, useEffect } from "react";
import { debounce, throttle } from "lodash";
import { Editor } from "@tinymce/tinymce-react";
import {
  Body,
  Heading4Medium,
  Heading5Medium,
  InputLabel,
  Error,
} from "../../../Styles-Elements/Labels";
import { Textfield } from "../../../Styles-Elements/Inputs";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../Styles-Elements/Buttons";
import * as Colors from "../../../Styles-Elements/Colors";
import axios, { imageBase } from "../../../api/axios";
// import images
import imageUploadIcon from "../../../image-assets/structure/image-upload.svg";
import WeaponsIcon from "../../../image-assets/structure/weapons.svg";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "../../../store/actions/index";
import Grid from "@mui/material/Grid";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./CGIGOverview.scss";

// Importing localised strings
const strings = require("../../../localisation_en.json");

function CGIGOverview(props) {
  const dispatch = useDispatch();
  let gig_data = useSelector((state) => state.gigData);
  console.log(`gig_data--overview-->`, gig_data);
  const user = useSelector((state) => state.userData.data);
  const localUser = localStorage.getItem("user");
  // states define
  const [gigPositionTitle, setGigPositionTitle] = useState(gig_data.position);
  const [vacancies, setVacancies] = useState(gig_data.vacancies);
  const [jobDescription, setJobDescription] = useState(gig_data.description);
  const [newLogoGig, setNewLogoGig] = useState(gig_data.cover_image);
  const [logoError, setLogoError] = useState(false);
  const [gigPositionTitleError, setGigPositionTitleError] = useState(false);
  const [vacanciesError, setVacanciesError] = useState(false);
  const [jobDescriptionError, setJobDescriptionError] = useState(false);
  const [backgroundChecked, setBackgroundChecked] = useState(
    gig_data.criminal_record_required
  );
  const [previewModal, setPreviewModal] = useState(gig_data.previewModal);

  let user_id = user ? user.id : JSON.parse(localUser).id;

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const getLocation = () => {
    axios
      .get(`api/users/location/${user_id}`, config)
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_ALL_LOCATION,
          payload: res.data.data,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (user_id) {
      getLocation();
    }
  }, []);

  // ref define
  const editorRef = useRef(null);

  const handleImgUpload = (e) => {
    console.log(`e.target.files[0]`, e.target.files[0]);
    setNewLogoGig(e.target.files[0]);
    setLogoError(false);
    let reader = new window.FileReader();
    if (reader) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        var image = new Image();
        image.src = reader.result;
        image.onload = function () {
          setPreviewModal({
            imageData: reader.result,
            path: reader.path,
          });
        };
      };
    }
  };

  const gotoNext = (click) => {
    // log();
    // var gigOverview = {
    //   Logo: newLogoGig,
    //   PositionTitle: gigPositionTitle,
    //   Vacancies: vacancies,
    //   jobDescription: jobDescription,
    // };
    // console.log(gigOverview);
    if (
      newLogoGig !== "" &&
      gigPositionTitle !== "" &&
      vacancies !== "" &&
      jobDescription !== ""
    ) {
      let payloadObj = {
        position: gigPositionTitle,
        vacancies: vacancies,
        description: jobDescription,
        previewModal: previewModal,
        cover_image: newLogoGig,
        criminal_record_required: backgroundChecked ? 1 : 0,
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
      if (!newLogoGig || previewModal.imageData === "") {
        setLogoError(true);
      }
      if (gigPositionTitle === "") {
        setGigPositionTitleError(true);
      }
      if (vacancies === "") {
        setVacanciesError(true);
      }
      if (jobDescription === "") {
        setJobDescriptionError(true);
      }
    }
  };

  return (
    <div className="page-background">
      <div className="cgig-overview-main-holder">
        <Heading4Medium
          className={"heading4medium"}
          fontWeight={"700"}
          text={strings.overview}
          color={Colors.black}
          margin={"0 0 12px 0"}
        />
        <div className="overview-box">
          <Heading5Medium
            className={"heading5medium"}
            fontWeight={"500"}
            text={strings.description}
            color={Colors.black}
            margin={"0 0 16px 0"}
          />
          <Body
            className={"body"}
            text={strings.pleaseIndicateThePositionTitle}
            color={Colors.midGray}
            margin={"0 0 20px 0"}
          />

          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <InputLabel
                text={`* ${strings.coverImage}`}
                color={Colors.nightGray}
                padding={"0px 0 8px 0"}
                className={"inputlabel"}
              />
              <div className="image-upload-holder">
                <label class="img-upload-box" style={{ height: "150px" }}>
                  <img
                    src={
                      previewModal.imageData
                        ? previewModal.imageData
                        : newLogoGig
                        ? `${imageBase}${newLogoGig}`
                        : imageUploadIcon
                    }
                    alt="name"
                    className=""
                    style={{
                      height: "100px",
                      weight: "125px",
                      padding: "10px",
                    }}
                  />
                  <Body
                    className={"body"}
                    fontWeight={"500"}
                    text={strings.uploadImage}
                    color={Colors.nightGray}
                    margin={"8px 0 0px 0"}
                  />
                  <Body
                    className={"body"}
                    text={strings.UploadImageInAllFormat}
                    color={Colors.lightGray}
                    margin={"8px 0 0px 0"}
                  />
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={(e) => {
                      handleImgUpload(e);
                    }}
                  />
                </label>
                {logoError && (
                  <Error
                    className="inputerror"
                    text={"Cover image is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
                {/* <img src={} className="uploaded-img" /> */}
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="grid-item">
                <InputLabel
                  text={`* ${strings.positionTitle}`}
                  color={Colors.nightGray}
                  padding={"0px 0 8px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className={
                    gigPositionTitleError
                      ? "input-error textfield"
                      : "textfield"
                  }
                  placeholder={strings.enterGigPositionTitle}
                  value={gigPositionTitle}
                  onChange={(e) => {
                    setGigPositionTitle(e.target.value);
                    setGigPositionTitleError(false);
                  }}
                  maxLength={200}
                />
                {gigPositionTitleError && (
                  <Error
                    className="inputerror"
                    text={"Position/title is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="grid-item">
                <InputLabel
                  text={`* ${strings.vacancies}`}
                  color={Colors.nightGray}
                  padding={"0px 0 8px 0"}
                  className={"inputlabel"}
                />
                <Textfield
                  className={
                    vacanciesError ? "input-error textfield" : "textfield"
                  }
                  placeholder={"Enter no of vacancies"}
                  value={vacancies}
                  onChange={(e) => {
                    if (parseInt(e.target.value) > 0 || e.target.value === "") {
                      if (e.target.value === "") {
                        setVacancies(e.target.value);
                        setVacanciesError(false);
                      } else {
                        setVacancies(parseInt(e.target.value));
                        setVacanciesError(false);
                      }
                    }
                  }}
                  inputProps={{
                    pattern: "[0-9]*",
                  }}
                />
                {vacanciesError && (
                  <Error
                    className="inputerror"
                    text={"Vacancy is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="grid-item">
                <InputLabel
                  text={`* ${strings.jobDescription}`}
                  color={Colors.nightGray}
                  padding={"0px 0 8px 0"}
                />
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  value={jobDescription}
                  onEditorChange={(e) => {
                    setJobDescription(e);
                    setJobDescriptionError(false);
                  }}
                  init={{
                    height: 200,
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
                {jobDescriptionError && (
                  <Error
                    className="inputerror"
                    text={"Job Description is required"}
                    color={Colors.error}
                    margin={"4px 0 8px 0"}
                  />
                )}
                {/* <button onClick={log} style={{ color: 'blue' }}>Log editor content</button> */}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                className="grid-item"
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={backgroundChecked}
                      size="small"
                      onChange={(e) => setBackgroundChecked(e.target.checked)}
                    />
                  }
                  label="I require worker(s) who have been criminally background checked"
                />
                <img src={WeaponsIcon} className={"weapons-icon"} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
              {props.type === "Edit" && (
                <SecondaryButton
                  className={
                    props.loading ? "lightbuttonLoader" : "secondarybutton"
                  }
                  loading={props.loading}
                  text={"Save & Exit"}
                  width={"130px"}
                  margin={"30px 16px 0px 0px"}
                  onClick={() => gotoNext("save_exit")}
                />
              )}
              <PrimaryButton
                className="primarybutton"
                text={strings.Continue}
                onClick={() => gotoNext()}
                width={"113px"}
                margin={"30px 0px 0px 0px"}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default CGIGOverview;
