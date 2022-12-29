import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import MeScreen from '../screens/MeScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const ProfileScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.MINE} component={MeScreen} />
    </Stack.Navigator>
  );
};

export default ProfileScreens;
