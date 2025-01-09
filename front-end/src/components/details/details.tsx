import { Dispatch, SetStateAction } from 'react';
import { Container } from './details.style';

type props = {
  onlineUsers: number;
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>>;
  environmentSocket: WebSocket | null;
};

export default function Details({
  onlineUsers,
  currentUser,
  setCurrentUser,
  environmentSocket,
}: props) {
  const logoutUser = async () => {
    const context = {
      type: 'logout.user',
    };
    environmentSocket?.send(JSON.stringify(context));
    setCurrentUser('');
  };

  return (
    <Container>
      <div className="available-users">
        <span>Online {onlineUsers}</span> <div className="green-circle"></div>
      </div>
      <div className="current-user">
        <span>
          you are logged as <strong>{currentUser}</strong>.
        </span>
        <div className="icon-logout" onClick={() => logoutUser()}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Sair?</span>
        </div>
      </div>
    </Container>
  );
}
