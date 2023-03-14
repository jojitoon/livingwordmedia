import {useLocalData} from '../context/LocalDataContext';
import {AlbumProp} from '../types';
import {generateTrack} from '../utils/common';

export const useGenerateTracks = (album: AlbumProp) => {
  const {state} = useLocalData();
  const local = state.local;

  return album.tracks.map(track => {
    if (local[track.link]) {
      return generateTrack(
        {
          ...track,
          title: local[track.link],
        },
        album,
      );
    } else {
      return generateTrack(track, album);
    }
  });
};
