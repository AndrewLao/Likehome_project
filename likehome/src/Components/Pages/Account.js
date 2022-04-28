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
        history.push("./home");
        return false;
      });
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
                      <TableCell align="right">{row.hotelid}</TableCell>
                      <TableCell align="right">{row.guests}</TableCell>
                      <TableCell align="right">{row.totalprice}</TableCell>
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
