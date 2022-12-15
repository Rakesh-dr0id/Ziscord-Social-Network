import io from 'socket.io-client';
import store from './../store/store';
import {
  setPendingFriendsInvitation,
  setFriends,
  setOnlineUsers,
} from '../store/actions/friendsAction';

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  socket = io('http://localhost:5002', {
    auth: {
      token: jwtToken,
    },
  });

  socket.on('connect', () => {
    console.log('Successfully connected with socket server');
    console.log(socket.id);
  });

  socket.on('friends-invitations', (data) => {
    const { pendingInvitations } = data;

    store.dispatch(setPendingFriendsInvitation(pendingInvitations));
  });

  socket.on('friends-list', (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on('online-users', (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });
};
