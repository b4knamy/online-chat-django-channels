import { useState } from 'react';
import { Container } from './details.style';

type props = {
  roomOwner: string;
  environmentSocket: WebSocket | null;
  name: string;
  isRoomOwner: boolean;
};

export default function ChatDetails({
  roomOwner,
  environmentSocket,
  name,
  isRoomOwner,
}: props) {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <Container>
      <span>Sala criada por {roomOwner}</span>
      {isRoomOwner && (
        <>
          <div
            className="room-settings"
            onClick={() => setShowSettings(!showSettings)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>

          <div
            className="r-s-options"
            style={{ maxHeight: showSettings ? '50px' : '0px' }}
          >
            <span
              onClick={() => {
                const context = {
                  type: 'remove.room',
                  data: {
                    room: name,
                  },
                };
                environmentSocket?.send(JSON.stringify(context));
              }}
            >
              Excluir sala
            </span>
          </div>
        </>
      )}
    </Container>
  );
}
