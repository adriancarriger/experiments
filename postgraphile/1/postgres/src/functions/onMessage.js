const { NEW, plv8, NOTICE } = require("./globals");

// Start here
const { direction, from_number, to_number, user_id, date_sent } = NEW;
const threadPhoneNumber = direction === "inbound" ? from_number : to_number;

NEW.thread_id = upsertThread(user_id, date_sent, threadPhoneNumber);

return NEW;

function upsertThread(userId, lastMessage, threadPhoneNumber) {
  const [previousMessage] = plv8.execute(
    `select thread_id from messages
    where user_id = $1 and type = 'sms' and (to_number = $2 or from_number = $2) limit 1;`,
    [userId, threadPhoneNumber]
  );

  if (!previousMessage || !previousMessage.thread_id) {
    // create new thread
    const [
      { id }
    ] = plv8.execute(
      `insert into threads (last_message, type, user_id) values ($2, 'sms', $1) returning id;`,
      [userId, lastMessage]
    );

    matchContactsWithThread(id, threadPhoneNumber);

    return id;
  }

  plv8.execute(
    `update threads set last_message = $1 where id = $2 and $1 > last_message;`,
    [date_sent, previousMessage.thread_id]
  );

  return previousMessage.thread_id;
}

function matchContactsWithThread(threadId, threadPhoneNumber) {
  plv8.execute(
    `insert into contact_threads (contact_id, thread_id)
      select contact_id, $1 as thread_id
      from contact_phones where phone_number = $2;`,
    [threadId, threadPhoneNumber]
  );
}
