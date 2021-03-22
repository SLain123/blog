import { getRequest, postRequest } from './FetchService';
import getToken from './StorageService';

const getHeader = () => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return headers;
};

export const getArticleListService = (page = 1) => {
  const offset = (page - 1) * 5;
  const header = getHeader();
  return getRequest(`https://conduit.productionready.io/api/articles?limit=5&offset=${offset}`, header);
};

export const getArticleService = (slug) => {
  const header = getHeader();
  return getRequest(`https://conduit.productionready.io/api/articles/${slug}`, header).then((data) => data.article);
};

export const createArticleService = (body) => {
  const header = getHeader();
  return postRequest('https://conduit.productionready.io/api/articles', JSON.stringify(body), header);
};

export const editArticleService = (slug, body) => {
  const header = getHeader();
  return postRequest(`https://conduit.productionready.io/api/articles/${slug}`, JSON.stringify(body), header, 'PUT');
};

export const removeArticleService = (slug) => {
  const header = getHeader();
  return postRequest(`https://conduit.productionready.io/api/articles/${slug}`, null, header, 'DELETE');
};

export const putLikeService = (slug, addOrRemove) => {
  const request = addOrRemove ? 'POST' : 'DELETE';
  const header = getHeader();
  return postRequest(`https://conduit.productionready.io/api/articles/${slug}/favorite`, null, header, request);
};
