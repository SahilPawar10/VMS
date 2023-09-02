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
import {ViewLogs } from "../../api/apis";
import { Box } from "@mui/material";

const List = (id) => {
  const [visitor, setVisitor] = useState([]);

  useEffect(() => {
    ViewLogs()
      .then((res) => {
        let addedId = [];
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].id = i;
          addedId.push(res.data[i]);
        }
        console.log(addedId, "added");
        setVisitor(addedId.filter((data) => data.checkin !== undefined));
      })
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Sr. No",
      // flex: 0.5,
      valueGetter: (params) => params.id + 1,
    },
    {
      field: "image",
      headerName: "Profile",
      width: 90,

      renderCell: (params) => {
        return params.row.visitor?.image ? (
          <Avatar
            alt="Remy Sharp"
            src={`data:image/jpeg;base64,${params.row.visitor.image}`}
            sx={{ width: 70, height: 70 }}
          />
        ) : null;
      },
    },
    {
      field: "visitor",
      headerName: "Visitor Name",
      width: 120,
      valueGetter: (params) => params.row.visitor?.name || "N/A",
    },
    {
      field: "appointDate",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "purpose",
      headerName: "Purpose",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "hostName",
      headerName: "Host Name",
      flex: 1,
    },
    {
      field: "appointTime",
      headerName: "appointTime",
      flex: 1,
    },
    {
      field: "checkin",
      headerName: "CheckIN",
      flex: 1,
    },
    {
      field: "checkout",
      headerName: "CheckOut",
      flex: 1,
      valueGetter: (params) => params.row?.checkout || "not checked out",
    },
  ];

  return (
    // <TableContainer component={Paper} className="table">
    //   <Table sx={{ minWidth: 100 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className="tableCell">Sr.No</TableCell>
    //         <TableCell className="tableCell">Profile</TableCell>
    //         <TableCell className="tableCell">Name</TableCell>
    //         <TableCell className="tableCell">CheckInTime</TableCell>
    //         <TableCell className="tableCell">CheckInTime</TableCell>
    //         <TableCell className="tableCell">Payment Method</TableCell>
    //         <TableCell className="tableCell">Status</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {visitor.map((row) => (
    //         <TableRow key={row.id}>
    //           <TableCell className="tableCell">{row.id}</TableCell>
    //           <TableCell className="tableCell">
    //             <div className="cellWrapper">
    //               <img
    //                 src={`data:image/jpeg;base64,${row.visitor?.image}`}
    //                 alt=""
    //                 className="image"
    //               />
    //               {row.row.visitor}
    //             </div>
    //           // </TableCell>
    //           <TableCell className="tableCell">{row?.checkin}</TableCell>
    //           <TableCell className="tableCell">{row?.checkout}</TableCell>
    //           <TableCell className="tableCell">{row?.hostName}</TableCell>
    //           <TableCell className="tableCell">{row.method}</TableCell>
    //           <TableCell className="tableCell">
    //             <span className={`status ${row?.aprooval}`}>
    //               {row?.aprooval}
    //             </span>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    <>
      <Box height="" width="100%" m="-7px 0 0 0">
        <Box
          m="10px 0 0 0"
          height="85vh"
          sx={{
            "& .MuiDataGrid-root": {
              // border: 'none',
              // height: '70px',
            },
            "& .MuiDataGrid-cell": {
              // borderBottom: 'none',
            },
            "& .name-column--cell": {
              // color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-row": {
              fontSize: "15px",
            },
            "& .MuiDataGrid-columnHeaders": {
              // backgroundColor: colors.primary[400],
              // borderBottom: 'none',
              fontWeight: "700",
              fontWeight: "bolder",
              fontSize: "16px",
            },
            "& .MuiDataGrid-virtualScroller": {
              // backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              // backgroundColor: colors.blueAccent[400],
            },
            "& .css-wop1k0-MuiDataGrid-footerContainer": {},
            "& .MuiCheckbox-root": {
              // color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              // color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            // checkboxSelection
            rows={visitor || []}
            columns={columns}
            rowHeight={80}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
};

export default List;
