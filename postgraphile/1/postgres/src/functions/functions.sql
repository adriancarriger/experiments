create or replace function on_message() returns trigger as $$
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
$$ language plv8;

create trigger on_message before insert or update on messages
  for each row execute procedure on_message();

create or replace function on_contact_phone() returns trigger as $$
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
$$ language plv8;

create trigger on_contact_phone after insert or update on contact_phones
  for each row execute procedure on_contact_phone();

