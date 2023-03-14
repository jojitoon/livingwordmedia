import * as React from 'react';
import {Box, Pressable, Row, Text} from 'native-base';
import {AlbumProp} from '../types';
import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import routes from '../routes/routes';
import he from 'he';

interface AlbumCardProps extends AlbumProp {
  defaultImage?: string;
}

const AlbumCard = (props: AlbumCardProps) => {
  const navigation = useNavigation<any>();
  const width = Dimensions.get('window').width;
  const boxWidth = width / 2;
  const innerBoxSize = boxWidth - 20;
  const imageStyle = {width: '105%', height: '105%'};
  const gotToAlbumTracks = () => {
    navigation.navigate(routes.ALBUM_TRACKS, {
      ...props,
    });
  };

  return (
    <Pressable onPress={gotToAlbumTracks} w="100%">
      <Box
        borderRadius="md"
        w="100%"
        h={innerBoxSize}
        overflow="hidden"
        alignItems="center"
        justifyContent="center">
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{uri: props.imgUrl || props.defaultImage}}
          style={imageStyle}
        />
      </Box>
      <Box py="3px">
        <Text fontSize="xs" isTruncated>
          {he.decode(props.songTitle)}
        </Text>
        <Row>
          <Text fontSize="10px" opacity="0.5">
            {props.tracks?.length} tracks •{' '}
          </Text>
          <Text fontSize="10px" opacity="0.3">
            {new Date(props.date).toLocaleDateString('en-GB', {
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </Row>
      </Box>
    </Pressable>
  );
};

export default AlbumCard;
