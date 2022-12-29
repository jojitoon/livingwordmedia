import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorModeValue, useTheme} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import routes from './routes';
import HomeScreens from './HomeScreens';
import SearchScreens from './SearchScreens';
import ProfileScreens from './ProfileScreens';

const Tab = createBottomTabNavigator();

const tabViewIcons = {
  [routes.HOME_TAB]: {
    active: 'home',
    inactive: 'home-outline',
    name: 'Home',
  },
  [routes.SEARCH_TAB]: {
    active: 'search',
    inactive: 'search-outline',
    name: 'Search',
  },
  [routes.MINE_TAB]: {
    active: 'person',
    inactive: 'person-outline',
    name: 'Me',
  },
};

const TabScreens = () => {
  const {colors} = useTheme();
  const backgroundColor = useColorModeValue(colors.white, colors.gray['900']);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const state = focused ? 'active' : 'inactive';
          const iconName = tabViewIcons[route.name]?.[state];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: colors.blueGray[500],
        tabBarActiveTintColor: colors.tertiary[500],
        tabBarStyle: {
          backgroundColor,
        },
        title: tabViewIcons[route.name]?.name,
      })}>
      <Tab.Screen name={routes.HOME_TAB} component={HomeScreens} />
      <Tab.Screen name={routes.SEARCH_TAB} component={SearchScreens} />
      <Tab.Screen name={routes.MINE_TAB} component={ProfileScreens} />
    </Tab.Navigator>
  );
};

export default TabScreens;
