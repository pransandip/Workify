import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling gig details
 */

const initialState = {};

export function gigDetailsReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_GIG_DETAILS:
      return {
        ...newState,
        ...action.payload,
      };

    case ACTIONS.UPDATE_GIG_DETAILS_APPLICANT:
      const { id, type } = action.payload;
      let index = newState.applicant.findIndex(
        (item) => item.id.toString() === id.toString()
      );

      //selectedWorker.status = type;
      newState.applicant[index].status = type;
      let newObj = {
        ...newState,
      };
      return newObj;

    case ACTIONS.UPDATE_GIG_DETAILS_WORKERS:
      const { check_in, check_out, bookedworkers_id, checkin_checkout_id } =
        action.payload;
      let booked_workers_index = newState.bookedworkers.findIndex(
        (item) => item.id.toString() === bookedworkers_id.toString()
      );

      let checkedin_checkedout =
        newState.bookedworkers[booked_workers_index].checkin_checkout;
      console.log(checkedin_checkedout);
      console.log(checkedin_checkedout[checkin_checkout_id]);

      newState.bookedworkers[booked_workers_index].checkin_checkout =
        checkedin_checkedout.map((item) => {
          console.log(item.id, checkin_checkout_id);
          if (item.id === checkin_checkout_id) {
            return {
              ...item,
              checkin: check_in,
              checkout: check_out,
            };
          }
        });
      console.log(checkedin_checkedout, newState);
      let newObject = {
        ...newState,
      };

      //console.log(newObject);

      return newObject;

    case ACTIONS.UPATE_GIG_DETAILS_REMOVEWORKER:
      let bookedworkers = newState.bookedworkers;
      let filteredBookedworkers = bookedworkers.filter(
        (item) => item.id !== action.payload.invite_id
      );

      console.log(bookedworkers, filteredBookedworkers);

      newState = {
        ...newState,
        bookedworkers: [...filteredBookedworkers],
      };

      return newState;

    default:
      return state;
  }
}
