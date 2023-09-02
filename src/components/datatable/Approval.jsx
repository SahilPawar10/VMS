import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { approvalColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import { ViewLogs, approveMeet } from "../../api/apis";
import { ExportToExcel } from "../Export/ExportToExcel";

const Approval = () => {
  const [data, setData] = useState([]);
  const fileName = "approvalList";

  const navigate = useNavigate();

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        console.log(Object.values(item.visitor, item.visitor));
        return Object.values(item.visitor, item.visitor)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  const handleApproval = (id, boolean) => {
    const formdata = {
      aprooval: boolean,
    };
    // console.log(id, data);
    approveMeet(id, formdata)
      .then((res) => {
        console.log(res.data);
        ViewLogs().then((res) => setData(res.data));
        viewLogs();
        alert("Visit Approved!");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));

    let visitor = data.filter((item) => item.id === id);
    console.log(visitor[0].visitor.id);
  };

  function viewLogs() {
    ViewLogs()
      .then((data) => {
        let temp = data.data.filter((visitor) => {
          return visitor.aprooval === false;
        });
        let addedId = [];
        for (let i = 0; i < temp.length; i++) {
          temp[i].srNo = i + 1;
          temp[i].aprooval = "pending";
          addedId.push(temp[i]);
        }
        setData(addedId);
        console.log(addedId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  useEffect(() => {
    viewLogs();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleApproval(params.row.id, true)}
            >
              Approve
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* Add New User */}
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => searchItems(e.target.value)}
          />
          <SearchOutlinedIcon />
        </div>
        <Link className="link">
          <ExportToExcel apiData={data} fileName={fileName} />
        </Link>
      </div>
      {searchInput.length > 1 ? (
        <DataGrid
          className="datagrid"
          rows={filteredResults}
          columns={approvalColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      ) : (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={approvalColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      )}
    </div>
  );
};

export default Approval;
