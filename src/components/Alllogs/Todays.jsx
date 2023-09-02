import React from "react";
import { useState, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { TodaysLogs, ViewLogs } from "../../api/apis";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

function Todays() {
  const [data, setData] = useState([]);

  // const navigate = useNavigate();

  const apiData = useMemo(async () => {
    console.log("ViewLogs");
    return TodaysLogs().then((res) => setData(res.data));
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
            rows={data || []}
            columns={columns}
            rowHeight={80}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
}

export default Todays;
