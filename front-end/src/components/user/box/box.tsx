import { Container } from './box.style';

type props = {
  username: string;
};

export default function AvailableUser({ username }: props) {
  return (
    <Container>
      <img src={`http://0.0.0.0:8000/static/${username}.jpg`} alt="user image" />
      <span>{username}</span>
    </Container>
  );
}
