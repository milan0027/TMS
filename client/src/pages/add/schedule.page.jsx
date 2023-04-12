import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Chip, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useDispatch } from "react-redux";
import { submitMeeting, submitSchedule } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { setOption } from "../../features/navitem/navitemSlice";

const AddSchedule = () => {
 
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState(Date.now());
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setOption('none'))
    //eslint-disable-next-line
  },[])
  const handleChange = (e) => {
    setStart(new Date(e));
    
  };
  
  const handleSubmit = (e) => {
    const st = new Date(start);
    const obj = {
     
      desc,
     
      start:st.getTime() ,
      duration: duration * 60000,
      end: st.getTime() + duration * 60000,
    };

    dispatch(submitSchedule(obj));
    navigate("/dashboard");
  };
  return ( <>
    <h1>Add Schedule</h1>
      <Stack spacing={2} direction='column' sx={{marginBottom: '10px'}}>
       
        <TextField
          fullWidth
          id='outlined-basic3'
          label='Description'
          variant='outlined'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

       
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["MobileDateTimePicker"]}>
            <DemoItem label='Start At'>
              <MobileDateTimePicker
                value = {dayjs(start)}
                onChange={handleChange}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          fullWidth
          type='number'
          id='outlined-basic5'
          label='Duration in Minutes'
          variant='outlined'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <Button variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
      </Stack>
    </>
  )
}

export default AddSchedule