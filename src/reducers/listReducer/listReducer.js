const initState = { articles: [], articlesCount: 0, page: 1, onLoad: true, onFail: false };

const listReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ARTICLE_LIST': {
      const { articles, articlesCount } = action.data;

      return { ...state, articles, articlesCount, onLoad: false };
    }
    case 'CHANGE_PAGE': {
      return { ...state, page: action.page, onLoad: true };
    }
    case 'FAIL_DOWNLOAD_LIST': {
      return { ...state, onLoad: false, onFail: action.error };
    }
    default:
      return state;
  }
};

export default listReducer;
