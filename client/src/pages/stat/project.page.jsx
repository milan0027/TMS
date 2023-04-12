import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { proStats } from "../../features/stat/statSlice";
import { Loader } from "../../components";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { setOption } from "../../features/navitem/navitemSlice";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell>{row._id}</TableCell>
        <TableCell align='right'>
          {row.meetings.length}
        </TableCell>
        <TableCell align='right'>
          {row.meetings.reduce((total, curr) => total + curr.duration, 0) /
            60000}
        </TableCell>
        <TableCell align='right'>
          {(row.meetings.reduce((total, curr) => total + curr.duration*(curr.invited.length), 0) /
            3600000).toFixed(2)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Meeting ID</TableCell>
                    <TableCell align='right'>Duration (Mins)</TableCell>
                    <TableCell align='right'>People</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.meetings.map((meet) => (
                    <TableRow key={meet._id}>
                      <TableCell component='th' scope='row'>
                        {meet.name}
                      </TableCell>
                      <TableCell>{meet._id}</TableCell>
                      <TableCell align='right'>
                        {meet.duration / 60000}
                      </TableCell>
                      <TableCell align='right'>
                        {meet.invited.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Project = () => {
  const dispatch = useDispatch();
  const prostat = useSelector((store) => store.stat.proStats);
  const isLoading = useSelector((store) => store.stat.isLoading);
  useEffect(() => {
    dispatch(setOption('none'));
    dispatch(proStats());
  }, []);
  return (
    <>
      <h1>Project Statistics</h1>
      {!isLoading && prostat ? (
        <>
          <TableContainer component={Paper}>
            <Table aria-label='collapsible table'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Project ID</TableCell>
                  <TableCell align='right'>Meetings Held</TableCell>
                  <TableCell align='right'>Total Meeting Time&nbsp;(Mins)</TableCell>
                  <TableCell align='right'>Man-Hours&nbsp;(Hours)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prostat.map((row) => (
                  <Row key={row._id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Project;
