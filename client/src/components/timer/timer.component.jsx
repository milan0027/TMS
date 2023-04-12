import React, {useEffect, useState} from 'react'
import moment from 'moment'
const Timer = () => {
    const [time, setTime] = useState(Date.now());

useEffect(() => {
  const interval = setInterval(() => setTime(Date.now()), 1000);
  return () => {
    clearInterval(interval);
  };
}, []);
  return (
    <>
   <h1>{ moment(time).format('LTS')}</h1>
   <h3>{ moment(time).format('MMMM Do YYYY')}</h3>
    </>
  )
}

export default Timer