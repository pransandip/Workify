import React, { useState } from "react";
// import { Heading2Bold } from '../../Styles-Elements/Labels';
import { POPUP_TYPE } from "../../Helpers/Enums";

import "./Popup.scss";

// Material UI for the snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { de } from "date-fns/locale";

// Importing localised strings
const strings = require("../../localisation_en.json");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Popup(props) {
  // const [fileName, setFileName] = useState('Drag and drop or select .CSV file')
  // const [fileImportContent, setFileImportContent] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarState, setSnackbarState] = useState("error");
  const [snackBarMessage, setSnackbarMessage] = useState("Checking Messages");
  const [inputFieldEntry, setInputFieldEntry] = useState("");
  const [toastOpen, setToastOpen] = useState(true);

  // async function handleDrop ([file]) {
  //   setFileName(file.name)

  //   var reader = new FileReader();
  //   reader.onload = () => {
  //     const binaryStr = reader.result
  //     setFileImportContent(binaryStr)
  //   }
  //   reader.readAsText(file);
  // }

  function getSnackBarMessage() {
    switch (props.style) {
      case POPUP_TYPE.RESET_PASSWORD:
        return strings.enterYourEmailAddress;
      case POPUP_TYPE.CHANGE_PASSWORD:
        return strings.enterYourPassword;
      case POPUP_TYPE.CHANGE_PROFILE_DETAIL:
        return strings.enterChangeProfileDetail;
      case POPUP_TYPE.CANCEL_SUBSCRIPTION:
        return strings.enterCancelSubscription;
      case POPUP_TYPE.ANNUAL_SUBSCRIPTION:
        return strings.enterAnnualSubscription;
      default:
        return;
    }
  }

  function handleRequest() {
    switch (props.style) {
      case POPUP_TYPE.RESET_PASSWORD:
        return;
      case POPUP_TYPE.CHANGE_PASSWORD:
        return;
      case POPUP_TYPE.CHANGE_PROFILE_DETAIL:
        props.setCode();
        return;
      case POPUP_TYPE.CANCEL_SUBSCRIPTION:
        props.setCode();
        return;
      case POPUP_TYPE.ANNUAL_SUBSCRIPTION:
        props.setCode();
        return;

      default:
        return;
    }
  }

  function submitRequest() {
    if (inputFieldEntry === "") {
      setSnackbarState("error");
      setSnackbarMessage(getSnackBarMessage());
      setSnackbarOpen(true);
    } else {
      // Send request
      handleRequest();
    }
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  }

  function renderPopupStyle(style, payload, closePopup) {
    switch (style) {
      //props.style

      // case POPUP_TYPE.RESET_PASSWORD:
      //   return (
      //     <div className="container">
      //       <div className="popup-wbimgpop-container neutral">
      //         <img src={wbimgpopNeutral} width={120} height={120} />
      //       </div>
      //       <Subtitle text={strings.forgotYourPassword} color={Colors.brandSecondary} textAlign={"center"} padding={"24px 0"}/>
      //               <LargeBody text={strings.letsRecoverYourPassword} textAlign={"center"} color={Colors.darkGray} padding={"0 0 16px 0"}/>
      //               <Subheading text={strings.email} color={Colors.brandSecondary} padding={"0 0 8px 0"}/>
      //               <Textfield onChange={(event) => setInputFieldEntry(event.target.value)} placeholder={strings.enterYourEmailAddress}/>
      //               <MainRoundedButton text={strings.confirm} margin={'24px 0 8px 0'} onClick={() => submitRequest()} />
      //               <ClearButton text={strings.cancel} onClick={() => props.closePopup()} />

      //     </div>
      //   );

      case POPUP_TYPE.CONFIRMATION:
        let { type, message } = payload;
        return (
          <div className="container">
            <Snackbar
              open={toastOpen}
              autoHideDuration={6000}
              onClose={(ev, reason) => {
                console.log(reason);

                if (reason === "clickaway") {
                  return;
                }
                setToastOpen(false);
                closePopup(false);
              }}
            >
              <Alert
                onClose={(ev, reason) => {
                  console.log(reason);
                  if (reason === "clickaway") {
                    return;
                  }
                  setToastOpen(false);
                  closePopup(false);
                }}
                severity={type}
              >
                {message}
              </Alert>
            </Snackbar>
          </div>
        );
      //     case POPUP_TYPE.CHANGE_PASSWORD:
      //       return <div className="container-modal">
      //               <div className="popup-wbimgpop-container neutral">
      //                 <img src={wbimgpopNeutral} width={120} height={120} />
      //               </div>
      //               <Subtitle text={strings.changeYourPassword} color={Colors.brandSecondary} textAlign={"center"} padding={"24px 0"}/>
      //               <LargeBody text={strings.enterYourPasswordBelowAndYouAreGoodToGo} textAlign={"center"} color={Colors.darkGray} padding={"0 0 16px 0"}/>
      //               <Subheading text={strings.existingPassword} color={Colors.brandSecondary} padding={"0 0 8px 0"}/>
      //               <Textfield onChange={(event) => setInputFieldEntry(event.target.value)}
      //                          type={'password'}
      //                          placeholder={strings.enterYourExistingPassword}/>
      //               <Subheading text={strings.newPassword} color={Colors.brandSecondary} padding={"16px 0 8px 0"}/>
      //               <Textfield onChange={(event) => setInputFieldEntry(event.target.value)}
      //                          type={'password'}
      //                          placeholder={strings.enterANewPassword}/>
      //               <MainRoundedButton text={strings.changePassword} margin={'24px 0 8px 0'} onClick={() => submitRequest()} />
      //               <ClearButton text={strings.cancel} onClick={() => props.closePopup()} />
      //           </div>
      //     case POPUP_TYPE.CHANGE_PROFILE_DETAIL:
      //               return <div className="container-modal">
      //                       <div className="popup-wbimgpop-container neutral">
      //                         <img src={wbimgpopNeutral} width={120} height={120} />
      //                       </div>
      //                       <Subtitle text={strings.changeYourProfileDetails} color={Colors.brandSecondary} textAlign={"center"} padding={"24px 0 16px"}/>
      //                       <div className="profile-upload-holder" style={{textAlign: 'center'}}>
      //                         <img src={defaultUploadIcon} className="profile-upload-icon" />
      //                         <input
      //                           accept="image/*"
      //                           className={classes.input}
      //                           id="contained-button-file"
      //                           multiple
      //                           type="file"
      //                         />
      //                         <label htmlFor="contained-button-file">
      //                           <Body text={strings.uploadNewImage} textAlign={"center"} color={Colors.brandPrimary} padding={'0'}/>
      //                         </label>
      //                       </div>
      //                       <Subheading text={strings.firstName} color={Colors.brandSecondary} padding={"0 0 8px 0"}/>
      //                       <Textfield placeholder={strings.firstName} margin={"0px 0 24px"}/>
      //                       <Subheading text={strings.lastName} color={Colors.brandSecondary} padding={"0 0 8px 0"}/>
      //                       <Textfield placeholder={strings.lastName} margin={"0px 0 24px"}/>
      //                       <MainRoundedButton text={strings.saveDetails} margin={'24px 0 8px 0'} onClick={() => submitRequest()} />
      //                       <ClearButton text={strings.cancel} onClick={() => props.closePopup()} />
      //           </div>
      //     case POPUP_TYPE.CANCEL_SUBSCRIPTION:
      // return <div className="container-modal">
      //         <div className="popup-wbimgpop-container negative">
      //           <img src={wbimgpopNegative} width={120} height={120} />
      //         </div>
      //         <Subtitle text={strings.areYouSureyouWantToCancelYourSubscription} color={Colors.brandSecondary} textAlign={"center"} padding={"24px 0"}/>
      //         <LargeBody text={strings.byLeavingUsYouWillLooseAccess} textAlign={"center"} color={Colors.darkGray} padding={"0 0 16px 0"}/>
      //         <Subheading text={strings.feedback} color={Colors.brandSecondary} padding={"0 0 8px 0"}/>
      //         <TextAreafield placeholder={strings.EnterAFeedbackWhereWeCanImprove} multiline
      //   rows={4}/>
      //         <CustomRoundedButton text={strings.sendFeedbackandCancelSubscription}
      //                              margin={'24px 0 8px 0'}
      //                              color={Colors.mainLight}
      //                              backgroundColor={Colors.lightRed}
      //                              onClick={() => submitRequest()} />
      //         <ClearButton text={strings.cancel} onClick={() => props.closePopup()} />
      //           </div>
      //     case POPUP_TYPE.ANNUAL_SUBSCRIPTION:
      //       return <div className="container-modal">
      //               <div className="popup-wbimgpop-container positive">
      //                 <img src={wbimgpopHappy} width={120} height={120} />
      //               </div>
      //               <Subtitle text={strings.letsGetTheMostOutOfwbimgpop} color={Colors.brandSecondary} textAlign={"center"} padding={"24px 0"}/>
      //               <LargeBodyRegular text={strings.byUpgradingToTheAnnual} textAlign={"center"} color={Colors.brandSecondary} padding={"0 0 16px 0"}/>
      //               <div className="popup-team-upgrade-summary">
      //                 <div>
      //                   <Heading2Bold text={strings.annualSubscription} />
      //                 </div>
      //                 <div>
      //                   <Heading2Bold text={"£359.96"} />
      //                 </div>
      //               </div>
      //               <Body text={strings.yourSubscriptionWillStartOn} textAlign={"center"} color={Colors.darkGray} padding={'16px 0 0 0'}/>

      //               <SecondaryRoundedButton text={strings.startAnnualCycle} margin={'24px 0 8px 0'} onClick={() => submitRequest()} />
      //               <ClearButton text={strings.cancel} onClick={() => props.closePopup()} />
      //           </div>

      default:
        return;
    }
  }

  return (
    <>
      {props.popupIsOpen ? (
        <div className="container">
          {renderPopupStyle(props.style, props.type, props.closePopup)}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={snackBarState}>
              {snackBarMessage}
            </Alert>
          </Snackbar>
        </div>
      ) : null}
    </>
  );
}

export default Popup;
