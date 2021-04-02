import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Home() {
  // console.log('props', props)
  const [state, setState] = useState({ name: '主页' });
  return (
    <div>{`this is ${state.name}`}</div>
  );
}

// Home.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
