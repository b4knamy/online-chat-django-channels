import { Container } from './room.style';
import Form from './form/form';
import Chat from './chat/chat';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ChatDetails from './details/details';
import OnlineUsers from './online/online';
import { MessageTyped } from '../../context/environment/actions';

type props = {
  name: string;
  currentUser: string;
  roomOwner: string;
  environmentSocket: WebSocket | null;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
};

type chatMessageEvent = {
  type: 'chat.message';
  context: {
    message: MessageTyped;
  };
};

type updateUsersEvent = {
  type: 'show.users';
  context: string[];
};

type roomSocketEvent = updateUsersEvent | chatMessageEvent;

export default function Room({
  name,
  currentUser,
  roomOwner,
  environmentSocket,
}: props) {
  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageTyped[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const webSocketUrl = `ws://0.0.0.0:8000/ws/chat/${name}/?username=${currentUser}`;

    const chatSocketConnection = new WebSocket(webSocketUrl);

    chatSocketConnection.onmessage = (event) => {
      const event_data: roomSocketEvent = JSON.parse(event.data);
      if (event_data.type === 'chat.message') {
        setMessages((prev) => {
          const currentDate = new Date();
          const currentTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
          const newMessage: MessageTyped = {
            ...event_data.context.message,
            created_at: currentTime,
          };
          const updatedMessages = [...prev];
          updatedMessages.push(newMessage);
          return updatedMessages;
        });
      } else {
        setUsers(event_data.context);
      }
    };

    setChatSocket(chatSocketConnection);
    
    return () => chatSocketConnection.close()
    /* eslint-disable-next-line */
  }, [name]);
  return (
    <Container>
      <OnlineUsers users={users} />
      <ChatDetails
        roomOwner={roomOwner}
        environmentSocket={environmentSocket}
        name={name}
        isRoomOwner={roomOwner === currentUser}
      />
      <Chat
        messages={messages}
        currentUser={currentUser}
        setMessages={setMessages}
      />
      <Form chatSocket={chatSocket} room={name} />
    </Container>
  );
}
