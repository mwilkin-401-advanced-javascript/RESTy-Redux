import superagent from 'superagent';

const base = 'http://localhost:3000/api/v1';

// /api/v1/models
// /api/v1/:model/schema
// /api/v1/:model/:id
export const get = (payload) => {
  const url = `${base}/${Object.values(payload).join('/')}`;
  return superagent
    .get(url)
    .then(result => result.body)
    .catch(console.error);
};

export const put = (payload) => {
  const url = `${base}/${payload.model}/${payload.data._id}`;
  return superagent
    .put(url)
    .send(payload.data)
    .then(result => result.body)
    .catch(console.error);
};
