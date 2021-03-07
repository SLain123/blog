const initState = { content: null };

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ARTICLE':
      return { ...state, content: action.content };
    default:
      return state;
  }
};

export default articleReducer;
