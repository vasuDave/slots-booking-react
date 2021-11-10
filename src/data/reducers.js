const DATA = JSON.parse(localStorage.getItem("data")) || {};

const initialState = { ...DATA };

function appointments(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_APPOINTMENT":
      if (!state[action.date]) {
        state[action.date] = {
          [action.fromTime]: action.userData,
        };
      } else {
        state[action.date][action.fromTime] = action.userData;
      }
      localStorage.setItem("data", JSON.stringify(state));
      return { ...state };

    default:
      return state;
  }
}

export {appointments}
