import { useEffect, useState } from 'react';
import { Container, NoticationContainer } from './notifications.style';
import { Notification as NotifictionTyped } from '../../context/environment/actions';

type props = {
  notifications: NotifictionTyped[];
  removeNotification: (payload: string) => void;
};

export default function Notifications({
  notifications,
  removeNotification,
}: props) {
  return (
    <Container
      $height={
        notifications.length > 0 ? `${notifications.length * 130}px` : '100px'
      }
    >
      {notifications.map((text, index) => {
        return (
          <Notification
            index={index}
            key={text.timestamp}
            message={text}
            removeNotification={removeNotification}
          />
        );
      })}
    </Container>
  );
}

type notificationProps = {
  message: NotifictionTyped;
  removeNotification: (payload: string) => void;
  index: number;
};
const Notification = ({
  message,
  removeNotification,
  index,
}: notificationProps) => {
  const [leave, setLeave] = useState(false);

  const { text, id, timestamp } = message;

  useEffect(() => {
    if (leave) {
      const timeout = setTimeout(() => {
        removeNotification(id);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [leave, id, timestamp, removeNotification]);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - timestamp;
    const remainingTime = Math.max(6000 - elapsed, 0);

    const timeout = setTimeout(() => {
      setLeave(true);
    }, remainingTime);

    return () => clearTimeout(timeout);
  }, [id, timestamp, removeNotification]);

  return (
    <NoticationContainer
      key={id}
      className="notification-container"
      $leave={leave}
      $index={index}
    >
      <i className="fa-solid fa-xmark" onClick={() => setLeave(true)}></i>
      <span>{text}</span>
    </NoticationContainer>
  );
};
