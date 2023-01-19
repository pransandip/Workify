import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import "./scss-assets/GlobelMaterial.scss";
import "./scss-assets/GlobelResponsive.scss";
import { createBrowserHistory } from "history";

import Signin from "./pages/signin/Signin";
import PasswordRecovery from "./pages/password-recovery/PasswordRecovery";
//SetPassword
import ResetPassword from "./pages/reset-password/ResetPassword";
import SetPassword from "./pages/reset-password/SetPassword";
import EmailVerification from "./pages/email-verification/EmailVerification";
import PasswordRecoveryConfirmation from "./pages/password-recovery-confirmation/PasswordRecoveryConfirmation";
import ServiceAgreement from "./pages/preplatform-service-agreement/ServiceAgreement";
import AccountSetting from "./pages/account-setting/AccountSetting";
import HelpSupport from "./pages/help-support/HelpSupport";
import GiveFeedback from "./pages/give-feedback/GiveFeedback";
import MainApp from "./pages/main-app/MainApp";
import HomePage from "./pages/home/HomePage";
import Schedule from "./pages/schedule/Schedule";
import Staff from "./pages/staff/Staff";
import GIGS from "./pages/gig/GIGS";
import GigCompletedList from "./pages/gig/gig-all-lists/gig-completed-list/GigCompletedList";
import GigCompletedDetail from "./pages/gig/gig-all-details/gig-completed-detail/GigCompletedDetail";
import GigCancelledDetail from "./pages/gig/gig-all-details/gig-completed-detail/gig-cancelled-detail/GigCancelledDetail";
import GigDetails from "./pages/gig/gig-all-details/GigDetails";
import GigSummary from "./pages/gig-summary/GigSummary";
import CreateGIG from "./pages/create-gig/CreateGIG";
import RecommendedWorkers from "./pages/recommended-workers/RecommendedWorkers";
import ViewProfileRecommended from "./pages/view-profile-recommended/ViewProfileRecommended";

// admin dashboard
import AdminDashboard from "./admin/pages/dashboard/AdminDashboard";
import ManageProvince from "./admin/pages/managesettings/ManageProvince";
import ManageIndustry from "./admin/pages/managesettings/ManageIndustry";
import ManageLicense from "./admin/pages/managesettings/ManageLicense";
import ManageCertificate from "./admin/pages/managesettings/ManageCertificate";
import WorkerManagement from "./admin/pages/usermanagement/worker/WorkerManagement";
import WorkerManagementEdit from "./admin/pages/usermanagement/worker/WorkerManagementEdit";
import BusinessManagement from "./admin/pages/usermanagement/business/BusinessManagement";
import BusinessManagementEdit from "./admin/pages/usermanagement/business/BusinessManagementEdit";
import GigManagement from "./admin/pages/gigmanagement/GigManagement";
// import AdminGigCompletedDetail from './admin/pages/gigmanagement/gig-completed-detail/AdminGigCompletedDetail';
import ManageAdminsListing from "./admin/pages/manage-admins/ManageAdminsListing";

import GigCompletedDetailAdmin from "./admin/pages/gigmanagement/gig-all-details-admin/gig-completed-detail-admin/GigCompletedDetailAdmin";
import GigCancelledDetailAdmin from "./admin/pages/gigmanagement/gig-all-details-admin/gig-completed-detail-admin/gig-cancelled-detail-admin/GigCancelledDetailAdmin";
import GigDetailsAdmin from "./admin/pages/gigmanagement/gig-all-details-admin/GigDetailsAdmin";
import PushNotification from "./admin/pages/custom-push-notification/PushNotification";
import AboutUs from "./admin/pages/cms/AboutUs";
import ContactUsEnquiries from "./admin/pages/cms/ContactUsEnquiries";
import TermsAndConditions from "./admin/pages/cms/TermsAndConditions";
import PrivacyPolicy from "./admin/pages/cms/PrivacyPolicy";
import FaqListing from "./admin/pages/cms/FaqListing";
import FaqEdit from "./admin/pages/cms/FaqEdit";
import CreateGIGAdmin from "./admin/pages/gigmanagement/create-gig-admin/CreateGIGAdmin";

