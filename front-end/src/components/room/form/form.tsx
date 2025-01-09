import { useState } from 'react';
import { Container } from './form.style';
import { UserTyped } from '../../home/hook';

export type messageBody = {
  room: string;
  user?: UserTyped;
  text: string;
};

type props = {
  chatSocket: WebSocket | null;
  room: string;
};

export default function Form({ chatSocket, room }: props) {
  const [value, setValue] = useState('');
  return (
    <Container>
      <input
        type="text"
        placeholder="send a text message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();

          if (chatSocket && value.length > 0) {
            const messageBody: messageBody = {
              text: value,
              room: room,
            };
            const message = JSON.stringify(messageBody);
            chatSocket.send(message);
            setValue('');
          }
        }}
      >
        Enviar
      </button>
    </Container>
  );
}
