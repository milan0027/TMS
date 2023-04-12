import React, { useEffect } from "react";
import { setOption } from "../../features/navitem/navitemSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  delMeeting,
  getAllMeetings,
} from "../../features/user/userSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Grid from "@mui/material/Grid";

const AllMeetings = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((store) => store.user.allMeetings);
  const isAMLoading = useSelector((store) => store.user.isAMLoading);
  const type = useSelector((store) => store.user.type);
  useEffect(() => {
    dispatch(getAllMeetings());
    dispatch(setOption("All Meetings"));
  }, []);
  return (
    <>
      <h1>All Meetings</h1>
      {!isAMLoading &&
        meetings &&
        meetings.map((item) => (
          <Card
            key={item._id}
            variant='outlined'
            sx={{ minWidth: 275, margin: "10px 0px" }}
          >
            <Grid container>
              <Grid item xs={12} md={10}>
                <CardContent>
                  {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
                  <Typography variant='h5' component='div'>
                    {item.name}
                  </Typography>
                  <Typography sx={{ mb: 1 }} color='text.secondary'>
                    {item.venue}
                  </Typography>
                  <Typography variant='body2'>
                    <b>Project ID : </b> {item.project}
                    <br />
                    <b>Start : </b>
                    {moment(item.start).format("LLL")}
                    <br />
                    <b>End : </b>
                    {moment(item.end).format("LLL")}
                    <br />
                    <b>Duration : </b>
                    {item.duration / 60000} Mins
                    <br />
                    <b>Creator ID: </b>
                    {item.creator}
                    <br />
                    <b>Participants ID: </b>
                    {item.invited.map((inv) => (
                      <li key={inv}>{inv}</li>
                    ))}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={6} md={2}>
                {type === "sec" && (
                  <Button
                    sx={{ margin: "15px", backgroundColor: "red" }}
                    size='small'
                    variant='contained'
                    onClick={() => dispatch(delMeeting({ _id: item._id }))}
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>
        ))}
    </>
  );
};

export default AllMeetings;
