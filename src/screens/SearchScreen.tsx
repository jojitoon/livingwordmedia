import {Box, Button, Input, Link, Row, Spinner, Text} from 'native-base';
import * as React from 'react';
import BaseContainer from '../components/BaseContainer';
import {AlbumProp, ScreenProps} from '../types';
import GridFlatList from 'grid-flatlist-react-native';
import AlbumCard from '../components/AlbumCard';
import {useSearchAlbums} from '../hooks/data/albums';

const SearchScreen: React.FC<ScreenProps> = () => {
  const [initialText, setInitialText] = React.useState<string>('');
  const [searchText, setSearchText] = React.useState<string>('');

  const {data, isLoading, fetchNextPage, isFetchingNextPage} =
    useSearchAlbums(searchText);

  const handleSearch = () => {
    setSearchText(initialText);
  };

  const handleOnChangeText = (text: string) => {
    setInitialText(text);
  };

  const onClear = () => {
    setInitialText('');
    setSearchText('');
  };

  const searchResult = data?.pages?.flat() || [];
  console.log(searchResult?.length);

  return (
    <BaseContainer title="Search">
      <Box>
        <Input
          colorScheme="teal"
          w="100%"
          py="0"
          onChangeText={handleOnChangeText}
          value={initialText}
          InputRightElement={
            <Button
              colorScheme="teal"
              size="md"
              rounded="none"
              w="1/5"
              h="full"
              onPress={handleSearch}>
              Search
            </Button>
          }
          placeholder="Search teachings, songs"
        />
        {searchText && (
          <Row alignItems="baseline" justifyContent="space-between">
            <Text>{searchResult?.length} Result </Text>
            <Link my="2px" textAlign="left" onPress={onClear}>
              Clear Search
            </Link>
          </Row>
        )}
      </Box>
      <Box py="20px">
        {isLoading && <Spinner size="lg" color="tertiary.500" />}
        <GridFlatList
          data={searchResult}
          gap={10}
          paddingHorizontal={10}
          renderItem={(item: AlbumProp) => <AlbumCard {...item} />}
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

export default SearchScreen;
