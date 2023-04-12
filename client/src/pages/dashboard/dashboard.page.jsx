import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../features/navitem/navitemSlice";
import { loadUser } from "../../features/user/userSlice";
import { Loader } from "../../components";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
      <h1>Dashboard</h1>
      {!isLoading && user ? (
        <>
          <h3>{user.username}</h3>
          <h3>{user.email}</h3>
          <Stack spacing={2} direction='row'>
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
          <Stack sx={{marginTop: '10px'}} spacing={2} direction='row'>
            <Button variant='contained' onClick={() => navigate("/exestat")}>
              Executive Stats
            </Button>
            <Button variant='contained' onClick={() => navigate("/prostat")}>
              Project Stats
            </Button>
            {/* <Button
              variant='contained'
              onClick={() => navigate("/frastat")}
            >
              Fractional Stats
            </Button> */}
          </Stack>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Dashboard;
