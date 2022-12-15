const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // remove invitation from friend invitations collection
    const invitationExists = await FriendInvitation.exists({ _id: id });

    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    // Update pending invitations
    friendsUpdates.updateFriendsPendingInvitations(userId);

    return res.status(200).send('invitation successfully rejected');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Something went wrong. Please try again');
  }
};

module.exports = postReject;
