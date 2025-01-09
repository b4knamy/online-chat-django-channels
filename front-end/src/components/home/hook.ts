import { useEffect, useState } from 'react';

export default function useHomeHook() {
  const [groups, setGroups] = useState<GroupTyped[]>([]);
  const [environmentSocket, setEnvironmentSocket] = useState<WebSocket | null>(
    null,
  );
  const [currentUser, setCurrentUser] = useState<string>('');
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [warning, setWarning] = useState<string>('');
  const [notifications, setNotifications] = useState([]);

  const [availableUsers, setAvailableUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/rooms');

      if (response.ok) {
        const data: GroupTyped[] = await response.json();
        setGroups(data);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const websocketUrl = 'http://127.0.0.1:8000/ws/environment';

    const environmentWebSocket = new WebSocket(websocketUrl);

    environmentWebSocket.onmessage = (event) => {
      const event_data: webSocketData = JSON.parse(event.data);
      console.log(event_data);
      switch (event_data.event_type) {
        case 'room.created':
          setGroups((prev) => {
            const updatedGroups = [...prev];
            console.log(event_data.context);
            updatedGroups.push(event_data.context);
            return updatedGroups;
          });
          break;

        case 'available.users':
          setAvailableUsers(event_data.context.available_users);
          setOnlineUsers(event_data.context.online_users);
          break;
        case 'room.failed':
          console.log(event_data.context);
          setWarning(event_data.context.message);
          break;

        case 'remove.room':
          setGroups((prev) => {
            const updatedGroups = prev.filter(
              (group) => group.name !== event_data.context.room,
            );
            return updatedGroups;
          });
          break;
        case 'notify.user':
          console.log(event_data);
      }
    };
    environmentWebSocket.onclose = () => {
      console.log('room socket is closed.');
    };

    setEnvironmentSocket(environmentWebSocket);

    return () => environmentWebSocket.close();
  }, []);

  return {
    groups,
    environmentSocket,
    availableUsers,
    currentUser,
    setCurrentUser,
    onlineUsers,
    setWarning,
    warning,
    notifications,
    setNotifications,
  };
}

export type webSocketData =
  | availableUsersEvent
  | roomEvent
  | roomFailCreationEvent
  | removeRoomEvent
  | notifyEvent;

export type availableUsersEvent = {
  event_type: 'available.users';
  context: {
    available_users: string[];
    online_users: number;
  };
};

export type roomEvent = {
  event_type: 'room.created';
  context: GroupTyped;
};

export type roomFailCreationEvent = {
  event_type: 'room.failed';
  context: {
    message: string;
  };
};

export type removeRoomEvent = {
  event_type: 'remove.room';
  context: {
    room: string;
  };
};

export type notifyEvent = {
  event_type: 'notify.user';
  context: {
    message: string;
  };
};

export type UserTyped = {
  has_room: boolean;
  id: number;
  username: string;
};

export type MessageTyped = {
  user: UserTyped;
  text: string;
  created_at: string;
};

export type GroupTyped = {
  admin: UserTyped;
  id: number;
  name: string;
};
