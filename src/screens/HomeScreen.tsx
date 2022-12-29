import {Box, Spinner} from 'native-base';
import * as React from 'react';
import AlbumCard from '../components/AlbumCard';
import BaseContainer from '../components/BaseContainer';
import {useAlbums} from '../hooks/data/albums';
import {AlbumProp, ScreenProps} from '../types';
import {getGreetings} from '../utils/common';
import GridFlatList from 'grid-flatlist-react-native';

const BoxLink = () => <Box></Box>;
const HomeScreen: React.FC<ScreenProps> = () => {
  const {data, isLoading} = useAlbums();

  return (
    <BaseContainer title={getGreetings()}>
      {isLoading && <Spinner size="sm" color="tertiary.500" />}
      <GridFlatList
        data={data || []}
        gap={10}
        paddingHorizontal={10}
        renderItem={(item: AlbumProp) => <AlbumCard {...item} />}
        ListFooterComponent={<Box h="100px" />}
        accessibilityComponentType={undefined}
        accessibilityTraits={undefined}
        ListHeaderComponent={<Box></Box>}
      />
    </BaseContainer>
  );
};

export default HomeScreen;
