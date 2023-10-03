import React from "react";
import "../datatable/datatable.scss";
import { useEffect, useState, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { OutToday, TodaysLogs, ViewLogs, inToday } from "../../api/apis";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { inToday, ViewLogs, findByDate } from "../../api/visitor/apis";
import DatePicker from "react-datepicker";
import { ExportToExcel } from "../Export/ExportToExcel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
function CheckedIn() {
  const [data, setData] = useState([]);

  const filteredData = data.map((item, index) => ({
    srNo: index + 1,
    ...item,
  }));
  console.log(filteredData, "filtered");

  // const date = new Date();

  const [startDate, setStartDate] = useState();

  const apiData = useMemo(async () => {
    console.log("ViewLogs");
    return ViewLogs().then((res) => {
      // const filteredData = res.data.map((item, index) => ({
      //   srNo: index + 1,
      //   ...item,
      // }));
      setData(data);
    });
  }, []);

  useEffect(() => {
    if (startDate) {
      const currentDate = startDate.toLocaleDateString("en-GB").slice(0, 10);
      const sendData = {
        date: currentDate,
      };
      findByDate(sendData)
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((err) => {});
    } else {
      ViewLogs().then((res) => {
        setData(res.data);
        setStartDate();
      });
    }
  }, [startDate]);

  const columns = [
    {
      field: "srNo",
      headerName: "Sr.No",
      align: "center",
      width: 50,
    },
    {
      field: "image",
      headerName: `  Profile`,
      width: 100,
      align: "center",

      renderCell: (params) => {
        return params.row.visitor?.image ? (
          <Avatar
            alt="Remy Sharp"
            src={`data:image/jpeg;base64,${params.row.visitor.image}`}
            sx={{ width: 50, height: 50 }}
          />
        ) : null;
      },
    },
    {
      field: "visitor",
      headerName: "Visitor Name",
      width: 130,
      align: "center",
      valueGetter: (params) => params.row.visitor?.name || "N/A",
    },
    {
      field: "appointDate",
      headerName: "Visit Date",
      width: 130,
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "purpose",
      headerName: "Purpose",
      headerAlign: "left",
      width: 130,
      align: "center",
      align: "left",
    },
    {
      field: "hostName",
      headerName: "Host Name",
      width: 130,
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
      valueGetter: (params) => params.row?.checkin || "No Data",
    },
    {
      field: "checkout",
      headerName: "CheckOut",
      flex: 1,
      valueGetter: (params) => params.row?.checkout || "No Data",
    },
  ];

  return (
    <>
      <div className=" mt-4">
        <div className="justify-content-end  gap-3 d-flex  px-4">
          <div className="position-relative ">
            <DatePicker
              selected={startDate}
              dateFormat="dd-MM-yyyy"
              placeholderText="Click to select Date"
              className="p-1"
              onChange={(date) => {
                setStartDate(date);
              }}
            />
            <CalendarMonthIcon
              style={{
                position: "absolute",
                right: "10px",
                top: "43%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "gray",
              }}
            />
          </div>
          <div className="">
            <ExportToExcel
              apiData={filteredData}
              fileName={"allvisits"}
              button={"Export"}
            />
          </div>
        </div>
      </div>
      <div className="datatable">
        <DataGrid
          className="datagrid"
          rows={filteredData || []}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          headerClassName="custom-header"
        />
      </div>
    </>
  );
}

export default CheckedIn;
