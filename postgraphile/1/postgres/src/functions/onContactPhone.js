const { NEW, plv8, NOTICE } = require('./globals');

// Start here
const { phone_number, contact_id } = NEW;

const [message] = plv8.execute(
  `select thread_id from messages
    where user_id = (
      select user_id from contacts where id = $1
    ) and type = 'sms' and (to_number = $2 or from_number = $2) limit 1;`,
  [contact_id, phone_number]
);

if (message && message.thread_id) {
  plv8.execute(`insert into contact_threads (contact_id, thread_id) values ($1, $2)`, [
    contact_id,
    message.thread_id
  ]);
}

return NEW;
