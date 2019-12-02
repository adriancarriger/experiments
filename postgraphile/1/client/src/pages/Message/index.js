import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ChatFeed } from 'react-bell-chat';
import { useParams } from 'react-router-dom';

import { GET_THREAD } from './message.graphql';

export function Message() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_THREAD, {
    variables: { id }
  });

  if (loading) {
    return <div>loading…</div>;
  }

  if (error) {
    return <div>error => {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <ChatFeed
        messages={mapGraphqlMessagesToChat(data.thread)}
        chatBubbleStyles={{
          text: { whiteSpace: 'inherit', color: 'black' },
          chatBubble: {
            maxWidth: '50%',
            backgroundColor: 'rgb(217, 239, 255)'
          },
          recipientChatBubble: { backgroundColor: 'rgb(236, 236, 236)' }
        }}
        authors={[
          {
            id: 1,
            name: 'Mark',
            isTyping: false,
            lastSeenMessageId: 1,
            bgImageUrl: undefined
          },
          {
            id: 2,
            name: 'Peter',
            isTyping: false,
            lastSeenMessageId: 2,
            bgImageUrl: undefined
          }
        ]}
        yourAuthorId={2}
        hasOldMessages={true}
        loadOldMessagesThreshold={200}
        maxHeight={650}
        onLoadOldMessages={() => {
          console.log('loading…');
          return new Promise(r => setTimeout(r, 1000));
        }}
        showLoadingMessages={false}
      />
    </div>
  );
}

function mapGraphqlMessagesToChat(thread) {
  return thread.messages.edges.map(({ node: message }) => ({
    id: message.id,
    authorId: message.toNumber === thread.id ? 2 : 1,
    message: message.body,
    createdOn: new Date(message.dateSent),
    isSend: true
  }));
}
