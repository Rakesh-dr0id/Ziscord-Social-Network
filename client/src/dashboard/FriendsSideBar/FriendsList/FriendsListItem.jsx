import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '../../../shared/components/Avatar';
import { Typography } from '@mui/material';
import OnlineIndicator from './OnlineIndicator';
import { connect } from 'react-redux';
import { chatTypes, getActions } from '../../../store/actions/chatActions';

const FriendsListItem = ({ id, username, isOnline, setChosenChatDetails }) => {
  const handleChooseActiveConversation = () => {
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
  };

  return (
    <Button
      onClick={handleChooseActiveConversation}
      style={{
        width: '100%',
        height: '42px',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'black',
        position: 'relative',
      }}
    >
      <Avatar username={username} />
      <Typography
        style={{
          marginLeft: '7px',
          fontWeight: 700,
          color: '#8e9297',
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(FriendsListItem);
