import {Box} from 'native-base';
import * as React from 'react';
import BaseContainer from '../components/BaseContainer';
import {ScreenProps} from '../types';

const MeScreen: React.FC<ScreenProps> = () => {
  return (
    <BaseContainer title="Your Profile">
      <Box>profile</Box>
    </BaseContainer>
  );
};

export default MeScreen;
