export const getArticle = (content) => ({ type: 'GET_ARTICLE', content });

export const failDownloadArticle = (error) => ({ type: 'FAIL_DOWNLOAD_ARTICLE', error });
