const articleActions = {
  getArticle: (content) => ({ type: 'GET_ARTICLE', content }),

  failDownloadArticle: (error) => ({ type: 'FAIL_DOWNLOAD_ARTICLE', error }),

  makeLoadStatus: () => ({ type: 'MAKE_LOAD_STATUS' }),

  changeCreateEditStatus: (status) => ({ type: 'CHANGE_CREATE_OR_EDIT_ARTICLE_STATUS', status }),

  changeIsUserEditStatus: (status) => ({ type: 'CHANGE_IS_USER_EDIT_STATUS', status }),

  changeDisplayModalStatus: (status) => ({ type: 'CHANGE_DISPLAY_MODAL_STATUS', status }),
};

export default articleActions;
