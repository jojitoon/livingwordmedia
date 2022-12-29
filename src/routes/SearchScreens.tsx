import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import AlbumTracksScreen from '../screens/AlbumTracksScreen';
import SearchScreen from '../screens/SearchScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const SearchScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.SEARCH} component={SearchScreen} />
      <Stack.Screen name={routes.ALBUM_TRACKS} component={AlbumTracksScreen} />
    </Stack.Navigator>
  );
};

export default SearchScreens;
