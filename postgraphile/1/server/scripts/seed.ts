import twilio from 'twilio';
import knexFunction from 'knex';

const knex = knexFunction({
  client: 'pg',
  connection: { user: 'docker', password: 'docker', database: 'docker' }
});

const { ACCOUNT_SID, AUTH_TOKEN, TEST_CONTACT_PHONE } = process.env;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

async function seed() {
  console.log('Inserting default user…');
  const [userId] = await knex('users')
    .insert({
      username: 'adriancarriger',
      first_name: 'Adrian'
    })
    .returning('id');

  console.log('Adding twilio account…');
  await knex('twilio_accounts').insert({
    account_sid: ACCOUNT_SID,
    auth_token: '', // let's make that more secure first 🤷
    user_id: userId
  });

  console.log('Pulling Twilio messages…');
  const twilioMessages = await client.messages.list();

  console.log('Inserting messages…');
  for (const message of twilioMessages) {
    await knex('messages').insert({
      body: message.body,
      type: 'sms',
      status: message.status,
      from_number: message.from,
      to_number: message.to,
      date_sent: message.dateSent,
      twilio_account_sid: message.accountSid,
      direction: message.direction,
      user_id: userId
    });
  }

  console.log('Adding fake contact…');
  await addContactWithPhone({
    firstName: `Bob-${Math.round(Math.random() * 100)}`,
    lastName: 'Smith',
    userId,
    phoneNumber: TEST_CONTACT_PHONE
  });

  console.log('Seed complete!');
}

seed()
  .catch(console.error)
  .finally(() => knex.destroy());

async function addContactWithPhone({ firstName, lastName, userId, phoneNumber }) {
  const [contactId] = await knex('contacts')
    .insert({
      first_name: firstName,
      last_name: lastName,
      user_id: userId
    })
    .returning('id');

  await knex('contact_phones').insert({
    contact_id: contactId,
    phone_number: phoneNumber
  });
}
