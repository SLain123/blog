import { getRequest, postRequest } from './FetchService';
import getToken from './StorageService';

const token = getToken();
const headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

if (token) {
  headers.Authorization = `Token ${token}`;
}

export const getArticleListService = (page = 1) => {
  const offset = (page - 1) * 5;

  return getRequest(`https://conduit.productionready.io/api/articles?limit=5&offset=${offset}`, headers);
};

export const getArticleService = (slug) =>
  getRequest(`https://conduit.productionready.io/api/articles/${slug}`, headers).then((data) => data.article);

export const createArticleService = (body) =>
  postRequest('https://conduit.productionready.io/api/articles', JSON.stringify(body), headers);

export const editArticleService = (slug, body) =>
  postRequest(`https://conduit.productionready.io/api/articles/${slug}`, JSON.stringify(body), headers, 'PUT');

export const removeArticleService = (slug) =>
  postRequest(`https://conduit.productionready.io/api/articles/${slug}`, null, headers, 'DELETE');

export const putLikeService = (slug, addOrRemove) => {
  const request = addOrRemove ? 'POST' : 'DELETE';

  return postRequest(`https://conduit.productionready.io/api/articles/${slug}/favorite`, null, headers, request);
};
