import twilio from 'twilio';
import knexFunction from 'knex';

const knex = knexFunction({
  client: 'pg',
  connection: { user: 'docker', password: 'docker', database: 'docker' }
});

const { ACCOUNT_SID, AUTH_TOKEN } = process.env;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

async function seed() {
  console.log('Inserting default user…');
  await knex('users').insert({
    username: 'adriancarriger',
    first_name: 'Adrian'
  });

  console.log('Pulling Twilio messages…');
  const twilioMessages = await client.messages.list();

  console.log('Inserting messages…');
  for (const message of twilioMessages) {
    const threadId = message.direction === 'inbound' ? message.from : message.to;

    const [threadExists] = await knex('threads')
      .select('*')
      .where({ id: threadId });

    if (!threadExists) {
      await knex('threads').insert({
        id: threadId,
        last_sent: message.dateSent
      });
    } else if (new Date(message.dateSent) > new Date(threadExists.last_sent)) {
      await knex('threads')
        .where({ id: threadId })
        .update({ last_sent: message.dateSent });
    }

    await knex('messages').insert({
      body: message.body,
      status: message.status,
      from_number: message.from,
      to_number: message.to,
      date_sent: message.dateSent,
      thread_id: threadId
    });
  }

  console.log('Seed complete!');
}

seed()
  .catch(console.error)
  .finally(() => knex.destroy());
