import { createContext, useContext } from 'react';
import { GroupTyped } from './../../components/home/hook';
import { Notification } from './actions';

export type initEnvironmentState = {
  groups: GroupTyped[];
  notifications: Notification[];
  availableUsers: string[];
  warning: string;
  onlineUsers: number;
};

export const initEnvironment: initEnvironmentState = {
  groups: [],
  notifications: [],
  availableUsers: [],
  warning: '',
  onlineUsers: 1,
};

export type ValueProvider = {
  state: initEnvironmentState;
  environmentSocket: WebSocket;
  cleanWarning: () => void;
  removeNotification: (payload: string) => void;
  clearMessage: (payload: string) => void;
};

export const environmentContext = createContext<ValueProvider | null>(null);

const useEnvironmentContext = () => {
  const context = useContext(environmentContext);

  if (!context) {
    throw new Error(
      'useEnvironmentContext must be used inside EnvironmentContextProvider.',
    );
  }

  return context;
};

export default useEnvironmentContext;
