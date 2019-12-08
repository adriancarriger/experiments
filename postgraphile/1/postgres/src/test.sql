-- drop policy if exists user_contact_phones on contact_phones;
-- alter table contact_phones disable row level security;

-- alter table contact_phones enable row level security;
-- create policy user_contact_phones on contact_phones to medium_user
--   using ((select user_id from contacts where contacts.id = contact_id) = current_user_id())
--   with check ((select user_id from contacts where contacts.id = contact_id) = current_user_id());


-- drop policy if exists user_contact_threads on contact_threads;
-- alter table contact_threads disable row level security;

-- alter table contact_threads enable row level security;
-- create policy user_contact_threads on contact_threads to medium_user
--   using ((select user_id from contacts where contacts.id = contact_id) = current_user_id())
--   with check (
--     (select user_id from contacts where contacts.id = contact_id) = current_user_id()
--     or (select user_id from threads where threads.id = thread_id) = current_user_id());
