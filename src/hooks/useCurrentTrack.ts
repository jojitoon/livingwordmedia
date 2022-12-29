import {useState, useEffect} from 'react';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import type {Track} from 'react-native-track-player';

export const useCurrentTrack = (): {
  track: Track | undefined;
  trackIndex: number | undefined;
} => {
  const [index, setIndex] = useState<number | undefined>();
  const [track, setTrack] = useState<Track | undefined>();

  console.log('index', index);

  const fetchInitialTrack = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log('currentTrack', currentTrack);

    if (currentTrack) {
      const currentTrackData = await TrackPlayer.getTrack(currentTrack);
      if (currentTrackData) {
        setTrack(currentTrackData);
      }
    }
  };

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async event => {
      if (event.type === Event.PlaybackTrackChanged) {
        setIndex(event.nextTrack);
      }
      if (event.type === Event.PlaybackState) {
        console.log('Event.PlaybackTrackChanged', event);
        fetchInitialTrack();
      }
    },
  );

  useEffect(() => {
    if (index === undefined) {
      return;
    }
    (async () => {
      const currentTrack = await TrackPlayer.getTrack(index);
      if (currentTrack) {
        setTrack(currentTrack);
      }
    })();
  }, [index]);

  useEffect(() => {
    fetchInitialTrack();
  }, []);

  return {track, trackIndex: index};
};
