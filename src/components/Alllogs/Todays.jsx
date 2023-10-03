import React from "react";
import "../datatable/datatable.scss";
import { useState, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { TodaysLogs, ViewLogs } from "../../api/apis";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { TodaysLogs } from "../../api/visitor/apis";

function Todays() {
  const [data, setData] = useState([]);

  // const navigate = useNavigate();



  const apiData = useMemo(async () => {
    console.log("ViewLogs");
    return TodaysLogs().then((res) => {
      setData(res.data);
      console.log(res.data);
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
      width: 120,

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
      width: 150,
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
      field: "aprooval",
      headerName: "Aprooval",
      flex: 1,
      // valueGetter: (params) =>
      //   params.row.aprooval === true ? "approved" : "pending",
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

export default Todays;
