// ERD: https://dbdiagram.io/d/5d8f4059ff5115114db4b5cd
Enum "thread_type" {
  "sms"
  "voice"
  "email"
}

Enum "message_status" {
  "accepted"
  "queued"
  "sending"
  "sent"
  "receiving"
  "received"
  "delivered"
  "undelivered"
  "failed"
  "read"
}

Enum "message_direction" {
  "inbound"
  "outbound"
}

Table "users" {
  "id" int [pk, increment]
  "username" text [not null]
  "first_name" text
}

Table "twilio_accounts" {
  "id" int [pk, increment]
  "account_sid" text [unique, not null]
  "auth_token" text [not null]
  "user_id" integer [unique, not null]
}

Table "contacts" {
  "id" int [pk, increment]
  "first_name" text
  "last_name" text
  "user_id" integer [not null]

        
Indexes {
  user_id [name: "contacts_user_id_index"]
}
}

Table "threads" {
  "id" int [pk, increment]
  "last_message" timestamp
  "type" thread_type [not null]
  "user_id" integer [not null]
}

Table "contact_threads" {
  "id" int [pk, increment]
  "contact_id" integer [not null]
  "thread_id" integer [not null]
}

Table "contact_phones" {
  "id" int [pk, increment]
  "contact_id" integer [unique, not null]
  "phone_number" text [unique, not null]

        
Indexes {
  phone_number [name: "contact_phones_phone_number_index"]
}
}

Table "messages" {
  "id" int [pk, increment]
  "status" message_status [not null]
  "body" text [not null]
  "to_number" text [not null]
  "from_number" text [not null]
  "date_sent" timestamp [not null]
  "direction" message_direction [not null]
  "thread_id" int
  "twilio_account_sid" text [not null]
  "user_id" int [not null]
}

Ref:"twilio_accounts"."user_id" < "users"."id"

Ref:"contacts"."user_id" < "users"."id"

Ref:"threads"."user_id" < "users"."id"

Ref:"contact_threads"."contact_id" < "contacts"."id"

Ref:"contact_threads"."thread_id" < "threads"."id"

Ref:"contact_phones"."contact_id" < "contacts"."id"

Ref:"messages"."thread_id" < "threads"."id"

Ref:"messages"."twilio_account_sid" < "twilio_accounts"."account_sid"

Ref:"messages"."user_id" < "users"."id"

Ref:"messages"."user_id" < "twilio_accounts"."user_id"
