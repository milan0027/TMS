import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../features/navitem/navitemSlice";
import { loadUser } from "../../features/user/userSlice";
import { Loader, Timer } from "../../components";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
const Dashboard = () => {
  const user = useSelector((store) => store.user.user);
  const isLoading = useSelector((store) => store.user.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) dispatch(loadUser());

    dispatch(setOption("Dashboard"));
    // eslint-disable-next-line
  }, [user]);
  const navigate = useNavigate();

  return (
    <>
   
      {!isLoading && user ? (
        <>
         <Grid container >
          <Grid item xs={12} md={8}>
      
          <h1>Dashboard</h1>
          <h3>Hi, {user.username} ! Your Role is {user.type==='exe'?"Executive":"Secretary"}</h3>
          <h3>{user.email}</h3>
          {user.type==='exe'?<><Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={() => navigate("/addmeeting")}>
              Add Meeting
            </Button>
            <Button variant='contained' onClick={() => navigate("/addproject")}>
              Add Project
            </Button>
            <Button
              variant='contained'
              onClick={() => navigate("/addschedule")}
            >
              Add Schedule
            </Button>
          </Stack>
         </>:<></>}
         <Stack sx={{marginTop: '10px'}} spacing={2} direction='row'>
            <Button variant='contained' onClick={() => navigate("/exestat")}>
              Executive Stats
            </Button>
            <Button variant='contained' onClick={() => navigate("/prostat")}>
              Project Stats
            </Button>
            <Button
              variant='contained'
              onClick={() => navigate("/frastat")}
            >
              Fractional Stats
            </Button>
          </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
          <Timer/>
          </Grid>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
      
    </>
  );
};

export default Dashboard;
