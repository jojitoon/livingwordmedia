import {Box, Center, Flex, Pressable, Spinner, Text} from 'native-base';
import * as React from 'react';
import AlbumCard from '../components/AlbumCard';
import BaseContainer from '../components/BaseContainer';
import {useAlbums} from '../hooks/data/albums';
import {AlbumProp, ScreenProps} from '../types';
import {getGreetings} from '../utils/common';
import GridFlatList from 'grid-flatlist-react-native';
import FastImage from 'react-native-fast-image';
import routes from '../routes/routes';

const BoxLink = ({
  title = 'Songs',
  imageUrl = 'https://www.livingwordmedia.org/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-28-at-4.26.37-PM-540x541.jpeg',
  onPress = () => {},
}) => (
  <Pressable flex="1" onPress={onPress}>
    <Flex
      flex="1"
      h="50px"
      flexDir="row"
      alignItems="center"
      mx="5px"
      my="5px"
      borderRadius="md"
      overflow="hidden"
      _light={{
        backgroundColor: 'gray.100',
      }}
      _dark={{
        backgroundColor: 'gray.900',
      }}>
      <Box h="50px" w="50px" bg="gray.500" mr="5px">
        <FastImage
          source={{
            uri: imageUrl,
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%', height: '100%'}}
        />
      </Box>
      <Text flex="1" fontWeight="bold" fontSize="xs">
        {title}
      </Text>
    </Flex>
  </Pressable>
);

const HomeScreen: React.FC<ScreenProps> = ({navigation}) => {
  const {data, isLoading} = useAlbums();

  return (
    <BaseContainer title={getGreetings()}>
      {isLoading ? (
        <Center flex="1">
          <Spinner size="sm" color="tertiary.500" />
        </Center>
      ) : (
        <GridFlatList
          data={data || []}
          gap={10}
          paddingHorizontal={10}
          renderItem={(item: AlbumProp) => <AlbumCard {...item} />}
          ListFooterComponent={isLoading ? null : <Box h="100px" />}
          accessibilityComponentType={undefined}
          accessibilityTraits={undefined}
          ListHeaderComponent={
            <Box mx="5px" mb="10px">
              <Flex flexDir="row">
                <BoxLink
                  title="Liked Songs"
                  imageUrl="https://images.unsplash.com/photo-1571172964533-d2d13d88ce7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80"
                />
                <BoxLink
                  onPress={() => {
                    navigation.navigate(routes.SONGS);
                  }}
                />
              </Flex>
              <Flex flexDir="row">
                <BoxLink
                  title="Playlists"
                  imageUrl="https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                />
                <BoxLink
                  title="Study"
                  imageUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2146&q=80"
                  onPress={() => {
                    navigation.navigate(routes.SONGS);
                  }}
                />
              </Flex>
            </Box>
          }
        />
      )}
    </BaseContainer>
  );
};

export default HomeScreen;
