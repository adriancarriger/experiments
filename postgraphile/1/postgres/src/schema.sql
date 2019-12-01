CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  first_name TEXT
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contact_phone (
  id SERIAL PRIMARY KEY,
  phone_number TEXT,
  contact_id INTEGER NOT NULL REFERENCES contacts (id) ON DELETE CASCADE
);

CREATE TYPE message_status AS ENUM (
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

CREATE TABLE IF NOT EXISTS threads (
  id TEXT PRIMARY KEY,
  last_sent TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  status message_status NOT NULL,
  body TEXT NOT NULL,
  to_number TEXT NOT NULL,
  from_number TEXT NOT NULL,
  date_sent TIMESTAMP NOT NULL,
  thread_id TEXT NOT NULL REFERENCES threads (id)
);
