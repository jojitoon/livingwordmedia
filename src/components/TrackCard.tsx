import * as React from 'react';
import {Row, Icon, Pressable, Text, Box} from 'native-base';
import {AlbumProp, SongProp} from '../types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import he from 'he';

interface Props extends SongProp {
  album: AlbumProp;
  onPress?: () => void;
}
const TrackCard = (props: Props) => {
  return (
    <Pressable onPress={props?.onPress} w="100%">
      <Row py="20px" alignItems="center" justifyContent="space-between">
        <Box flex={1}>
          <Text fontSize="md" isTruncated>
            {he.decode(props.title)}
          </Text>
          <Text fontSize="10px" opacity="0.6" isTruncated maxW="70%">
            {he.decode(props.album.songTitle)}
          </Text>
        </Box>
        <Icon as={Ionicons} name="ellipsis-horizontal" size="lg" ml="4" />
      </Row>
    </Pressable>
  );
};

export default TrackCard;
