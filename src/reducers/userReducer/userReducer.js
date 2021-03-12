const initState = { onError: false, onSuccess: false };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ERROR_WITH_REGISTRATION': {
      return { ...state, onError: action.errors };
    }
    case 'SUCCESS_REGISTRATION': {
      return { ...state, onSuccess: action.status, onError: false };
    }
    default:
      return state;
  }
};

export default userReducer;
