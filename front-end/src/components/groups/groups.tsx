import { Dispatch, SetStateAction } from 'react';
import Group from './group/group';
import { Container } from './groups.style';
import CreateGroup from './create/create';
import { GroupTyped } from '../home/hook';

type props = {
  setCurrentRoom: Dispatch<SetStateAction<string>>;
  currentRoom: string;
  groups: GroupTyped[];
  environmentSocket: WebSocket;
  currentUser: string;
};

export default function Groups({
  setCurrentRoom,
  currentRoom,
  groups,
  environmentSocket,
  currentUser,
}: props) {
  return (
    <Container>
      <div className="groups">
        {groups.map((group) => {
          return (
            <Group
              key={group.id}
              name={group.name}
              isRoomOwner={group.admin.username === currentUser}
              setCurrentRoom={setCurrentRoom}
              currentRoom={currentRoom}
            />
          );
        })}
      </div>

      <div className="create-groups">
        <CreateGroup environmentSocket={environmentSocket} />
      </div>
    </Container>
  );
}
