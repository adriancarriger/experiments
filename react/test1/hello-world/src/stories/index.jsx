import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import {
  withKnobs,
  boolean,
  color,
  number,
  object,
  select,
  text
} from '@storybook/addon-knobs/react';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module)
  .addDecorator(withKnobs)
  .add('to Storybook', () => {
    const name = text('Name', 'Arunoda Susiripala');
    return <Welcome showApp={linkTo('Button')} />;
  });

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('with text', () => (
    <Button style={{ background: 'blue' }} onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
