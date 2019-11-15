// ERD: https://dbdiagram.io/d/5d8f4059ff5115114db4b5cd

Table user {
  id int [pk]
  username varchar
}

Table contact {
  id int [pk]
  first_name varchar
  last_name varchar
  user_id int [ref: > user.id]
}

Table contact_phone {
  id int [pk]
  phone_number varchar
  contact_id int [ref: > contact.id]
}

Table twilio_account {
  id int [pk]
  user_id int [ref: > user.id]
}

Table message {
  id int [pk]
  status message_status
  body varchar
  from varchar
  to varchar
  twilio_account_id int [ref: > twilio_account.id]

  Indexes {
    from
    to
    twilio_account_id
  }
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
