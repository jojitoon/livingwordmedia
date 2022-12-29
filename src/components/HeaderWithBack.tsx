import {useNavigation} from '@react-navigation/native';
import {Box, Flex, Heading, HStack, Icon, Pressable} from 'native-base';
import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import routes from '../routes/routes';

export default function HeaderWithBack({
  title,
  action,
  noPad,
}: {
  title?: string;
  action?: React.ReactNode;
  noPad?: boolean;
}) {
  const navigation = useNavigation<any>();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(routes.HOME);
    }
  };

  return (
    <Box safeAreaTop mb={noPad ? '-3' : '2'}>
      <Flex py="3" px="3" flexDir="row" alignItems="center">
        <HStack space="5" alignItems="center" flex={1}>
          <Pressable onPress={goBack} pr="2">
            <Icon
              size="6"
              as={<MaterialCommunityIcons name="chevron-left" />}
            />
          </Pressable>
          <Heading flex={1} size="sm" noOfLines={1} isTruncated>
            {title}
          </Heading>
        </HStack>
        {action && action}
      </Flex>
    </Box>
  );
}
