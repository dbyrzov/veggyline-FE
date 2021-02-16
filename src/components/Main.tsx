import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Mobile from './Mobile/Mobile';
import PC from './PC/PC';

const Main: React.FC = () => {
  return useMediaQuery({ query: `(max-width: 800px)` }) ? <Mobile/> : <PC/>;
};
export default Main;
