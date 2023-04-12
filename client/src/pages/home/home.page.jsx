import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOption } from '../../features/navitem/navitemSlice'

const Home = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOption('Home'))
    //eslint-disable-next-line
  },[])
  return (<>
 
    <h1>Hi, Welcome to Home Page</h1>
    <h3>Our TMS software is designed to help executives efficiently manage their time and schedules. 
      With its user-friendly interface, our software makes it easy to create new meetings, add personal schedules, 
      and resolve time clashes among executives with the help of secretaries. The software is compatible with all 
      devices.The software also provides project managers with valuable insights into project statistics and executive statistics, allowing them to see how many hours each 
      executive is spending on each project and how much manpower a project needs. With its powerful capabilities 
      and intuitive design, 
      our TMS software is the perfect tool for busy executives.</h3>
      </>)
}

export default Home