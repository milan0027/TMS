import React, { useEffect } from 'react'
import { setOption } from '../../features/navitem/navitemSlice'
import { useDispatch, useSelector } from 'react-redux';
import { delMeeting, getMeetings, loadUser } from '../../features/user/userSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const Meetings = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((store) => store.user.meetings);
  const isMLoading = useSelector((store) => store.user.isMLoading);
  const user = useSelector((store) => store.user.user);
  useEffect(() => {
  
    dispatch(getMeetings());
    if(!user)
    dispatch(loadUser());
    dispatch(setOption("My Meetings"))
  },[])
  return (<>
    <h1>Meetings</h1>
    {!isMLoading && meetings && meetings.map((item) =>   <Card key={item._id} variant="outlined"  sx={{ minWidth: 275,
    margin:'10px 0px' }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {item.venue}
        </Typography>
        <Typography variant="body2">
          {item.purpose}
          <br />
          <b>Project ID : </b> {item.project}
          <br/>
          <b>Start : </b>{moment(item.start).format("LLL")}
          <br/>
          <b>End : </b>{moment(item.end).format("LLL")}
          <br/>
          <b>Duration : </b>{item.duration/60000} Mins
        </Typography>
      </CardContent>
      {user && item.creator===user._id && <CardActions>
        <Button size="small" onClick={() => dispatch(delMeeting({_id: item._id}))}>Delete</Button>
      </CardActions>}
    </Card>)}
    </>)
}

export default Meetings