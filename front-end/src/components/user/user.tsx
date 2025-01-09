import { Dispatch, SetStateAction } from 'react';
import AvailableUser from './box/box';
import { Container } from './user.style';

type props = {
  setCurrentUser: Dispatch<SetStateAction<string>>;
  availableUsers: string[];
  environmentSocket: WebSocket | null;
};

export default function User({
  availableUsers,
  environmentSocket,
  setCurrentUser,
}: props) {
  const loginUser = async (username: string) => {
    const context = JSON.stringify({
      type: 'login.user',
      data: {
        username: username,
      },
    });
    environmentSocket?.send(context);
    setCurrentUser(username);
    console.log(username);
  };

  return (
    <Container>
      {availableUsers.map((username) => {
        return (
          <div key={username} onClick={() => loginUser(username)}>
            <AvailableUser username={username} />
          </div>
        );
      })}
    </Container>
  );
}
