import styled from 'styled-components';

type props = {
  users: string[];
};

export default function OnlineUsers({ users }: props) {
  return (
    <Container>
      <div className="o-u-container">
        <span>Online nesta sala</span>
      </div>
      {users.map((users) => (
        <div key={users} className="o-u-container">
          <i className="fa-solid fa-user"></i> <span>{users}</span>
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 150px;
  height: 700px;
  position: absolute;
  right: -150px;
  top: -50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;

  .o-u-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 10px;
    gap: 5px;
  }
`;
