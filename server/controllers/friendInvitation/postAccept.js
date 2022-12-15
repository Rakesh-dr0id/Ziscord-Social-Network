const FriendInvitation = require('../../models/friendInvitation');
const user = require('../../models/user');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;

    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send('Error occurred. Please try again');
    }

    const { senderId, receiverId } = invitation;

    // add friends to both users
    const senderUser = await user.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await user.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    //Delete invitation
    await FriendInvitation.findByIdAndDelete(id);

    // Update list of the friends if the user are online
    friendsUpdates.updateFriends(senderId.toString());
    friendsUpdates.updateFriends(receiverId.toString());

    // Update list of friends pending-invitations
    friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

    return res.status(200).send('Friend successfully added');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong...Try again');
  }
};

module.exports = postAccept;
