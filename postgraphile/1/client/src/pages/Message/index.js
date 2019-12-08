import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ChatFeed } from 'react-bell-chat';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { GET_THREAD } from './message.graphql';
import { MessageInput } from './message-input';

const useStyles = makeStyles(theme => ({
  chatContainer: {
    padding: '0 1.5em'
  }
}));

export function Message() {
  const { id } = useParams();
  const classes = useStyles({});

  const { loading, error, data } = useQuery(GET_THREAD, {
    variables: { id: Number(id) }
  });

  if (loading) {
    return <div>loading…</div>;
  }

  if (error) {
    return <div>error => {JSON.stringify(error)}</div>;
  }

  return (
    <div className={classes.chatContainer}>
      <ChatFeed
        messages={mapGraphqlMessagesToChat(data.thread)}
        chatBubbleStyles={{
          text: { whiteSpace: 'inherit', color: 'black' },
          chatBubble: {
            maxWidth: '60%',
            backgroundColor: '#5cc4ff',
            borderRadius: '15px'
          },
          recipientChatBubble: {
            backgroundColor: 'rgb(236, 236, 236)',
            borderRadius: '15px'
          }
        }}
        authors={[
          { id: 1, name: 'Other' },
          { id: 2, name: 'Me' }
        ]}
        yourAuthorId={2}
        maxHeight={'calc(100vh - 12em)'}
      />
      <MessageInput
        onMessage={message => console.log('mutation here', message)}
      />
    </div>
  );
}

function mapGraphqlMessagesToChat(thread) {
  return thread.messages.edges.reduce(
    (previous, { node: message }) => [
      {
        id: message.id,
        authorId: message.direction === 'INBOUND' ? 1 : 2,
        message: message.body,
        createdOn: new Date(message.dateSent),
        isSend: true
      },
      ...previous
    ],
    []
  );
}
