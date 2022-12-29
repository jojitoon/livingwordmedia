import {Box} from 'native-base';
import * as React from 'react';
import Header from './Header';
import HeaderWithBack from './HeaderWithBack';

const BaseContainer: React.FC<{
  children: React.ReactNode;
  noPad?: boolean;
  back?: boolean;
  title?: string;
  action?: React.ReactNode;
}> = ({children, noPad, back, title, action}) => {
  return (
    <Box
      _light={{
        backgroundColor: 'white',
      }}
      _dark={{
        backgroundColor: 'gray.800',
      }}
      flex={1}>
      {back ? (
        <HeaderWithBack title={title} action={action} noPad={noPad} />
      ) : (
        <Header title={title} />
      )}
      <Box flex={1} px={noPad ? 0 : '2'} width="100%">
        {children}
      </Box>
    </Box>
  );
};

export default BaseContainer;
