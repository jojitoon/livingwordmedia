import {Box, Heading, Icon, Row, ScrollView, Text} from 'native-base';
import * as React from 'react';
import {Dimensions} from 'react-native';
import BaseContainer from '../components/BaseContainer';
import {AlbumProp, ScreenProps} from '../types';
import FastImage from 'react-native-fast-image';
import he from 'he';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackCard from '../components/TrackCard';
import TrackPlayer from 'react-native-track-player';
import {useGenerateTracks} from '../hooks/useGenerateTracks';

const AlbumTracksScreen: React.FC<ScreenProps> = ({route}) => {
  const album = route.params as AlbumProp;
  const width = Dimensions.get('window').width;
  const boxSize = width - 100;
  const imageStyle = {width: '100%', height: '100%'};

  const tracks = useGenerateTracks(album);

  const playAlbum = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    TrackPlayer.play();
  };

  const playFromSpecificTrack = (index: number) => async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    await TrackPlayer.skip(index);
    TrackPlayer.play();
  };

  const downloadAll = () => {};

  return (
    <BaseContainer
      back
      //  title="Album Tracks"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box w="100%" h={boxSize} alignItems="center">
          <Box w={boxSize} h={boxSize} bg="blue.100" shadow="9">
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: album.imgUrl}}
              style={imageStyle}
            />
          </Box>
        </Box>
        <Box mt="20px">
          <Heading size="md">{he.decode(album.songTitle)}</Heading>
          <Text fontSize="sm" opacity="0.6">
            {new Date(album.date).toLocaleDateString('en-GB', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })}
          </Text>
        </Box>
        <Row my="1.5" alignItems="center" justifyContent="space-between">
          <Box>
            <Row alignItems="center">
              <Icon
                as={Ionicons}
                name="play-circle"
                size="50px"
                color="tertiary.500"
                onPress={playAlbum}
              />
              <Icon as={Ionicons} name="download" size="lg" ml="4" />
            </Row>
          </Box>
          <Row alignItems="center">
            <Icon as={Ionicons} name="heart-outline" size="30px" mr="20px" />
          </Row>
        </Row>
        <Box pt="20px" py="100px">
          {album.tracks?.map((track, index) => (
            <TrackCard
              key={index}
              {...track}
              album={album}
              onPress={playFromSpecificTrack(index)}
            />
          ))}
        </Box>
      </ScrollView>
    </BaseContainer>
  );
};

export default AlbumTracksScreen;
