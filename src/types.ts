import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type ScreenProps = NativeStackScreenProps<any, string>;

export interface SongProp {
  title: string;
  type: string;
  link: string;
}

export interface AlbumProp {
  imgUrl: string;
  songTitle: string;
  tracks: SongProp[];
  date: string;
}
