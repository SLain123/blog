export const setLoad = () => ({ type: 'SET_LOAD_STATUS' });

export const getArticles = (data) => ({ type: 'GET_ARTICLE_LIST', data });

export const changePage = (page) => ({ type: 'CHANGE_PAGE', page });

export const failDownloadArticles = (error) => ({ type: 'FAIL_DOWNLOAD_LIST', error });
