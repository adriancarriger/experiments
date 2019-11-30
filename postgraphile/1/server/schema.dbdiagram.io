// ERD: https://dbdiagram.io/d/5d8f4059ff5115114db4b5cd

Table users {
  id int [pk]
  username varchar
}

Table contacts {
  id int [pk]
  first_name varchar
  last_name varchar
  user_id int [ref: > users.id]
}

Table contact_phones {
  id int [pk]
  phone_number varchar
  contact_id int [ref: > contacts.id]
}

Table twilio_accounts {
  id int [pk]
  user_id int [ref: > users.id]
}

Table messages {
  id int [pk]
  status message_statuses
  body varchar
  from varchar
  to varchar
  twilio_account_id int [ref: > twilio_accounts.id]

  Indexes {
    from
    to
    twilio_account_id
  }
}

Enum message_statuses {
  accepted
  queued
  sending
  sent
  receiving
  received
  delivered
  undelivered
  failed
  read
}
