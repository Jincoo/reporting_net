const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = async (event) => {
  const data = JSON.parse(event.body).payload.data;

  console.log('Function `submission-created` invoked', data);

  const submission = {
    data: data,
    ts: Date.now(),
  };

  await client.query(q.Create(q.Collection('submissions'), { data: submission }));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Submission stored' }),
  };
};