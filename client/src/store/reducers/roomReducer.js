import { roomActions } from './../actions/roomActions';
import { userDetails } from './../../realtimeComms/SocketConnection';

const initState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharing: null,
  isScreenSharingActive: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case roomActions.OPEN_ROOM:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case roomActions.SET_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: action.userDetails,
      };

    default:
      return state;
  }
};

export default reducer;
