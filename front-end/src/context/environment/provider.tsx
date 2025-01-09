import { ReactNode, useEffect, useReducer, useRef, useState } from 'react';
import environmentReducer from './reducer';
import { environmentContext, ValueProvider, initEnvironment } from './context';
import environmentActions, { GroupTyped } from './actions';
import { webSocketData } from '../../components/home/hook';

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
      const response = await fetch('http://127.0.0.1:8000/api/rooms');

      if (response.ok) {
        const data: GroupTyped[] = await response.json();
        actions.current.setInitialGroups(data);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const websocketUrl = 'http://127.0.0.1:8000/ws/environment';

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
