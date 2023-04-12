import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exeStats } from '../../features/stat/statSlice';
import { Loader } from '../../components';

const Executive = () => {
  const dispatch = useDispatch();
  const exestat = useSelector((store) => store.stat.exeStats);
  const isLoading = useSelector((store) => store.stat.isLoading);
  useEffect(() => {
    dispatch(exeStats());
  },[])
  return (<>
 
    <h1>Executive</h1>
    {!isLoading && exestat ? <>
       {exestat.map((item) => <div key={item._id}>{item.username}</div>)}
    </>: <Loader/>}
    </>)
}

export default Executive