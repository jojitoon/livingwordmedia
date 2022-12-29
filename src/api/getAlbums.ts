import {AlbumProp} from '../types';
import {QUERY_PATHS} from '../utils/contants';
import {ApiCaller} from './init';

export default async function getAlbums({
  per = 10,
  page = 1,
}): Promise<AlbumProp[]> {
  const {data} = await ApiCaller.get(
    `${QUERY_PATHS.ALBUMS}?per_page=${per}&page=${page}`,
  );

  return data?.data || [];
}
