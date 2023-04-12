import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Chip, Stack } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useDispatch } from "react-redux";
import { submitMeeting } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { setOption } from "../../features/navitem/navitemSlice";

const AddMeeting = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [purpose, setPurpose] = useState("");
  const [project, setProject] = useState("");
  const [invited, setInvited] = useState([]);
  const [start, setStart] = useState(Date.now());
  const [duration, setDuration] = useState(0);
  const [attendee, setAttendee] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
    dispatch(setOption('none'))
    //eslint-disable-next-line
  },[])
  const handleChange = (e) => {
    setStart(new Date(e));
    
  };
  const handleEmail = () => {
    setInvited([...invited, attendee]);
    setAttendee("");
  };
  const handleSubmit = (e) => {
    const st = new Date(start);
    const obj = {
      name,
      venue,
      purpose,
      project,
      start:st.getTime() ,
      duration: duration * 60000,
      invited,
      end: st.getTime() + duration * 60000,
    };

    dispatch(submitMeeting(obj));
    navigate("/dashboard");
  };
  return (
    <>
      <h1>Add Meeting</h1>
      <Stack spacing={2} direction='column' sx={{marginBottom: '10px'}}>
        <TextField
          fullWidth
          id='outlined-basic1'
          label='Name'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          id='outlined-basic2'
          label='Venue'
          variant='outlined'
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />
        <TextField
          fullWidth
          id='outlined-basic3'
          label='Purpose'
          variant='outlined'
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <TextField
          fullWidth
          id='outlined-basic4'
          label='Project ID'
          variant='outlined'
          value={project}
          onChange={(e) => setProject(e.target.value)}
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

        <Stack direction='row' spacing={2}>
          <TextField
            fullWidth
            type='email'
            id='outlined-basic6'
            label='ID of Attendees'
            variant='outlined'
            value={attendee}
            onChange={(e) => setAttendee(e.target.value)}
          />
          <Button variant='outlined' onClick={handleEmail}>
            Add
          </Button>
        </Stack>
        <Stack direction='row' spacing={1}>
          {invited.map((item, index) => (
            <Chip label={item} key={index} color='success' />
          ))}
        </Stack>
        <Button variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
      </Stack>
    </>
  );
};

export default AddMeeting;
