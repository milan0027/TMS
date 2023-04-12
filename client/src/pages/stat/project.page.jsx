import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { proStats } from '../../features/stat/statSlice';
import { Loader } from '../../components';

const Project = () => {
    const dispatch = useDispatch();
  const prostat = useSelector((store) => store.stat.proStats);
  const isLoading = useSelector((store) => store.stat.isLoading);
  useEffect(() => {
    dispatch(proStats());
  },[])
  return (<>
 
    <h1>Project</h1>
    {!isLoading && prostat ? <>
       {prostat.map((item) => <div key={item._id}>{item.name}</div>)}
    </>: <Loader/>}
    </>
  )
}

export default Project