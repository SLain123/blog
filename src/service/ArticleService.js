import axios from 'axios';

export const getArticleListService = (page = 1) => {
  const offset = (page - 1) * 5;

  return axios.get(`https://conduit.productionready.io/api/articles?limit=5&offset=${offset}`).then(({ data }) => data);
};

export const getArticleService = (slug) =>
  axios.get(`https://conduit.productionready.io/api/articles/${slug}`).then(({ data }) => data.article);
