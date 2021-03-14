const initState = { statusReg: false, onSuccessReg: false, statusAuth: false, userInfo: false, statusEdit: false };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_REG_STATUS': {
      return { ...state, statusReg: action.errors };
    }
    case 'SUCCESS_REGISTRATION': {
      return { ...state, onSuccessReg: action.status };
    }
    case 'CHANGE_AUTH_STATUS': {
      return { ...state, statusAuth: action.errors };
    }
    case 'SUCCESS_AUTH': {
      return { ...state, userInfo: action.user };
    }
    case 'CHANGE_EDIT_STATUS': {
      return { ...state, statusEdit: action.errors };
    }
    case 'SUCCESS_EDITING': {
      return { ...state, userInfo: action.user };
    }

    default:
      return state;
  }
};

export default userReducer;
