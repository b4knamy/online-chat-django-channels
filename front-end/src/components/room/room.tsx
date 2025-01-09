import { Container } from './room.style';
import Form from './form/form';
import Chat from './chat/chat';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MessageTyped } from '../home/hook';
import ChatDetails from './details/details';
import OnlineUsers from './online/online';

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
  setCurrentRoom,
}: props) {
  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageTyped[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const webSocketUrl = `ws://127.0.0.1:8000/ws/chat/${name}/?username=${currentUser}`;

    const chatSocket = new WebSocket(webSocketUrl);

    chatSocket.onmessage = (event) => {
      const event_data: roomSocketEvent = JSON.parse(event.data);

      // console.log(event_data);
      if (event_data.type === 'chat.message') {
        setMessages((prev) => {
          const currentDate = new Date();
          const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
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

    chatSocket.onclose = () => setCurrentRoom('');

    setChatSocket(chatSocket);
    /* eslint-disable-next-line */
  }, [name]);
  console.log(users);
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
