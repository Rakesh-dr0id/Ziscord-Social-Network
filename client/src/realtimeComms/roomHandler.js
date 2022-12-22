import store from './../store/store';
import { setOpenRoom, setRoomDetails } from '../store/actions/roomActions';
import * as socketConnection from './SocketConnection';

export const createNewRoom = () => {
  store.dispatch(setOpenRoom(true, true));
  socketConnection.createNewRoom();
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;

  store.dispatch(setRoomDetails(roomDetails));
};
