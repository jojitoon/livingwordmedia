import {
  Actionsheet,
  Box,
  ChevronDownIcon,
  Flex,
  Heading,
  Icon,
  Pressable,
  Progress,
  Row,
  Spinner,
  Text,
  useColorModeValue,
  useDisclose,
  useTheme,
} from 'native-base';
import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TrackPlayer, {
  // Event,
  State,
  usePlaybackState,
  useProgress,
  // useTrackPlayerEvents,
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import he from 'he';
import {Slider} from '@miblanchard/react-native-slider';
import {useCurrentTrack} from '../hooks/useCurrentTrack';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import RNBackgroundDownloader, {
  DownloadTask,
} from '@kesha-antonov/react-native-background-downloader';
import {useLocalData} from '../context/LocalDataContext';
import {pickOutName} from '../utils/common';
import CircularProgress from 'react-native-circular-progress-indicator';

const TrackPlayerBox = () => {
  const theme = useTheme();
  const {
    addToLocal,
    addToFavorite,
    removeFromFavorite,
    state: {local, liked},
  } = useLocalData();
  const {track} = useCurrentTrack();
  const playerState = usePlaybackState();
  const isPaused = playerState === State.Paused || playerState === State.Ready;
  const insets = useSafeAreaInsets();
  const {position, buffered, duration} = useProgress();
  const playProgress = (position / duration) * 100;
  const bufferedProgress = (buffered / duration) * 100;
  const windowSize = Dimensions.get('window');
  // const boxHeight = windowSize.height;
  const width = windowSize.width;
  const boxSize = width - 100;
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const isLoading = useDebouncedValue(
    playerState === State.Connecting || playerState === State.Buffering,
    250,
  );

  const isFavourite = React.useMemo(() => {
    if (!track) {
      return false;
    }
    return !!liked[track.url];
  }, [liked, track]);

  const isAlreadyDownloaded = React.useMemo(() => {
    if (!track) {
      return false;
    }
    return track.isLocal || !!local[track.url];
  }, [local, track]);

  console.log({
    isFavourite,
    isDownloading,
    isAlreadyDownloaded,
    downloadProgress,
  });

  const {isOpen, onOpen, onClose} = useDisclose();

  const downloadItemRef = React.useRef<DownloadTask | null>(null);

  const pauseDownload = () => {
    if (downloadItemRef.current) {
      downloadItemRef.current.pause();
      setIsDownloading(false);
    }
  };

  const resumeDownload = () => {
    if (downloadItemRef.current) {
      downloadItemRef.current.resume();
      setIsDownloading(true);
    }
  };

  const cancelDownload = () => {
    if (downloadItemRef.current) {
      downloadItemRef.current.stop();
      setIsDownloading(false);
      setDownloadProgress(0);
      downloadItemRef.current = null;
    }
  };

  const handleDownload = () => {
    console.log('handleDownload');

    if (!track) {
      return;
    }

    const newUrl = `${
      RNBackgroundDownloader.directories.documents
    }/${pickOutName(track.url as string)}`;

    const download = RNBackgroundDownloader.download({
      id: track.url as string,
      url: track.url as string,
      destination: newUrl,
    }).begin(expectedBytes => {
      setIsDownloading(true);
      console.log(`Going to download ${expectedBytes} bytes!`);
    });

    downloadItemRef.current = download;

    download.progress(percent => {
      console.log(`Downloaded: ${percent * 100}%`);
      setDownloadProgress(percent * 100);
    });

    download.done(() => {
      addToLocal({
        ...track,
        url: newUrl,
        id: track.url,
        isLocal: true,
      });
      console.log('Download is done!');
      setDownloadProgress(0);
      setIsDownloading(false);
      downloadItemRef.current = null;
      if (Platform.OS === 'ios') {
        RNBackgroundDownloader.completeHandler(download.id);
      }
    });

    download.error(error => {
      console.log(
        'Download canceled due to error: ',
        error,
        error.code,
        error.message,
      );
      setDownloadProgress(0);
      setIsDownloading(false);
      downloadItemRef.current = null;
    });
  };

  const manageDownload = () => {
    console.log(downloadItemRef.current);

    if (!downloadItemRef.current) {
      handleDownload();
      return;
    } else if (isDownloading) {
      pauseDownload();
    } else {
      resumeDownload();
    }
  };

  // const fetchInitialTrack = async () => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();
  //   console.log('currentTrack', currentTrack);

  //   if (currentTrack) {
  //     const currentTrackData = await TrackPlayer.getTrack(currentTrack);
  //     setTrack(currentTrackData);
  //   }
  // };

  const isReady = playerState !== State.None;

  const handlePlayPause = () => {
    if (playerState === State.Playing || isLoading) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  };

  const handleNext = () => {
    TrackPlayer.skipToNext();
  };

  const handlePrevious = () => {
    TrackPlayer.skipToPrevious();
  };

  const imageStyle = {width: '105%', height: '105%'};

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const sliderColor1 = useColorModeValue(theme.colors.gray[400], 'white');
  const sliderColor2 = useColorModeValue(
    theme.colors.gray[200],
    theme.colors.gray[500],
  );

  const handleFavourite = () => {
    if (!track) {
      return;
    }
    if (isFavourite) {
      removeFromFavorite(track.url);
    } else {
      addToFavorite({
        ...track,
        id: track.url,
      });
    }
  };

  return isReady ? (
    <Pressable
      _light={{
        backgroundColor: 'white',
        borderColor: 'gray.200',
      }}
      _dark={{
        backgroundColor: 'gray.800',
        borderColor: 'gray.700',
      }}
      onPress={onOpen}
      h="65px"
      w="100%"
      position="absolute"
      bottom={insets.bottom + 45}
      borderTopWidth={StyleSheet.hairlineWidth}>
      <Row
        flex={1}
        p="2px"
        alignItems="center"
        px="10px"
        justifyContent="space-between">
        <Row flex={1} mr="30px" alignItems="center">
          <Box w="40px" h="40px" bg="red.400" borderRadius="4">
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: track?.artwork as string}}
              style={imageStyle}
            />
          </Box>
          <Box ml="10px" w="100%">
            <Text fontSize="xs" fontWeight="bold">
              {track?.title}
            </Text>
            <Text fontSize="10px" isTruncated w="80%">
              {track?.album}
            </Text>
          </Box>
        </Row>
        <Pressable onPress={handlePlayPause}>
          {isLoading ? (
            <Spinner color="gray.400" />
          ) : (
            <Icon
              as={Ionicons}
              name={isPaused ? 'play' : 'pause'}
              size="30px"
            />
          )}
        </Pressable>
      </Row>
      <Box w="100%" h="3px" bg="gray.200" overflow="hidden">
        <Progress
          w={`${bufferedProgress}%`}
          m={0}
          h="3px"
          colorScheme="orange"
          value={playProgress}
          borderRadius="0"
          bg="gray.500"
        />
      </Box>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          position="relative"
          borderTopRadius="0"
          h="100%"
          maxH="100%"
          _dragIndicatorWrapper={
            {
              // position: 'absolute',
              // zIndex: 1,
            }
          }
          _dragIndicator={
            {
              // height: insets.top + 400,
              // width: '100%',
              // backgroundColor: 'transparent',
            }
          }>
          <Flex
            zIndex={-1}
            flex={1}
            w="100%"
            display="flex"
            justifyContent="space-between">
            <Row justifyContent="flex-end" w="100%" mt={insets.top} zIndex={1}>
              <Pressable mx="20px" onPress={onClose} zIndex={100}>
                <ChevronDownIcon size="lg" />
              </Pressable>
            </Row>
            <Box mt="50px" w="100%" h={boxSize} alignItems="center">
              <Box w={boxSize} h={boxSize} bg="blue.100" shadow="9">
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{uri: track?.artwork as string}}
                  style={imageStyle}
                />
              </Box>
            </Box>
            <Box px="10px" mt="50px">
              <Heading size="md">{he.decode(track?.title || '')}</Heading>
              <Text fontSize="sm" opacity="0.6">
                {he.decode(track?.album || '')}
              </Text>
            </Box>
            <Box w="100%" px="10px">
              <Slider
                value={position}
                onSlidingComplete={value => {
                  const toSeek = typeof value === 'number' ? value : value?.[0];

                  TrackPlayer.seekTo(toSeek);
                }}
                maximumValue={duration}
                // eslint-disable-next-line react-native/no-inline-styles
                thumbStyle={{
                  width: 10,
                  height: 10,
                }}
                thumbTintColor={sliderColor1}
                minimumTrackTintColor={sliderColor1}
                maximumTrackTintColor={sliderColor2}
                animateTransitions
                disabled={isLoading}
              />
              <Row
                mt="-10px"
                alignItems="center"
                justifyContent="space-between">
                <Text fontSize="xs" color="gray.500">
                  {formatTime(position)}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {formatTime(duration)}
                </Text>
              </Row>
              <Row mt="45px" alignItems="center">
                <Pressable onPress={handlePrevious}>
                  <Icon as={Ionicons} name="play-skip-back" size="50px" />
                </Pressable>
                <Row flex={1} justifyContent="center">
                  <Pressable onPress={handlePlayPause}>
                    {isLoading ? (
                      <Spinner color="gray.400" size="lg" />
                    ) : (
                      <Icon
                        as={Ionicons}
                        name={isPaused ? 'play-circle' : 'pause-circle'}
                        size="100px"
                        alignSelf="center"
                        pl="3px"
                      />
                    )}
                  </Pressable>
                </Row>
                <Pressable onPress={handleNext}>
                  <Icon as={Ionicons} name="play-skip-forward" size="50px" />
                </Pressable>
              </Row>
            </Box>
            <Row mt="20px" alignItems="center" justifyContent="space-around">
              <Pressable onPress={manageDownload}>
                {isAlreadyDownloaded ? null : isDownloading ? (
                  <CircularProgress
                    value={downloadProgress}
                    radius={18}
                    activeStrokeWidth={2}
                    inActiveStrokeWidth={4}
                    valueSuffix={'%'}
                    progressValueStyle={{fontSize: 8}}
                  />
                ) : (
                  <Icon
                    as={Ionicons}
                    name="download"
                    size="30px"
                    // color="gray.900"
                  />
                )}
              </Pressable>
              <Icon
                as={Ionicons}
                name={`heart${isFavourite ? '' : '-outline'}`}
                size="30px"
                color={isFavourite ? 'red.500' : 'gray.500'}
                onPress={handleFavourite}
              />
              {/* <Icon
                  as={Ionicons}
                  name="layers"
                  size="30px"
                  color="gray.900"
                  onPress={getQueue}
                /> */}
            </Row>
          </Flex>
        </Actionsheet.Content>
      </Actionsheet>
    </Pressable>
  ) : null;
};

export default TrackPlayerBox;
