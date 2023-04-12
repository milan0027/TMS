import React, { useEffect, useState } from "react";
import { fraStats } from "../../features/stat/statSlice";
import { setOption } from "../../features/navitem/navitemSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Loader } from "../../components";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Button, Grid } from "@mui/material";

const Fractional = () => {
  const dispatch = useDispatch();
  const frastat = useSelector((store) => store.stat.fraStats);
  const isLoading = useSelector((store) => store.stat.isLoading);
  const [start, setStart] = useState(Date.now());
  const [end, setEnd] = useState(Date.now());
  useEffect(() => {
    dispatch(setOption("none"));
    dispatch(fraStats());
  }, []);

  const handleStart = (e) => {
    setStart(new Date(e));
  };
  const handleEnd = (e) => {
    setEnd(new Date(e));
  };
  const handleSubmit = () => {
    const st = new Date(start);
    const enn = new Date(end);
    const obj = {
      start: st.getTime(),
      end: enn.getTime()
    }
    //console.log(obj)
    dispatch(fraStats(obj))
  }
  return (
    <>
      <h1>Fractional Statistics</h1>
      <Grid container spacing={3}>
        <Grid item md={5} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileDateTimePicker"]}>
              <DemoItem label='Start At'>
                <MobileDateTimePicker
                  value={dayjs(start)}
                  onChange={handleStart}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item md={5} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["MobileDateTimePicker"]}>
              <DemoItem label='End At'>
                <MobileDateTimePicker value={dayjs(end)} onChange={handleEnd} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={12}>
          
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            
        </Grid>
      </Grid>
      {!isLoading && frastat ? (
        <>
        <h1>Results</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Userame</TableCell>
                  <TableCell>Executive ID</TableCell>
                  <TableCell align='right'>Fraction of Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {frastat.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell>{row._id}</TableCell>
                    <TableCell align='right'>{(row.frac*100).toFixed(5)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>{isLoading && <Loader />}</>
      )}
    </>
  );
};

export default Fractional;
