import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

import { check } from '../utils/registered';

export default function Home(props) {
  // console.log('props.shows', props.shows)
  const [state] = useState({ name: 'home' });
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  const onRegistered = () => {
    const isUserName = check(userName, ['isLength', 'isNonEmpty']);
    const isPassWord = check(passWord, ['isExist', 'isLength', 'isNoNumber', 'isNonEmpty']);
    if (!isUserName || !isPassWord) return;
    fetch('http://xxx.xxx.xxx.xxx:3001/api/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ username: userName, password: passWord }),
    }).then(async r => {
      const res = await r.json();
      console.log('res', res);
    })
  }

  return (
    <div>
      <div>{`this is ${state.name || ''}`}</div>
      <div className="border border-gray-200 w-1/3 h-80 rounded flex flex-col item-center items-center">
        <input
          type="text"
          placeholder='用户名'
          className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-sm text-black placeholder-gray-400 border border-gray-200 rounded py-2 pl-5 w-1/2"
          value={userName}
          onChange={(evt) => setUserName(evt.target.value.trim())}
        />
        <input
          type="text"
          placeholder='密码'
          className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-sm text-black placeholder-gray-400 border border-gray-200 rounded py-2 pl-5 w-1/2"
          value={passWord}
          onChange={(evt) => setPassWord(evt.target.value.trim())}
        />
        <button type="button" class="text-violet-700 text-sm font-semibold px-6 py-2 rounded-lg bg-indigo-50 w-1/2" onClick={onRegistered}>注册</button>
      </div>
    </div>
  );
}

// 代替componentDidMount请求数据
Home.getInitialProps = async function() {
  const res = await fetch('http://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  console.log(`Show data fetched. Count: ${data.length}`)
  return { shows: data };
}

Home.propTypes = {
  shows: PropTypes.array.isRequired,
};