import ScrollToTop from "./Styles-Elements/ScrollToTop/ScrollToTop";
function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" render={(props) => <Signin {...props} />} />
        <Route exact path="/signin" render={(props) => <Signin {...props} />} />
        <Route
          exact
          path="/password-recovery"
          render={(props) => <PasswordRecovery {...props} />}
        />
        <Route
          exact
          path="/reset-password"
          render={(props) => <ResetPassword {...props} />}
        />

        <Route
          exact
          path="/setpassword/:otp/:email"
          render={(props) => <SetPassword {...props} />}
        />
        <Route
          exact
          path="/email-verification"
          render={(props) => <EmailVerification {...props} />}
        />
        <Route
          exact
          path="/password-recovery-confirmation"
          render={(props) => <PasswordRecoveryConfirmation {...props} />}
        />
        <Route
          exact
          path="/service-agreement"
          render={(props) => <ServiceAgreement {...props} />}
        />
        <Route path="/main-app" render={(props) => <MainApp {...props} />} />
        <Route
          path="/account-setting"
          render={(props) => <AccountSetting {...props} />}
        />
        <Route
          path="/give-feedback"
          render={(props) => <GiveFeedback {...props} />}
        />
        <Route
          exact
          path="/helpsupport"
          render={(props) => <HelpSupport {...props} />}
        />
        <Route exact path="/home" render={(props) => <HomePage {...props} />} />
        <Route
          exact
          path="/schedule"
          render={(props) => <Schedule {...props} />}
        />
        <Route exact path="/staff" render={(props) => <Staff {...props} />} />
        <Route exact path="/gig" render={(props) => <GIGS {...props} />} />
        <Route
          exact
          path="/gig-completed-list"
          render={(props) => <GigCompletedList {...props} />}
        />
        <Route
          exact
          path="/gig-completed-detail"
          render={(props) => <GigCompletedDetail {...props} />}
        />
        <Route
          exact
          path="/gig-cancelled-detail"
          render={(props) => <GigCancelledDetail {...props} />}
        />
        <Route
          exact
          path="/gig-all-details"
          render={(props) => <GigDetails {...props} />}
        />
        <Route
          exact
          path="/gig-summary"
          render={(props) => <GigSummary {...props} />}
        />
        <Route
          exact
          path="/create-gig"
          render={(props) => <CreateGIG {...props} />}
        />
        <Route
          exact
          path="/recommended-workers"
          render={(props) => <RecommendedWorkers {...props} />}
        />
        <Route
          exact
          path="/view-profile-recommended"
          render={(props) => <ViewProfileRecommended {...props} />}
        />

        {/* admin dashboard */}
        <Route
          exact
          path="/admin-dashboard"
          render={(props) => <AdminDashboard {...props} />}
        />
        <Route
          exact
          path="/manage-province"
          render={(props) => <ManageProvince {...props} />}
        />
        <Route
          exact
          path="/manage-industry"
          render={(props) => <ManageIndustry {...props} />}
        />
        <Route
          exact
          path="/manage-license"
          render={(props) => <ManageLicense {...props} />}
        />
        <Route
          exact
          path="/manage-certificate"
          render={(props) => <ManageCertificate {...props} />}
        />
        <Route
          exact
          path="/worker-management"
          render={(props) => <WorkerManagement {...props} />}
        />
        <Route
          exact
          path="/Worker-management-edit"
          render={(props) => <WorkerManagementEdit {...props} />}
        />
        <Route
          exact
          path="/business-management"
          render={(props) => <BusinessManagement {...props} />}
        />
        <Route
          exact
          path="/business-management-edit"
          render={(props) => <BusinessManagementEdit {...props} />}
        />
        <Route
          exact
          path="/gig-management"
          render={(props) => <GigManagement {...props} />}
        />
        {/* <Route exact path="/admin-gig-completed-detail" render={(props) => <AdminGigCompletedDetail {...props} />} />  */}
        <Route
          exact
          path="/manage-admins-listing"
          render={(props) => <ManageAdminsListing {...props} />}
        />

        <Route
          exact
          path="/gig-completed-detail-admin"
          render={(props) => <GigCompletedDetailAdmin {...props} />}
        />
        <Route
          exact
          path="/gig-cancelled-detail-admin"
          render={(props) => <GigCancelledDetailAdmin {...props} />}
        />
        <Route
          exact
          path="/gig-all-details-admin"
          render={(props) => <GigDetailsAdmin {...props} />}
        />
        <Route
          exact
          path="/push-notification"
          render={(props) => <PushNotification {...props} />}
        />
        <Route
          exact
          path="/about-us"
          render={(props) => <AboutUs {...props} />}
        />
        <Route
          exact
          path="/contact-us-enquiries"
          render={(props) => <ContactUsEnquiries {...props} />}
        />
        <Route
          exact
          path="/terms-and-conditions"
          render={(props) => <TermsAndConditions {...props} />}
        />
        <Route
          exact
          path="/privacy-policy"
          render={(props) => <PrivacyPolicy {...props} />}
        />
        <Route
          exact
          path="/faq-listing"
          render={(props) => <FaqListing {...props} />}
        />
        <Route
          exact
          path="/faq-edit"
          render={(props) => <FaqEdit {...props} />}
        />
        <Route
          exact
          path="/create-git-admin"
          render={(props) => <CreateGIGAdmin {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
