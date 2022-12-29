import {Box, Flex, Heading} from 'native-base';
import * as React from 'react';

export default function Header({title = ''}) {
  return (
    <Box safeAreaTop>
      <Flex
        flexDir="row"
        py="3"
        px="3"
        alignItems="center"
        justifyContent="space-between">
        <Heading>{title}</Heading>
      </Flex>
    </Box>
  );
}
