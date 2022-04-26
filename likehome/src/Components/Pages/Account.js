import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import './Account.css';

function createData(dates, resID, hotel, guests, total){
    return { dates, resID, hotel, guests, total };
}

// to add to reservations
function addToRows(dates, resID, hotel, guests, total){
    var data = createData(dates, resID, hotel, guests, total);
    rows.push(data);
}

var rows = [
    createData('May 23, 2022 -> May 30, 2022 ', 12932, 'Hilton By the Beach' , 3, 1098.82),
    createData('June 17, 2022 -> June 23, 2022 ', 19234, 'Sheraton Hotel' , 2, 756.24),
    createData('Aug 4, 2022 -> Aug 10, 2022 ', 27401,'Marriot' , 2, 2038.67),
    createData('Sept 21, 2022 -> Sept 26, 2022 ', 29012,'Wyndham Hotel' , 4, 672.90),
];


function Account() {
    return (
        <div>
            <div class="title">
                <h1 class = "text" id="welcome"> Welcome </h1>
                <div class='info'>
                    <h3 class = "text" id="username" > Name </h3>
                    <Divider/>
                    <h4 class='name'> Team Zeta </h4>
                </div>
                <div class='info'>
                    <h3 class = "text" id="mail">  Email </h3>
                    <Divider/>
                    <h4 class='email'> zetalikehome@mail.com </h4>
                </div>
                <div class='info'>
                    <h3 class = "text" id="points">  Points </h3>
                    <Divider/>
                    <h4 class='email'> 72902 points </h4>
                </div>
            </div>
            <div class="reservations">
                <h1 class = "text" id="reserve"> Your Reservations </h1>
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
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.dates}
                            </TableCell>
                            <TableCell align="right">{row.resID}</TableCell>
                            <TableCell align="right">{row.hotel}</TableCell>
                            <TableCell align="right">{row.guests}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
      </Table>
    </TableContainer>
            </div>
            
        </div>
    );

}

export default Account;
