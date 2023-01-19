import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
// Importing localised strings
import "./StepperHeader.scss";

import { getFormData } from "../../Helpers/formData";
import axios from "../../api/axios";
import { ACTIONS } from "../../store/actions/index";

// import AccountDetailSuccess from '../../pages/preplatform-service-agreement/account-detail-success/AccountDetailSuccess';
import CGIGOverview from "../../pages/create-gig/cgig-overview/CGIGOverview";
import CGIGExperience from "../../pages/create-gig/cgig-experience/CGIGExperience";
import CGIGLocation from "../../pages/create-gig/cgig-location/CGIGLocation";
import CGIGEDatesFrequency from "../../pages/create-gig/cgig-dates-frequency/CGIGEDatesFrequency";
import CGIGInstructions from "../../pages/create-gig/cgig-instructions/CGIGInstructions";
import CGIGPointOfContact from "../../pages/create-gig/cgig-pointofcontact/CGIGPointOfContact";
import Popup from "../../Styles-Elements/Popups/Popup";
import { POPUP_TYPE } from "../../Helpers/Enums";

const steps = [
  "Overview",
  "Experience",
  "Location",
  "Work Dates & Pay Frequency",
  "Instructions",
  "Point of Contact",
];
function StepperHeader6(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [confirmationType, setConfirmationType] = React.useState("");

  let gig_data = useSelector((state) => state.gigData);

  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  React.useEffect(() => {
    if (props.type === "Create") {
      setActiveStep(0);
    }
    if (props.prevPath) {
      if (props.prevPath.from === "Post preview page") {
        setActiveStep(5);
      }
    }
  }, [props.type]);

  const updateGig = (requestBody, config) => {
    axios
      .put(`/api/gig/edit/${gig_data.id}`, requestBody, config)
      .then((res) => {
        setLoading(false);
        if (res.data.ack === 1) {
          let path = `/gig`;
          setConfirmationOpen(true);
          setConfirmationType({
            type: "success",
            message: "Record successfully updated",
          });

          setTimeout(() => {
            history.push(path);
            dispatch({
              type: ACTIONS.CLEAR_GIG_DATA,
            });
          }, 1000);
        } else {
          let message = "";
          Array.isArray(res.data.msg)
            ? res.data.msg.length > 0 &&
            res.data.msg.forEach((item) => {
              message = message + " " + Object.values(item)[0];
            })
            : (message = res.data.msg);
          setConfirmationOpen(true);
          setConfirmationType({
            type: "error",
            message: message,
          });
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const saveUpdate = (payload) => {
    let requestBody = getFormData({ ...payload });

    updateGig(requestBody, config);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    sessionStorage.setItem("step", activeStep + 1);
    // console.log(sessionStorage.getItem("step"));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    sessionStorage.setItem("step", activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    sessionStorage.setItem("step", activeStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    sessionStorage.setItem("step", 0);
  };

  return (
    <div className="relative stepperheader6-holder">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            {/*<AccountDetailSuccess />*/}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              {activeStep === 0 || sessionStorage.getItem("step") === 0 ? (
                <CGIGOverview
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleSave={saveUpdate}
                  loading={loading}
                  setLoading={() => setLoading(true)}
                  type={props.type}
                />
              ) : activeStep === 1 || sessionStorage.getItem("step") === 1 ? (
                <CGIGExperience
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleSave={saveUpdate}
                  loading={loading}
                  setLoading={() => setLoading(true)}
                  type={props.type}
                />
              ) : activeStep === 2 || sessionStorage.getItem("step") === 2 ? (
                <CGIGLocation
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleSave={saveUpdate}
                  loading={loading}
                  setLoading={() => setLoading(true)}
                  type={props.type}
                />
              ) : activeStep === 3 || sessionStorage.getItem("step") === 3 ? (
                <CGIGEDatesFrequency
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleSave={saveUpdate}
                  loading={loading}
                  setLoading={() => setLoading(true)}
                  type={props.type}
                />
              ) : activeStep === 4 || sessionStorage.getItem("step") === 4 ? (
                <CGIGInstructions
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleSave={saveUpdate}
                  loading={loading}
                  setLoading={() => setLoading(true)}
                  type={props.type}
                />
              ) : activeStep === 5 || sessionStorage.getItem("step") === 5 ? (
                <CGIGPointOfContact
                  handleNext={handleNext}
                  handleBack={handleBack}
                  handleSave={saveUpdate}
                  loading={loading}
                  setLoading={() => setLoading(true)}
                  type={props.type}
                />
              ) : (
                ""
              )}
            </div>

            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box> */}
          </React.Fragment>
        )}
      </Box>
      {confirmationOpen && (
        <Popup
          popupIsOpen={confirmationOpen}
          style={POPUP_TYPE.CONFIRMATION}
          type={confirmationType}
          closePopup={() => setConfirmationOpen(false)}
        />
      )}
    </div>
  );
}

export default StepperHeader6;
