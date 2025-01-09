import { Dispatch, SetStateAction } from 'react';
import { Container } from './group.style';

type props = {
  name: string;
  setCurrentRoom: Dispatch<SetStateAction<string>>;
  currentRoom: string;
  isRoomOwner: boolean;
};
export default function Group({
  name,
  setCurrentRoom,
  currentRoom,
  isRoomOwner,
}: props) {
  return (
    <Container
      onClick={() => setCurrentRoom(name)}
      $isCurrentRoom={currentRoom === name}
    >
      {isRoomOwner && <i className="fa-solid fa-crown top-close"></i>}
      <span>{name}</span>
    </Container>
  );
}
