import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSwr from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data = { name: '' }, error } = useSwr('/api/home', fetcher);
  console.log('data', data)
  const [state, setState] = useState({ name: '主页' });
  return (
    <div>{`this is ${data.name || ''} ${state.name}`}</div>
  );
}

// Home.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
