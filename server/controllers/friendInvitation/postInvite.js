const Users = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  const { userId, mail } = req.user;

  //   check if friend that we would like to invite is not user

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res.status(409).send("Sorry. You can't be friend with yourself");
  }

  const targetUser = await Users.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please check mail address`
      );
  }

  //check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send('Invitation has already been sent');
  }

  //   Check if the user which we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send('Friend already added. Please check friends list');
  }

  //   create new invitation in db
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  //   if invite is success, update friends invitation if other user is online

  // send pending invitations update to specific user
  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(202).send('Invitation has been sent');
};

module.exports = postInvite;
