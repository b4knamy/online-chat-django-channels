import { Container } from './box.style';

type props = {
  username: string;
};

export default function AvailableUser({ username }: props) {
  return (
    <Container>
      <span>{username}</span>
    </Container>
  );
}
