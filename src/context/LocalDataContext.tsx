import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {AlbumProp} from '../types';
import {storeDataInStorage} from '../utils/storage';

enum ActionType {
  SET_LOCAL = 'setLocal',
  ADD_TO_LOCAL = 'addToLocal',
  REMOVE_FROM_LOCAL = 'removeFromLocal',
  ADD_TO_LIKED = 'addToLiked',
  REMOVE_FROM_LIKED = 'removeFromLiked',
  ADD_TO_PLAYLIST = 'addToPlaylist',
  REMOVE_FROM_PLAYLIST = 'removeFromPlaylist',
  ADD_TO_HISTORY = 'addToHistory',
  REMOVE_FROM_HISTORY = 'removeFromHistory',
  SET_LAST_PLAYED = 'setLastPlayed',
  SET_LAST_PLAYED_ALBUM = 'setLastPlayedAlbum',
}

type Action = {
  type: ActionType;
  payload: any;
};

type Dispatch = (action: Action) => void;
type ProviderProps = {children: React.ReactNode};

export interface LocalData {
  liked: Record<string, any>;
  local: Record<string, any>;
  playlists: string[];
  history: string[];
  lastPlayed: any;
  lastPlayedAlbum?: AlbumProp;
}

const initialLocalData: LocalData = {
  liked: [],
  local: {},
  playlists: [],
  history: [],
  lastPlayed: null,
};

interface LocalDataContextProps {
  state: LocalData;
  dispatch: Dispatch;
  addToLocal: (data: any) => void;
}
export const LocalDataContext = createContext<
  LocalDataContextProps | undefined
>(undefined);

const localDataReducer = (state: LocalData, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TO_LOCAL:
      return {
        ...state,
        local: {...state.local, [action.payload.id]: action.payload},
      };
    case ActionType.SET_LOCAL:
      return {
        ...state,
        local: action.payload,
      };
    case ActionType.REMOVE_FROM_LOCAL:
      return {
        ...state,
        local: Object.keys(state.local),
      };

    case ActionType.ADD_TO_LIKED:
      return {
        ...state,
        liked: {
          ...state.liked,
          [action.payload.id]: action.payload,
        },
      };
    case ActionType.REMOVE_FROM_LIKED:
      return {
        ...state,
        // liked: state.liked.filter(item => item !== action.payload),
      };

    case ActionType.ADD_TO_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
      };
    case ActionType.REMOVE_FROM_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.filter(item => item !== action.payload),
      };

    case ActionType.ADD_TO_HISTORY:
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    case ActionType.REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: state.history.filter(item => item !== action.payload),
      };

    case ActionType.SET_LAST_PLAYED:
      return {
        ...state,
        lastPlayed: action.payload,
      };

    case ActionType.SET_LAST_PLAYED_ALBUM:
      return {
        ...state,
        lastPlayedAlbum: action.payload,
      };

    default:
      return state;
  }
};

export const LocalDataProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = React.useReducer(
    localDataReducer,
    initialLocalData,
  );

  const addToLocal = useCallback(
    (data: any) => {
      const newLocal = {...state.local, [data.id]: data};
      dispatch({type: ActionType.SET_LOCAL, payload: newLocal});
      storeDataInStorage('local', newLocal);
    },
    [state.local],
  );

  const removeFromLocal = useCallback(
    (data: any) => {
      const newLocal = {...state.local};
      delete newLocal[data];

      dispatch({type: ActionType.SET_LOCAL, payload: newLocal});
      storeDataInStorage('local', newLocal);
    },
    [state.local],
  );

  const value = useMemo(
    () => ({state, dispatch, addToLocal, removeFromLocal}),
    [addToLocal, removeFromLocal, state],
  );

  return (
    <LocalDataContext.Provider value={value}>
      {children}
    </LocalDataContext.Provider>
  );
};

export const useLocalData = () => {
  const context = useContext(LocalDataContext);

  if (context === undefined) {
    throw new Error('useLocalData must be used within a LocalDataProvider');
  }

  return context;
};
