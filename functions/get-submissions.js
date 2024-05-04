const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = async (event) => {
  console.log('Function `get-submissions` invoked');

  const submissions = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('submissions'))),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  );

  return {
    statusCode: 200,
    body: JSON.stringify(submissions),
  };
};