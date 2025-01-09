import { useState } from 'react';
import { Container } from './box.style';

type props = {
  isCurrentUser: boolean;
  text: string;
  username: string;
  created_at: string;
};

export default function ChatBox({
  isCurrentUser,
  text,
  username,
  created_at,
}: props) {
  const [showMore, setShowMore] = useState(false);

  const isHigher = text.length > 220;

  return (
    <Container $isCurrentUser={isCurrentUser}>
      <div className="chat-container">
        <div className="chat-profile">
          <img src={`http://127.0.0.1:8000/static/${username}.jpg`} alt="" />
        </div>
        <div className="chat-text">
          <div className="chat-details">
            <span>~ {username}</span>
            <p>- {created_at}</p>
          </div>
          <div className="chat-content">
            <p>
              {isHigher ? (showMore ? text : text.slice(0, 220)) : text}
              {isHigher && (
                <span
                  onClick={() => setShowMore(!showMore)}
                  className="show-more"
                >
                  ...
                  {showMore ? 'mostrar menos' : 'mostrar mais'}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
