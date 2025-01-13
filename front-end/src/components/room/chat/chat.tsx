import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ChatBox from './box/box';
import { Container } from './chat.style';
import { MessageTyped } from '../../../context/environment/actions';

type props = {
  messages: MessageTyped[];
  currentUser: string;
  setMessages: Dispatch<SetStateAction<MessageTyped[]>>;
};

export default function Chat({ messages, currentUser, setMessages }: props) {
  const [recentMessages, setRecentMessages] = useState<MessageTyped[]>([]);
  const [storedMessages, setStoredMessages] = useState<JSX.Element[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newStoredMessages = recentMessages.map((message, idx) => {
      return (
        <ChatBox
          key={recentMessages.length + idx}
          isCurrentUser={message.user.username === currentUser}
          text={message.text}
          username={message.user.username}
          created_at={message.created_at}
        />
      );
    });
    setStoredMessages(newStoredMessages);

    /* eslint-disable-next-line */
  }, [recentMessages]);

  useEffect(() => {
    if (messages.length > 50) {
      setRecentMessages((prev) => {
        const updatedRecentMessages = [...prev, ...messages];
        return updatedRecentMessages;
      });
      setMessages([]);
    }
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    } /* eslint-disable-next-line */
  }, [messages.length]);

  return (
    <Container ref={containerRef}>
      {storedMessages}
      {messages.map((message, idx) => {
        return (
          <ChatBox
            key={recentMessages.length + idx}
            isCurrentUser={message.user.username === currentUser}
            text={message.text}
            username={message.user.username}
            created_at={message.created_at}
          />
        );
      })}
    </Container>
  );
}
