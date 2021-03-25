const listActions = {
  setLoad: () => ({ type: 'SET_LOAD_STATUS' }),

  getArticles: (data) => ({ type: 'GET_ARTICLE_LIST', data }),

  changePage: (page) => ({ type: 'CHANGE_PAGE', page }),

  failDownloadArticles: (error) => ({ type: 'FAIL_DOWNLOAD_LIST', error }),
};

export default listActions;
