export const makeDummyShift = shift => dispatch =>
  dispatch({
    type: "CREATE_SHIFTS",
    payload: shift
  });

export const updateShifts = shift => dispatch =>
  dispatch({
    type: "UPDATE_SHIFTS",
    payload: shift
  });
