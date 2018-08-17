export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_SHIFTS":
      return {
        result: action.payload
      };
    case "UPDATE_SHIFTS":
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
