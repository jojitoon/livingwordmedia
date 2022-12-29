import * as React from 'react';
import TrackPlayerBox from '../components/TrackPlayerBox';
import TabScreens from './TabScreens';

const MainNavigation = () => {
  return (
    <>
      <TabScreens />
      <TrackPlayerBox />
    </>
  );
};

export default MainNavigation;
