import { getRequest } from './FetchService';

export const getArticleListService = (page = 1) => {
  const offset = (page - 1) * 5;

  return getRequest(`https://conduit.productionready.io/api/articles?limit=5&offset=${offset}`);
};

export const getArticleService = (slug) =>
  getRequest(`https://conduit.productionready.io/api/articles/${slug}`).then((data) => data.article);
