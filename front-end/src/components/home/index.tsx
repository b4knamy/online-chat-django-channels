import Room from '../room/room';
import Details from '../details/details';
import Groups from '../groups/groups';
import { Content, HomeContainer } from './index.style';
import { memo, useEffect, useState } from 'react';
import User from '../user/user';
import Warning from '../groups/warning/warning';
import useEnvironmentContext from '../../context/environment/context';
import Notifications from '../notifications/notifications';
import { GroupTyped } from '../../context/environment/actions';

export default function Home() {
  const { state, environmentSocket, cleanWarning, removeNotification } =
    useEnvironmentContext();
  const [currentUser, setCurrentUser] = useState('');
  return (
    <HomeContainer>
      {state.notifications.length > 0 && (
        <Notifications
          notifications={state.notifications}
          removeNotification={removeNotification}
        />
      )}
      {state.warning && (
        <Warning warning={state.warning} cleanWarning={cleanWarning} />
      )}
      {currentUser ? (
        <>
          <Details
            onlineUsers={state.onlineUsers}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            environmentSocket={environmentSocket}
          />
          <HomeContent
            groups={state.groups}
            environmentSocket={environmentSocket}
            currentUser={currentUser}
          />
        </>
      ) : (
        <User
          setCurrentUser={setCurrentUser}
          availableUsers={state.availableUsers}
          environmentSocket={environmentSocket}
        />
      )}
    </HomeContainer>
  );
}

type props = {
  groups: GroupTyped[];
  environmentSocket: WebSocket;
  currentUser: string;
};

const HomeContent = memo(
  ({ groups, environmentSocket, currentUser }: props) => {
    const [currentRoom, setCurrentRoom] = useState('');

    useEffect(() => {
      const isRemoved = groups.filter((group) => group.name == currentRoom).length === 0

      if (isRemoved) {
        setCurrentRoom("")
      }
      /* eslint-disable-next-line */
    }, [groups.length])
    return (
      <Content>
        <Groups
          setCurrentRoom={setCurrentRoom}
          currentRoom={currentRoom}
          groups={groups}
          currentUser={currentUser}
          environmentSocket={environmentSocket}
        />
        {currentRoom ? (
          groups.map((group) => {
            if (group.name === currentRoom) {
              return (
                <Room
                  key={group.id}
                  name={currentRoom}
                  environmentSocket={environmentSocket}
                  roomOwner={group.admin.username}
                  currentUser={currentUser}
                  setCurrentRoom={setCurrentRoom}
                />
              );
            }
          })
        ) : (
          <WelcomeRoom />
        )}
      </Content>
    );
  },
);

const WelcomeRoom = () => {
  return (
    <div className="welcome-room">
      <span>
        Bem vindo! <br /> <br />
        Escolha uma sala para começar a conversar!
      </span>
    </div>
  );
};
