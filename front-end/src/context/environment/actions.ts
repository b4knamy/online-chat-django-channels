import { Dispatch } from 'react';

// const environmentActions = (dispatch: environmentActionsDispatcher) => {
//   return {
//     sendNotification: (context: notifyEventContext) =>
//       dispatch({ event_type: 'notify.user', context }),
//     updateGroup: (context: GroupTyped) =>
//       dispatch({ event_type: 'room.created', context }),
//     updateOnlineUsers: (context: availableUsersEventContext) =>
//       dispatch({ event_type: 'available.users', context }),
//     removeGroup: (context: removeRoomEventContext) =>
//       dispatch({ event_type: 'remove.room', context }),
//     roomCreationFailed: (context: roomFailCreationEventContext) =>
//       dispatch({ event_type: 'room.failed', context }),
//   };
// };

const environmentActions = (dispatch: environmentActionsDispatcher) => {
  return {
    handleEvent: (payload: environmentActions) => dispatch({ ...payload }),
    setInitialGroups: (payload: GroupTyped[]) =>
      dispatch({ event_type: 'initial.groups', context: payload }),
    cleanWarning: () => dispatch({ event_type: 'cleanWarning' }),
    removeNotification: (payload: string) =>
      dispatch({ event_type: 'cleanNotification', context: payload }),
    clearMessage: (payload: string) =>
      dispatch({ event_type: 'clearMessage', context: payload }),
  };
};

type environmentActions =
  | availableUsersEvent
  | roomEvent
  | roomFailCreationEvent
  | removeRoomEvent
  | notifyEvent;
type environmentActionsDispatcher = Dispatch<webSocketData>;

export default environmentActions;

export type webSocketData =
  | availableUsersEvent
  | roomEvent
  | roomFailCreationEvent
  | removeRoomEvent
  | notifyEvent
  | initialGroups
  | cleanWarning
  | removeNotification
  | clearMessageTyped;

type removeNotification = {
  event_type: 'cleanNotification';
  context: string;
};
type clearMessageTyped = {
  event_type: 'clearMessage';
  context: string;
};
export type cleanWarning = {
  event_type: 'cleanWarning';
};

export type initialGroups = {
  event_type: 'initial.groups';
  context: GroupTyped[];
};
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
  id: number;
  user: UserTyped;
  text: string;
  created_at: string;
};

export type GroupTyped = {
  admin: UserTyped;
  id: number;
  name: string;
  room_messages: MessageTyped[];
};

export type Notification = {
  text: string;
  id: string;
  timestamp: number;
};
