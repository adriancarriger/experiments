// ERD: https://dbdiagram.io/d/5d9f3dabff5115114db51e02

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

Table phones {
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
  status message_status
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

// Fact table
Table sent_messages {
  id int [pk]
  user_id int [ref: > users.id]
  message_id int [ref: > messages.id]
  contact_id int [ref: > contacts.id]
}

Enum message_status {
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
