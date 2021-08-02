const twilio = require('twilio');

const { ACCOUNT_SID, AUTH_TOKEN } = process.env;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

module.exports = async ({ id }, { withPgClient }) => {
  const {
    rows: [row]
  } = await withPgClient(pgClient =>
    pgClient.query('select to_number, from_number, body, direction from messages where id = $1', [
      id
    ])
  );

  if (row.direction === 'outbound-api') {
    await client.messages.create({
      to: row.to_number,
      from: row.from_number,
      body: row.body
    });
  }
};
