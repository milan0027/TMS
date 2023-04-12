import React, { useEffect } from "react";
import { setOption } from "../../features/navitem/navitemSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  delSchedule,
  getAllSchedules,
} from "../../features/user/userSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Grid from "@mui/material/Grid";


const AllSchedules = () => {

    const dispatch = useDispatch();
  const schedules = useSelector((store) => store.user.allSchedules);
  const isASLoading = useSelector((store) => store.user.isASLoading);
  const type = useSelector((store) => store.user.type);
  useEffect(() => {
    dispatch(getAllSchedules());
    dispatch(setOption("All Schedules"));
  }, []);
  return (
    <>
      <h1>All Schedules</h1>
      {!isASLoading &&
        schedules &&
        schedules.map((item) => (
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

                  <Typography variant='h6' component='div'>
                    {item.desc}
                  </Typography>
                  <Typography variant='body2'>
                    <b>Start : </b>
                    {moment(item.start).format("LLL")}
                    <br />
                    <b>End : </b>
                    {moment(item.end).format("LLL")}
                    <br />
                    <b>Duration : </b>
                    {item.duration / 60000} Mins
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={6} md={2}>
                {type === "sec" && (
                  <Button
                    sx={{ margin: "15px", backgroundColor: "red" }}
                    size='small'
                    variant='contained'
                    onClick={() => dispatch(delSchedule({ _id: item._id }))}
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            </Grid>
          </Card>
        ))}
    </>
  
  )
}

export default AllSchedules