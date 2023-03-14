import {Box, Spinner} from 'native-base';
import React from 'react';
import BaseContainer from '../components/BaseContainer';
import {useAllSongs} from '../hooks/data/albums';
import {AlbumProp, ScreenProps} from '../types';
import GridFlatList from 'grid-flatlist-react-native';
import AlbumCard from '../components/AlbumCard';

const SongsScreen: React.FC<ScreenProps> = () => {
  const {data, isLoading, isFetchingNextPage, fetchNextPage} = useAllSongs();
  const songs = data?.pages?.flat() || [];
  console.log(songs);

  return (
    <BaseContainer back title="Songs">
      <Box py="20px">
        {isLoading && <Spinner size="lg" color="tertiary.500" />}
        <GridFlatList
          data={songs}
          gap={10}
          paddingHorizontal={10}
          renderItem={(item: AlbumProp) => (
            <AlbumCard
              {...item}
              defaultImage="https://www.livingwordmedia.org/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-28-at-4.26.37-PM-540x541.jpeg"
            />
          )}
          ListFooterComponent={
            <Box h="150px">
              {isFetchingNextPage && <Spinner size="sm" color="tertiary.500" />}
            </Box>
          }
          onEndReachedThreshold={0.2}
          onEndReached={() => fetchNextPage()}
          accessibilityComponentType={undefined}
          accessibilityTraits={undefined}
        />
      </Box>
    </BaseContainer>
  );
};

export default SongsScreen;
