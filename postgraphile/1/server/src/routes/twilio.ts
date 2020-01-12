import { Router } from 'express';
import { urlencoded } from 'body-parser';
import * as client from 'twilio';

import { getConnection } from '../db/knex';

async function handelTwilio(request, response) {
  const knex = getConnection();

  await knex('messages').insert({
    body: request.body.Body,
    type: 'sms',
    status: request.body.SmsStatus,
    from_number: request.body.From,
    to_number: request.body.To,
    date_sent: new Date().toISOString(),
    twilio_account_sid: request.body.AccountSid,
    direction: 'inbound',
    user_id: 1 // temp
  });

  response.status(200).send();
}

function auth(request, response, next) {
  const { AUTH_PROTOCOL, AUTH_HOSTNAME, AUTH_PORT } = process.env;

  if (AUTH_HOSTNAME === 'ngrok-id-here.ngrok.io') {
    throw Error('Please set AUTH_HOSTNAME in .env to a real ngrok url');
  }

  if (
    !client.validateRequest(
      process.env.AUTH_TOKEN,
      request.headers['x-twilio-signature'],
      `${AUTH_PROTOCOL}://${AUTH_HOSTNAME}:${AUTH_PORT}/twilio`,
      request.body
    )
  ) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

export function twilioRoute() {
  return Router().post('/twilio', urlencoded({ extended: false }), auth, handelTwilio);
}
