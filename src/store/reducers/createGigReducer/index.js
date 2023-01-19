import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all create gig data
 */

const initialState = {
  gig_type: "Create",
  cover_image: null,
  previewModal: {
    imgData: "",
    path: "",
  },
  description: "",
  criminal_record_required: 0,
  vacancies: 1,
  position: "",
  certificate_and_licence: "",
  certificate_and_licence_data: [],
  transit: "",
  location_id: "",
  location_data: "",
  day_type: "single",
  startdate: "",
  enddate: "",
  starttime: "",
  endtime: "",
  unpaid_break: "",
  paid_break: "",
  pay_frequency: "daily",
  hourly_pay: "",
  total_hours_per_worker: "",
  subtotal: "00.00",
  admin_fee_percent: "",
  admin_fee_amount: "",
  tax_percent: "",
  tax_amount: "",
  total_amount: "00.00",
  attire: "",
  additional_info: "",
  things_to_bring: "",
  type: "",
  name: "",
  title: "",
  contact_number: "",
};

export function createGigData(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.CREATE_GIG_DATA:
      return {
        ...newState,
        ...action.payload,
      };
    case ACTIONS.UPDATE_GIG_DATA:
      let newObj = {
        ...newState,
        ...action.payload,
      };
      return newObj;

    case ACTIONS.CLEAR_GIG_DATA:
      let obj = {
        gig_type: "Create",
        cover_image: null,
        previewModal: {
          imgData: "",
          path: "",
        },
        description: "",
        criminal_record_required: 0,
        vacancies: 1,
        position: "",
        certificate_and_licence: "",
        certificate_and_licence_data: [],
        transit: "",
        location_id: null,
        location_data: "",
        day_type: "single",
        startdate: "",
        enddate: "",
        starttime: "",
        endtime: "",
        unpaid_break: "",
        paid_break: "",
        pay_frequency: "daily",
        hourly_pay: "",
        total_hours_per_worker: "",
        subtotal: "00.00",
        admin_fee_percent: "",
        admin_fee_amount: "",
        tax_percent: "",
        tax_amount: "",
        total_amount: "00.00",
        attire: "",
        additional_info: "",
        things_to_bring: "",
        type: "",
        name: "",
        title: "",
        contact_number: "",
      };
      return obj;

    default:
      return state;
  }
}
