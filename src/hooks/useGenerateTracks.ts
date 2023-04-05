import {useLocalData} from '../context/LocalDataContext';
import {AlbumProp} from '../types';
import {generateTrack} from '../utils/common';

export const useGenerateTracks = (album: AlbumProp) => {
  const {
    state: {local},
  } = useLocalData();

  return album.tracks.map(track => {
    if (local[track.link]) {
      console.log('local track', track.link);
      return local[track.link];
    } else {
      return generateTrack(track, album);
    }
  });
};
