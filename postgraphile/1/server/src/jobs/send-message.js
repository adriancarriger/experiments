const twilio = require('twilio');

const { ACCOUNT_SID, AUTH_TOKEN, SEND_MESSAGES, TEST_NUMBER } = process.env;

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
    const payload = {
      to: row.to_number,
      from: row.from_number,
      body: row.body
    };

    if (SEND_MESSAGES === 'true' || row.to_number === TEST_NUMBER) {
      await client.messages.create(payload);
    } else {
      console.log('Skipping send message', payload);
    }
  }
};
