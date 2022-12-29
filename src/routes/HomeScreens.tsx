import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import AlbumTracksScreen from '../screens/AlbumTracksScreen';
import HomeScreen from '../screens/HomeScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const HomeScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.HOME} component={HomeScreen} />
      <Stack.Screen name={routes.ALBUM_TRACKS} component={AlbumTracksScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreens;
