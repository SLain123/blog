import { getRequest, postRequest } from './FetchService';

export const getArticleListService = (page = 1) => {
  const offset = (page - 1) * 5;

  return getRequest(`https://conduit.productionready.io/api/articles?limit=5&offset=${offset}`);
};

export const getArticleService = (slug) =>
  getRequest(`https://conduit.productionready.io/api/articles/${slug}`).then((data) => data.article);

export const createArticle = (token, body) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  };

  return postRequest('https://conduit.productionready.io/api/articles', JSON.stringify(body), headers);
};

export const editArticle = (slug, token, body) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  };

  return postRequest(`https://conduit.productionready.io/api/articles/${slug}`, JSON.stringify(body), headers, 'PUT');
};

export const removeArticle = (slug, token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  };

  return postRequest(`https://conduit.productionready.io/api/articles/${slug}`, null, headers, 'DELETE');
};
