import { useState, useEffect } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { getOnesVisitorMeets } from "../../api/visitor/apis";
import { Box } from "@mui/material";

const ViewOne = ({ id }) => {
  const [visitor, setVisitor] = useState([]);

  useEffect(() => {
    console.log(id, "prams");

    getOnesVisitorMeets(id)
      .then((res) => {
        console.log(res.data);
        let addedId = [];
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].id = i + 1;
          addedId.push(res.data[i]);
        }
        setVisitor(addedId);
      })
      .catch((err) => console.log(err));
  }, []);

  const tableData = visitor
    ? visitor.map((row) => (
        <TableRow key={row.id}>
          <TableCell className="tableCell">{row.id}</TableCell>
          <TableCell className="tableCell">
            <div className="cellWrapper">
              <img
                src={`data:image/jpeg;base64,${row.visitor.image}`}
                alt=""
                className="image"
              />
              {row.visitor.name}
            </div>
          </TableCell>
          <TableCell className="tableCell">{row?.hostName}</TableCell>
          <TableCell className="tableCell">
            {row?.checkin || "No Data"}
          </TableCell>
          <TableCell className="tableCell">
            {row?.checkout || "No Data"}
          </TableCell>
          <TableCell className="tableCell">{row?.reason}</TableCell>
          {/* <TableCell className="tableCell">{row.reason}</TableCell> */}
          {/* <TableCell className="tableCell">
          <span className={`status ${row?.aprooval}`}>{row?.aprooval}</span>
        </TableCell> */}
        </TableRow>
      ))
    : "No Data Available";

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Sr.No</TableCell>
              <TableCell className="tableCell">Visitor</TableCell>
              <TableCell className="tableCell">Host Name</TableCell>
              <TableCell className="tableCell">CheckInTime</TableCell>
              <TableCell className="tableCell">CheckOutTime</TableCell>
              {/* <TableCell className="tableCell">Payment Method</TableCell> */}
              <TableCell className="tableCell">Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableData}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewOne;
