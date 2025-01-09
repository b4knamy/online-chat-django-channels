import { Notification, webSocketData } from './actions';
import { initEnvironmentState } from './context';

const environmentReducer = (
  state: initEnvironmentState,
  actions: webSocketData,
): initEnvironmentState => {
  switch (actions.event_type) {
    case 'notify.user': {
      const date = Date.now();
      const notificationObj: Notification = {
        text: actions.context.message,
        id: date.toString(),
        timestamp: date,
      };
      state.notifications.push(notificationObj);
      return { ...state };
    }
    case 'cleanNotification': {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== actions.context,
      );
      return { ...state };
    }
    case 'clearMessage': {
      state.groups = state.groups.map((group) => {
        if (group.name === actions.context) {
          return { ...group };
        }
        return group;
      });
      return { ...state, groups: [...state.groups] };
    }
    case 'available.users': {
      state.onlineUsers = actions.context.online_users;
      state.availableUsers = actions.context.available_users;
      return { ...state };
    }

    case 'room.created': {
      state.groups.push(actions.context);
      state.groups = [...state.groups];
      return { ...state };
    }

    case 'remove.room': {
      const updatedGroups = state.groups.filter(
        (group) => group.name !== actions.context.room,
      );
      state.groups = updatedGroups;
      return { ...state };
    }

    case 'room.failed': {
      state.warning = actions.context.message;
      return { ...state };
    }
    case 'initial.groups': {
      state.groups = actions.context;
      return { ...state };
    }
    case 'cleanWarning': {
      state.warning = '';
      return { ...state };
    }
  }
};

export default environmentReducer;
