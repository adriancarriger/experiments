-- Get messages (1/2)
SELECT *
FROM message
LIMIT 3;

-- Get messages (2/2);
SELECT contact_phone.number, contact.id, contact.first_name, contact.last_name
FROM contact_phone
INNER JOIN contact ON contact.id=contact_phone.contact_id
WHERE contact_phone.number IN ('+18053228443', '+18053228442', '+18053228441');

-- Contact's messages
SELECT message.id, message.status
FROM message
WHERE
  message.to IN (
    SELECT contact_phone.phone_number
    FROM contact_phone
    INNER JOIN contact ON contact_phone.contact_id=contact.id
    WHERE contact_id='1'
  );
