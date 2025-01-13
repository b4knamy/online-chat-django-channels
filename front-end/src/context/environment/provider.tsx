import { ReactNode, useEffect, useReducer, useRef, useState } from 'react';
import environmentReducer from './reducer';
import { environmentContext, ValueProvider, initEnvironment } from './context';
import environmentActions from './actions';

export default function EnvironmentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(environmentReducer, initEnvironment);

  const [environmentSocket, setEnvironmentSocket] = useState<WebSocket | null>(
    null,
  );

  const actions = useRef(environmentActions(dispatch));

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch('http://0.0.0.0:8000/api/rooms');

      if (response.ok) {
        const data: GroupTyped[] = await response.json();
        actions.current.setInitialGroups(data);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const websocketUrl = 'http://0.0.0.0:8000/ws/environment';

    const environmentWebSocket = new WebSocket(websocketUrl);

    environmentWebSocket.onmessage = (event) => {
      const event_data: webSocketData = JSON.parse(event.data);
      // console.log(event_data);
      return actions.current.handleEvent(event_data);
    };
    environmentWebSocket.onclose = () => {};

    setEnvironmentSocket(environmentWebSocket);

    return () => environmentWebSocket.close();
  }, []);

  if (!environmentSocket) {
    return <h1>loading...</h1>;
  }

  const valueProvider: ValueProvider = {
    state,
    environmentSocket,
    cleanWarning: actions.current.cleanWarning,
    removeNotification: actions.current.removeNotification,
    clearMessage: actions.current.clearMessage,
  };

  return (
    <environmentContext.Provider value={valueProvider}>
      {children}
    </environmentContext.Provider>
  );
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
