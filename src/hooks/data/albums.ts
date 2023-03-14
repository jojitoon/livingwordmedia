import getAlbums from '../../api/getAlbums';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {QUERY_PATHS} from '../../utils/contants';
import searchAlbum from '../../api/searchAlbum';

export const useAlbums = () => {
  return useQuery([QUERY_PATHS.ALBUMS], () => getAlbums({}));
};

export const useSearchAlbums = (search: string) => {
  return useInfiniteQuery(
    [QUERY_PATHS.SEARCH, search],
    ({pageParam}) => searchAlbum({search, page: pageParam}),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length < 50) {
          return undefined;
        }

        return pages.length + 1;
      },
    },
  );
};

export const useAllSongs = () => {
  return useInfiniteQuery(
    [QUERY_PATHS.SEARCH, 'all songs'],
    ({pageParam}) => searchAlbum({search: 'in songs', page: pageParam}),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length < 50) {
          return undefined;
        }

        return pages.length + 1;
      },
    },
  );
};
