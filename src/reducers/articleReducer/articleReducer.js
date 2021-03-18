const initState = { content: null, onLoad: true, onFail: false, createEditStatus: false };

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ARTICLE':
      return { ...state, content: action.content, onLoad: false };
    case 'FAIL_DOWNLOAD_ARTICLE':
      return { ...state, onLoad: false, onFail: action.error };
    case 'MAKE_LOAD_STATUS': {
      return { ...state, onLoad: true, onFail: false };
    }
    case 'CHANGE_CREATE_OR_EDIT_ARTICLE_STATUS': {
      return { ...state, createEditStatus: action.status };
    }
    default:
      return state;
  }
};

export default articleReducer;
