const initState = { content: null, onLoad: true, OnFail: false };

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ARTICLE':
      return { ...state, content: action.content, onLoad: false };
    case 'FAIL_DOWNLOAD_ARTICLE':
      return { ...state, onLoad: false, onFail: action.error };
    default:
      return state;
  }
};

export default articleReducer;
