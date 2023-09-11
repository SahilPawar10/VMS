import React from "react";
import "../datatable/datatable.scss";
import { useEffect, useState, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { OutToday, TodaysLogs, ViewLogs, inToday } from "../../api/apis";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { inToday } from "../../api/visitor/apis";
function CheckedIn() {
  const [data, setData] = useState([]);

  const apiData = useMemo(async () => {
    console.log("ViewLogs");
    return inToday().then((res) => {
      setData(res.data);
    });
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
    // {
    //   field: "checkout",
    //   headerName: "CheckOut",
    //   flex: 1,
    //   valueGetter: (params) => params.row?.checkout || "not checked out",
    // },
  ];

  return (
    <>
      <div className="datatable">
        <DataGrid
          className="datagrid"
          rows={data || []}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      </div>
    </>
  );
}

export default CheckedIn;
