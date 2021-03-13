const initState = { statusReg: false, onSuccessReg: false, statusAuth: false, userInfo: null };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ERROR_WITH_REGISTRATION': {
      return { ...state, statusReg: action.errors };
    }
    case 'SUCCESS_REGISTRATION': {
      return { ...state, onSuccessReg: action.status, statusReg: false };
    }
    case 'ERROR_WITH_AUTH': {
      return { ...state, statusAuth: action.errors };
    }
    case 'SUCCESS_AUTH': {
      return { ...state, userInfo: action.user };
    }

    default:
      return state;
  }
};

export default userReducer;
