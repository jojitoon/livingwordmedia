import {AlbumProp} from '../types';
import {QUERY_PATHS} from '../utils/contants';
import {ApiCaller} from './init';

export default async function searchAlbum({
  per = 50,
  page = 1,
  search = '',
}): Promise<AlbumProp[]> {
  const {data} = await ApiCaller.get(
    `${QUERY_PATHS.SEARCH}?per_page=${per}&page=${page}&search=${search}`,
  );

  return data?.data || [];
}
