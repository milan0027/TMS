import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { submitProject } from '../../features/user/userSlice';
import { setOption } from '../../features/navitem/navitemSlice';
const AddProject = () => {
  const [name, setName] = useState("");
  const [desc,setDesc] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setOption('none'))
    //eslint-disable-next-line
  },[])
  const handleSubmit = (e) => {
    const obj = {
      name,
      desc
    };

    dispatch(submitProject(obj));
    navigate("/dashboard");
  };
  return (
    <>
   
    <h1>Add Project</h1>
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
          label='Description'
          variant='outlined'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
       
        <Button variant='contained' onClick={handleSubmit}>
            Submit
        </Button>
      </Stack>
    </>
  )
}

export default AddProject