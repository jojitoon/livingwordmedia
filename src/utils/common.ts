import {AlbumProp, SongProp} from '../types';
import he from 'he';

export const getGreetings = () => {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return 'Good morning';
  }
  if (hours < 18) {
    return 'Good afternoon';
  }
  return 'Good evening';
};

export const generateTrack = (song: SongProp, album: AlbumProp) => {
  return {
    url: song.link,
    title: he.decode(song.title),
    album: he.decode(album.songTitle),
    date: album.date,
    artwork: album.imgUrl,
  };
};

export const generateTracks = (album: AlbumProp) => {
  return album.tracks.map(track => generateTrack(track, album));
};
