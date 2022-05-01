import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useHistory } from "react-router-dom";
import { getSession } from "../../Backend/auth.js";
import "./Account.css";
import Axios from "axios";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from "@mui/icons-material/Person";
import { DateRange } from "react-date-range";

function Account(props) {
  let history = useHistory();

  const [uid, setUid] = useState("");
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    points: 0,
  });

  const [rows, setRows] = useState([]);

  useEffect(() => {
    isLoggedIn();
  }, [props.status, uid]);

  const isLoggedIn = async () => {
    getSession()
      .then((session) => {
        //setUser({ ...user, id: session.idToken.payload.sub });
        setUid(session.idToken.payload.sub);
        Axios.get("http://localhost:3001/get-user", {
          params: { id: uid },
        }).then((res) => {
          setUser({
            id: res.data[0].id,
            fname: res.data[0].fname,
            lname: res.data[0].lname,
            email: res.data[0].email,
            points: res.data[0].points,
          });
        });
        Axios.get("http://localhost:3001/get-reservations", {
          params: { id: uid },
        }).then((res) => {
          console.log(res.data[0]);
          setRows(res.data);
          //res.data[0] arr of reservations
        });
        return true;
      })
      .catch((err) => {
        setUid("");
        history.push("./login");
        return false;
      });
  };

  //  Pop-up Stuff
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1); // Default guests number is 1

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate); //Updating local state of start date
    setEndDate(ranges.selection.endDate);
    props.setRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      guests: noOfGuests,
    });
  };

  const handleGuests = (num) => {
    setNoOfGuests(num);
    props.setRange({
      startDate: startDate,
      endDate: endDate,
      guests: num,
    });
  };

  //  Range for calendar
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //variables for cancel button
  const [openCancel, setOpenCancel] = React.useState(false);

  const handleClickOpenCancel = () => {
    setOpenCancel(true);
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <div class="title">
            <h1 class="text" id="welcome">
              {" "}
              Welcome{" "}
            </h1>
            <div class="info">
              <h3 class="text" id="username">
                {" "}
                Name{" "}
              </h3>
              <Divider />
              <h4 class="name"> {user.fname + " " + user.lname} </h4>
            </div>
            <div class="info">
              <h3 class="text" id="mail">
                {" "}
                Email{" "}
              </h3>
              <Divider />
              <h4 class="email"> {user.email} </h4>
            </div>
            <div class="info">
              <h3 class="text" id="points">
                {" "}
                Points{" "}
              </h3>
              <Divider />
              <h4 class="email"> {user.points} </h4>
            </div>
          </div>
          <div class="reservations">
            <h1 class="text" id="reserve">
              {" "}
              Your Reservations{" "}
            </h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Reservation ID</TableCell>
                    <TableCell align="right">Hotel</TableCell>
                    <TableCell align="right">Guests</TableCell>
                    <TableCell align="right">Total&nbsp;($)</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.dates}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.reserveDateStart.substring(0, 10) +
                          " - " +
                          row.reserveDateEnd.substring(0, 10)}
                      </TableCell>
                      <TableCell align="right">{row.reserveid}</TableCell>
                      <TableCell align="right">{props.hotels.find((e) => e.id === row.hotelid).hotelname}</TableCell>
                      <TableCell align="right">{row.guests}</TableCell>
                      <TableCell align="right">{row.totalprice}</TableCell>
                      <TableCell align="right" sx={{display:'flex'}}>
                          <div className="account_buttons">

                            <div>
                              <Button
                                style={{
                                  padding:'10px',
                                  margin:'5px',
                                  borderRadius:"30px",
                                  backgroundColor:"rgba(0, 139, 139, 0.7)",
                                  
                                }}
                          
                                variant="contained"
                                align="right"
                                onClick={handleClickOpen}>
                                  Change
                              </Button>
                            </div>
                            
                            <Dialog open={open} onClose={handleClose}>
                              <DialogContent>

                                  <DateRange
                                    ranges={[selectionRange]}
                                    minDate={new Date()} // Minimum date is current date
                                    onChange={handleSelect}
                                  />
                                  <div className="account__guests">
                                    <h2 className="account__calendarGuests">Number of Guests</h2>
                                    <PersonIcon />
                                    <input
                                      className="guest__selector"
                                      type="number"
                                      value={noOfGuests}
                                      onChange={(event) => handleGuests(event.target.value)}
                                      min={1}
                                    />
                                  </div>

                                  <div className="button__box">
                                    <Button
                                      variant="outlined"
                                      className="calendar__buttons"
                                      onClick={handleClose}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="contained"
                                      className="calendar__buttons"
                                      onClick={handleClose}
                                    >
                                      Confirm
                                    </Button>
                                  </div>

                              </DialogContent>
                            </Dialog>

                          <div>
                            <Button 
                            style={{
                              padding:'10px',
                              margin:'5px',
                              borderRadius:"30px",
                              backgroundColor:"grey",
          
                            }}
                            variant="contained" 
                            align="right"
                            onClick={handleClickOpenCancel}
                            >Cancel</Button>

                            <Dialog
                              open={openCancel}
                              onClose={handleCloseCancel}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              >
                              <DialogTitle id="alert-dialog-title">
                                {"Confirm Cancellation"}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  WARNING: Cancelling your reservation will result in a charge fee of $50
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleCloseCancel}>Nevermind</Button>
                                <Button onClick={handleCloseCancel} autoFocus>
                                  Cancel Reservation
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                          

                          </div>
                        
                        </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Account;