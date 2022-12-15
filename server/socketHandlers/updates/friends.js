const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');
const user = require('../../models/user');

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');

    // find all active connections of specific userId
    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const updateFriends = async (userId) => {
  try {
    // Find active connections of specific id(online users)
    const receiverList = serverStore.getActiveConnections(userId);

    if (receiverList.length > 0) {
      const users = await user
        .findById(userId, { _id: 1, friends: 1 })
        .populate('friends', '_id username mail');

      if (users) {
        const friendsList = users.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          };
        });

        // get io server instance
        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
