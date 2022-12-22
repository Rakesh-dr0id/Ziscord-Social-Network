import React from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import CloseFullscreenIcons from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const MainContainer = styled('div')({
  position: 'absolute',
  bottom: '10px',
  right: '10px',
});

const ResizeRoomButton = ({ isRoomMinimized, handleRoomResize }) => {
  return (
    <MainContainer>
      <IconButton style={{ color: 'white' }} onClick={handleRoomResize}>
        {isRoomMinimized ? <OpenInFullIcon /> : <CloseFullscreenIcons />}
      </IconButton>
    </MainContainer>
  );
};

export default ResizeRoomButton;
