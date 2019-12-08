create extension plv8;
-- load 'auto_explain';
-- set auto_explain.log_min_duration = 0;
-- set auto_explain.log_analyze = true;
-- alter database docker set "user.id" to '1';
-- set "user.id" to '1';
-- set role to medium_user;
-- insert into threads (last_message, type, user_id) values ('2019-11-26 07:39:56', 'sms', '1') returning id;

-- Roles
drop role if exists anonymous;
create role anonymous;
grant anonymous to current_user;

drop role if exists medium_user;
create role medium_user;
grant medium_user to current_user;

-- Auth
create function current_user_id() returns integer as $$
  select nullif(current_setting('user.id', true), '')::integer;
$$ language sql stable;

grant execute on function current_user_id() to anonymous;
grant execute on function current_user_id() to medium_user;

-- Tables
create table if not exists users (
  id serial primary key,
  username text not null,
  first_name text
);

create table if not exists twilio_accounts (
  id serial primary key,
  account_sid text not null,
  auth_token text not null,
  user_id integer not null references users (id) on delete cascade,
  unique(account_sid, user_id)
);

create index twilio_accounts_user_id_index on twilio_accounts (user_id);
grant select, insert, update, delete on twilio_accounts to medium_user;
alter table twilio_accounts enable row level security;
create policy user_twilio_accounts on twilio_accounts to medium_user
  using (user_id = current_user_id())
  with check (user_id = current_user_id());

create table if not exists contacts (
  id serial primary key,
  first_name text,
  last_name text,
  user_id integer not null references users (id) on delete cascade
);

create index contacts_user_id_index on contacts (user_id);
grant select, insert, update, delete on contacts to medium_user;
grant usage, select on sequence contacts_id_seq to medium_user;
alter table contacts enable row level security;
create policy user_contacts on contacts to medium_user
  using (user_id = current_user_id())
  with check (user_id = current_user_id());

create type message_type as enum ('sms', 'voice', 'email');

create table if not exists threads (
  id serial primary key,
  last_message timestamp,
  type message_type not null,
  user_id integer not null references users (id) on delete cascade
);

create index threads_user_id_index on threads (user_id);
grant select, insert, update, delete on threads to medium_user;
grant usage, select on sequence threads_id_seq to medium_user;
alter table threads enable row level security;
create policy user_threads on threads to medium_user
  using (user_id = current_user_id())
  with check (user_id = current_user_id());

create table if not exists contact_threads (
  id serial primary key,
  contact_id integer not null references contacts (id) on delete cascade,
  thread_id integer not null references threads (id) on delete cascade,
  unique(contact_id, thread_id)
);

grant select, insert, update, delete on contact_threads to medium_user;
alter table contact_threads enable row level security;
create policy user_contact_threads on contact_threads to medium_user
  using ((select user_id from contacts where contacts.id = contact_id) = current_user_id())
  with check (
    (select user_id from contacts where contacts.id = contact_id) = current_user_id()
    or (select user_id from threads where threads.id = thread_id) = current_user_id());


create table if not exists contact_phones (
  id serial primary key,
  contact_id integer not null references contacts (id) on delete cascade,
  phone_number text not null,
  unique(contact_id, phone_number)
);

create index contact_phones_phone_number_index on contact_phones (phone_number);
grant select, insert, update, delete on contact_phones to medium_user;

alter table contact_phones enable row level security;
create policy user_contact_phones on contact_phones to medium_user
  using ((select user_id from contacts where contacts.id = contact_id) = current_user_id())
  with check ((select user_id from contacts where contacts.id = contact_id) = current_user_id());

create type message_status as enum (
  'accepted',
  'queued',
  'sending',
  'sent',
  'receiving',
  'received',
  'delivered',
  'undelivered',
  'failed',
  'read'
);

create type message_direction as enum ('inbound', 'outbound-api');

create table if not exists messages (
  id serial primary key,
  type message_type not null,
  status message_status not null,
  body text not null,
  to_number text not null,
  from_number text not null,
  date_sent timestamp not null,
  direction message_direction not null,
  thread_id int references threads (id),
  twilio_account_sid text not null,
  user_id int not null references users (id),
  foreign key (user_id, twilio_account_sid) references twilio_accounts (user_id, account_sid)
);

create index messages_user_id_index on messages (user_id);
grant select, insert, update, delete on messages to medium_user;
-- grant usage, select on sequence messages_id_seq to medium_user;
alter table messages enable row level security;
create policy user_messages on messages to medium_user
  using (user_id = current_user_id())
  with check (user_id = current_user_id());
